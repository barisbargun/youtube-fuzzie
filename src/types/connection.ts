export type ConnectionPrimaryTypes = 'Notion' | 'Slack' | 'Discord'
export type ConnectionTypes = ConnectionPrimaryTypes | 'GoogleDrive'

export type ConnectionDiscord = {
  channelId: string
  webhookId: string
  webhookName: string
  webhookUrl: string
  guildName: string
  guildId: string
}

export type ConnectionNotion = {
  accessToken: string
  workspaceId: string
  workspaceIcon: string
  workspaceName: string
  databaseId: string
}

export type ConnectionSlack = {
  appId: string
  authedUserId: string
  authedUserToken: string
  slackAccessToken: string
  botUserId: string
  teamId: string
  teamName: string
}

export type ConnectionServices = ConnectionDiscord & ConnectionNotion & ConnectionSlack
