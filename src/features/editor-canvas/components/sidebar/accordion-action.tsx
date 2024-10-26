import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ConnectionPrimaryTypes } from '@/types/connection'

import { onContentChange } from '../../lib/editor'
import { useNode } from '../../providers/node-provider'
import { useNodeStore } from '../../store/node-store'
import { EditorState } from '../../types/editor'
import { NodeProviderProps } from '../../types/node'
import ActionButton from './action-button'
import GoogleDriveFiles from './google-drive-files'
import GoogleFileDetails from './google-file-details'

type ConnProps = NodeProviderProps
type Props = {
  state: EditorState
}

const AccordionAction = ({ state }: Props) => {
  const { googleFile, setGoogleFile } = useNodeStore()
  const connection = useNode()

  const title = state.editor.selectedNode.data.title
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [provider, setProvider] = useState<any>()

  useEffect(() => {
    const request = async () => {
      try {
        const response = await axios.get('/api/drive')
        if (response) {
          toast.success('Fetched File')
          setGoogleFile(response.data.message.files[0])
        }
      } catch {
        toast.error('Failed to fetch file')
      }
    }
    request()
  }, [setGoogleFile])

  const isConnected = useMemo(() => {
    switch (title) {
      case 'GoogleDrive': {
        setProvider(connection.googleNode)
        return !connection.isLoading
      }

      case 'Slack': {
        setProvider(connection.slackNode)
        return !!connection.slackNode.slackAccessToken
      }

      case 'Discord': {
        setProvider(connection.discordNode)
        return !!connection.discordNode.webhookURL
      }

      case 'Notion': {
        setProvider(connection.notionNode)
        return !!connection.notionNode.accessToken
      }

      default: {
        break
      }
    }
  }, [
    title,
    connection.isLoading,
    connection.googleNode,
    connection.slackNode,
    connection.discordNode,
    connection.notionNode
  ])

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
              onChange={(event) =>
                onContentChange(connection, title as ConnectionPrimaryTypes, event.target.value)
              }
            />
            {JSON.stringify(googleFile) !== '{}' && title !== 'GoogleDrive' && (
              <>
                <p>Drive File</p>
                <GoogleFileDetails googleFile={googleFile} title={title} />
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
