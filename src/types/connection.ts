type ConnectionPrimaryTypes = 'Notion' | 'Slack' | 'Discord'
type ConnectionTypes = ConnectionPrimaryTypes & 'GoogleDrive'

type ConnectionDiscord = {
  channelId: string
  webhookId: string
  webhookName: string
  webhookUrl: string
  guildName: string
  guildId: string
}

type ConnectionNotion = {
  accessToken: string
  workspaceId: string
  workspaceIcon: string
  workspaceName: string
  databaseId: string
}

type ConnectionSlack = {
  appId: string
  authedUserId: string
  authedUserToken: string
  slackAccessToken: string
  botUserId: string
  teamId: string
  teamName: string
}

type ConnectionServices = ConnectionDiscord & ConnectionNotion & ConnectionSlack