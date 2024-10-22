import { CONNECTION_SEARCH_PARAMS, connectionsConfig } from '@/config/connections'
import { currentUser } from '@clerk/nextjs/server'
import { ChangeObjectSides } from '@/utils/object'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  PageSeparate
} from '@/components/shared/page-header'

import { discordConnect } from '@/lib/db/discord'
import { notionConnect } from '@/lib/db/notion'
import { slackConnect } from '@/lib/db/slack'
import { getUser } from '@/lib/db/user'
import { ConnectionCard } from '@/components/shared'

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
    await discordConnect({ ...params })
    await notionConnect({ ...params })
    await slackConnect({ ...params })
    const userDb = await getUser(user.id)

    const connections: Partial<Record<ConnectionTypes, boolean>> = {}

    userDb?.connections.forEach((v) => {
      if (v.type) connections[v.type as ConnectionTypes] = true
    })

    return { ...connections, GoogleDrive: true }
  }
  const connections = await handleConnection()
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Connections</PageHeaderHeading>
        <PageHeaderDescription>
          Connect all your apps directly from here. You may need to connect these apps regularly to
          refresh verification
        </PageHeaderDescription>
      </PageHeader>
      <PageSeparate/>
      <p className="text-neutral-400/90"></p>
      <ul className="mt-5 grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
        {connectionsConfig.map((v) => (
          <ConnectionCard key={v.title} {...v} connected={connections[v.title]} />
        ))}
      </ul>
    </>
  )
}

export default ConnectionsPage
