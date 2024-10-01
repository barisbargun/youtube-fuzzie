import { Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from '@/components/ui'
import { useToast } from '@/hooks/use-toast'
import { onContentChange } from '@/lib/editor'
import { useConnectionStore } from '@/store/connections'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'

type ConnProps = ConnectionProviderProps
type Props = {
  state: EditorState
  connection: ConnProps
}

const AccordionAction = ({ state, connection }: Props) => {
  const title = state.editor.selectedNode.data.title
  const { googleFile, setGoogleFile, selectedSlackChannels, setSelectedSlackChannels } =
    useConnectionStore()
  const { toast } = useToast()
  const [provider, setProvider] = useState<any>()

  useEffect(() => {
    const request = async () => {
      const response = await axios.get('/api/drive')

      if (response) {
        toast({ title: 'Fetched File' })
        setGoogleFile(response.data.message.files[0])
      } else {
        toast({ title: 'Failed to fetch file' })
      }
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
        <div>
          <p>{title === 'Notion' ? 'Values to be stored' : 'Message'}</p>
          <Input
            value={provider.content}
            onChange={(e) => onContentChange(connection, e.target.value, title)}
          />
          {JSON.stringify(googleFile) !== '{}' && title !== 'GoogleDrive' && (
            <Card>
              <CardHeader>
                <CardTitle>Drive File</CardTitle>
              </CardHeader>
              <CardContent>
                <GoogleF
              </CardContent>
            </Card>
          )}
        </div>
      </Card>
    </>
  )
}

export default AccordionAction
