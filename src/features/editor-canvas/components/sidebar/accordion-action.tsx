import { Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from '@/components/ui'
import { useToast } from '@/hooks/use-toast'
import { onContentChange } from '@/lib/editor'
import { useNodeStore } from '@/store/node-store'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import GoogleFileDetails from './google-file-details'
import { useNode } from '@/providers/node-provider'
import GoogleDriveFiles from './google-drive-files'
import ActionButton from './action-button'

type ConnProps = NodeProviderProps
type Props = {
  state: EditorState
}

const AccordionAction = ({ state }: Props) => {
  const { googleFile, setGoogleFile } = useNodeStore()
  const connection = useNode()

  const title = state.editor.selectedNode.data.title
  const { toast } = useToast()
  const [provider, setProvider] = useState<any>()

  useEffect(() => {
    const request = async () => {
      try {
        const response = await axios.get('/api/drive')
        if (response) {
          toast({ title: 'Fetched File' })
          setGoogleFile(response.data.message.files[0])
        }
      } catch (error) {}
      toast({ title: 'Failed to fetch file' })
    }
    request()
  }, [])

  const isConnected = useMemo(() => {
    switch (title) {
      case 'GoogleDrive':
        setProvider(connection.googleNode)
        return !connection.isLoading

      case 'Slack':
        setProvider(connection.slackNode)
        return !!connection.slackNode.slackAccessToken

      case 'Discord':
        setProvider(connection.discordNode)
        return !!connection.discordNode.webhookURL

      case 'Notion':
        setProvider(connection.notionNode)
        return !!connection.notionNode.accessToken

      default:
        break
    }
  }, [title, connection.isLoading])

  if (!title || !isConnected) return <p>Not connected.</p>
  return (
    <>
      <Card>
        {title == 'Discord' && (
          <CardHeader>
            <CardTitle>{(provider as ConnProps['discordNode']).webhookName}</CardTitle>
            <CardDescription>{(provider as ConnProps['discordNode']).guildName}</CardDescription>
          </CardHeader>
        )}
        <Card>
          <CardHeader>
            <CardTitle>{title === 'Notion' ? 'Values to be stored' : 'Message'}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Input
              value={provider?.content || ''}
              onChange={(e) =>
                onContentChange(connection, title as ConnectionPrimaryTypes, e.target.value)
              }
            />
            {JSON.stringify(googleFile) !== '{}' && title !== 'GoogleDrive' && (
              <>
                <p>Drive File</p>
                <GoogleFileDetails title={title} googleFile={googleFile} />
              </>
            )}
            {title === 'GoogleDrive' && <GoogleDriveFiles />}
            <ActionButton service={title as ConnectionPrimaryTypes} />
          </CardContent>
        </Card>
      </Card>
    </>
  )
}

export default AccordionAction
