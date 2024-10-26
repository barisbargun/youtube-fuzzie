import { usePathname } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { onContentChange } from '@/features/editor-canvas/lib/editor'
import { useNode } from '@/features/editor-canvas/providers/node-provider'
import { useNodeStore } from '@/features/editor-canvas/store/node-store'
import { postContentToWebHook } from '@/lib/db/discord'
import { notionCreatePage } from '@/lib/db/notion'
import { slackMessageChannel } from '@/lib/db/slack'
import { workflowCreateTemplate } from '@/lib/db/workflows'
import { ConnectionPrimaryTypes } from '@/types/connection'

type Props = {
  service: ConnectionPrimaryTypes
}

const ActionButton = ({ service }: Props) => {
  const connection = useNode()
  const { selectedSlackChannels, setSelectedSlackChannels } = useNodeStore()
  const pathname = usePathname()

  const handleAction = async () => {
    switch (service) {
      case 'Discord': {
        const node = connection.discordNode
        const resp = await postContentToWebHook(node.content, node.webhookURL)
        if (!resp) return
        break
      }

      case 'Notion': {
        const node = connection.notionNode
        const resp = await notionCreatePage(node.databaseId, node.accessToken, node.content.name)
        if (!resp) return
        break
      }

      case 'Slack': {
        const node = connection.slackNode
        const resp = await slackMessageChannel(
          node.slackAccessToken,
          selectedSlackChannels,
          node.content
        )
        if (!resp) return
        setSelectedSlackChannels([])
        break
      }

      default: {
        return
      }
    }
    onContentChange(connection, service, '')
  }

  const handleCreateTemplate = async () => {
    const splitPath = pathname.split('/').pop()
    if (!splitPath) return

    // @ts-expect-error param will be added later.
    const params: Parameters<typeof workflowCreateTemplate> = [splitPath, service]

    switch (service) {
      case 'Discord': {
        params.push(connection.discordNode.content)
        break
      }

      case 'Slack': {
        params.push(
          connection.slackNode.content,
          selectedSlackChannels,
          connection.slackNode.slackAccessToken
        )
        break
      }

      case 'Notion': {
        params.push(
          connection.notionNode.content,
          undefined,
          connection.notionNode.accessToken,
          connection.notionNode.databaseId
        )
        break
      }

      default: {
        break
      }
    }
    const resp = await workflowCreateTemplate(...params)
    if (resp) toast('Template saved', { description: 'Your template has been saved successfully' })
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
