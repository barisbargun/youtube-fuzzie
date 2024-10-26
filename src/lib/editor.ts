/* eslint-disable import/no-restricted-paths */

import { EditorState } from '@/features/editor-canvas/types/editor'
import { NodeProviderProps } from '@/features/editor-canvas/types/node'
import { Option } from '@/features/editor-canvas/types/node-store'

import { discordGetConnection } from './db/discord'
import { notionGetConnection, notionGetDatabase } from './db/notion'
import { slackGetConnection, slackListBotChannels } from './db/slack'

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

export const fetchBotSlackChannels = async (
  token: string,
  setChannels: (channels: Option[]) => void
) => {
  await slackListBotChannels(token)?.then((channels) => setChannels(channels))
}
