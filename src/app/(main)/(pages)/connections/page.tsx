import React from 'react'
import Header from '../_components/header'
import { CONNECTION_SEARCH_PARAMS, connectionsConfig } from '@/config/connections'
import ConnectionCard from '../_components/connection-card'
import { currentUser } from '@clerk/nextjs/server'
import { onDiscordConnect } from './_actions/discord'
import { onNotionConnect } from './_actions/notion'
import { onSlackConnect } from './_actions/slack'
import { ChangeObjectSides } from '@/utils/object'
import { getUser } from './_actions/user'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

const ConnectionsPage = async ({ searchParams }: Props) => {
  const user = await currentUser()
  if (!user) return

  const handleConnection = async () => {
    Object.keys(searchParams).forEach((key) => {
      const newKey = ChangeObjectSides(CONNECTION_SEARCH_PARAMS)[key]
      if (newKey) searchParams[newKey] = searchParams[key]
      delete searchParams[key]
    })

    const params: ConnectionServices & { userId: string } = {
      userId: user.id,
      channelId: '',
      webhookId: '',
      webhookName: '',
      webhookUrl: '',
      guildName: '',
      guildId: '',
      accessToken: '',
      workspaceId: '',
      workspaceIcon: '',
      workspaceName: '',
      databaseId: '',
      appId: '',
      authedUserId: '',
      authedUserToken: '',
      slackAccessToken: '',
      botUserId: '',
      teamId: '',
      teamName: '',
      ...(searchParams as any)
    }
    await onDiscordConnect({ ...params })
    await onNotionConnect({ ...params })
    await onSlackConnect({ ...params })

    const connections: { [key in ConnectionTypes]?: boolean } = {}

    const userDb = await getUser(user.id)
    userDb?.connections.forEach((v) => {
      connections[v.type as ConnectionTypes] = true
    })

    return { ...connections, GoogleDrive: true }
  }
  const connections = await handleConnection()
  return (
    <div>
      <Header title="Connections" />
      <p className="text-neutral-400/90">
        Connect all your apps directly from here. You may need to connect these apps regularly to
        refresh verification
      </p>
      <ul className="mt-5 grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
        {connectionsConfig.map((v) => (
          <ConnectionCard key={v.title} {...v} connected={connections[v.title]} />
        ))}
      </ul>
    </div>
  )
}

export default ConnectionsPage
