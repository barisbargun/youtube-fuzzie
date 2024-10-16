import { Button } from '@/components/ui'
import { useToast } from '@/hooks/use-toast'
import {
  notionCreatePage,
  slackMsgChannel,
  workflowCreateTemplate,
  postContentToWebHook
} from '@/lib/db'
import { onContentChange } from '@/lib/editor'
import { useNode } from '@/providers/node-provider'
import { useNodeStore } from '@/store/node-store'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {
  service: ConnectionPrimaryTypes
}

const ActionButton = ({ service }: Props) => {
  const connection = useNode()
  const { selectedSlackChannels, setSelectedSlackChannels } = useNodeStore()
  const pathname = usePathname()
  const { toast } = useToast()

  const handleAction = async () => {
    switch (service) {
      case 'Discord': {
        const node = connection.discordNode
        const res = await postContentToWebHook(node.content, node.webhookURL)
        if (!res) return
        break
      }

      case 'Notion': {
        const node = connection.notionNode
        const res = await notionCreatePage(node.databaseId, node.accessToken, node.content.name);
        if (!res) return
        break
      }

      case 'Slack': {
        const node = connection.slackNode
        const res = await slackMsgChannel(
          node.slackAccessToken,
          selectedSlackChannels,
          node.content
        )
        if (!res) return
        setSelectedSlackChannels([])
        break
      }

      default:
        return
    }
    onContentChange(connection, service, '')
  }

  const handleCreateTemplate = async () => {
    const splitPath = pathname.split('/').pop()
    if (!splitPath) return

    // @ts-ignore
    let params: Parameters<typeof workflowCreateTemplate> = [splitPath, service]

    switch (service) {
      case 'Discord':
        params.push(connection.discordNode.content)
        break

      case 'Slack':
        params.push(
          connection.slackNode.content,
          selectedSlackChannels as any,
          connection.slackNode.slackAccessToken
        )
        break

      case 'Notion':
        params.push(
          connection.notionNode.content,
          null,
          connection.notionNode.accessToken,
          connection.notionNode.databaseId
        )

      default:
        break
    }
    const res = await workflowCreateTemplate(...params)
    if (res)
      toast({ title: 'Template saved', description: 'Your template has been saved successfully' })
  }

  return (
    <>
      <Button variant="outline" onClick={handleAction}>
        Test Action
      </Button>
      <Button variant="outline" onClick={handleCreateTemplate}>
        Save Template
      </Button>
    </>
  )
}

export default ActionButton
