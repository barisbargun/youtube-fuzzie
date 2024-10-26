import { Dispatch } from 'react'

import { EditorCanvasTypes, EditorState } from '@/features/editor-canvas/types/editor'
import { NodeProviderProps } from '@/features/editor-canvas/types/node'
import { discordGetConnection } from '@/lib/db/discord'
import { notionGetConnection, notionGetDatabase } from '@/lib/db/notion'
import { slackGetConnection } from '@/lib/db/slack'
import { ConnectionPrimaryTypes } from '@/types/connection'

export const onDragStart = (event: any, nodeType: EditorCanvasTypes) => {
  event.dataTransfer.setData('application/reactflow', nodeType)
  event.dataTransfer.effectAllowed = 'move'
}

export const onContentChange = (
  connection: NodeProviderProps,
  node: ConnectionPrimaryTypes,
  content: string
) => {
  const setNode: Partial<Record<typeof node, Dispatch<any>>> = {
    Slack: connection.setSlackNode,
    Discord: connection.setDiscordNode,
    Notion: connection.setNotionNode
  }

  setNode[node]?.((prev: any) => ({ ...prev, content }))
}

export const onAddTemplate = (
  connection: NodeProviderProps,
  template: string,
  title: EditorCanvasTypes
) => {
  const setNode: Partial<Record<EditorCanvasTypes, Dispatch<any>>> = {
    Slack: connection.setSlackNode,
    Discord: connection.setDiscordNode
  }

  setNode[title]?.((prev: any) => ({ ...prev, content: `${prev.content} ${template}` }))
}

export const onConnections = async (
  connection: NodeProviderProps,
  editorState: EditorState,
  googleFile: any
) => {
  switch (editorState.editor.selectedNode.data.title) {
    case 'Discord': {
      const dc = await discordGetConnection()
      if (dc)
        connection.setDiscordNode(() => ({
          webhookURL: dc.name,
          guildName: dc.guildName,
          webhookName: dc.name,
          content: ''
        }))
      break
    }

    case 'Notion': {
      const nc = await notionGetConnection()
      if (nc) {
        connection.setNotionNode(() => ({
          ...nc,
          content: {
            kind: googleFile.kind,
            type: googleFile.mimeType,
            name: googleFile.name
          }
        }))
        const node = connection.notionNode
        if (node.databaseId.length > 0) {
          await notionGetDatabase(node.databaseId, node.accessToken)
        }
      }
      break
    }
    case 'Slack': {
      const sc = await slackGetConnection()
      if (sc) connection.setSlackNode(() => ({ ...sc, content: '' }))
      break
    }
    default: {
      break
    }
  }
}
