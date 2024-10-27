import { StaticImageData } from 'next/image'

import assets from '@/assets'
import { NodeProviderProps } from '@/features/editor-canvas/types/node'
import { ConnectionServices, ConnectionTypes } from '@/types/connection'

const brands = assets.brands
export interface ConnectionsConfig {
  img: StaticImageData
  title: ConnectionTypes
  desc: string
  connectionKey: keyof NodeProviderProps
  accessTokenKey?: string
  alwaysTrue?: boolean
  slackSpecial?: boolean
}

export const connectionsConfig: ConnectionsConfig[] = [
  {
    title: 'GoogleDrive',
    desc: 'Connect your google drive to listen to folder changes',
    img: brands.googleDrive,
    connectionKey: 'googleNode',
    alwaysTrue: true
  },
  {
    title: 'Discord',
    desc: 'Connect your discord to send notification and messages',
    img: brands.discord,
    connectionKey: 'discordNode',
    accessTokenKey: 'webhookURL'
  },
  {
    title: 'Notion',
    desc: 'Create entries in your notion dashboard and automate tasks.',
    img: brands.notion,
    connectionKey: 'notionNode',
    accessTokenKey: 'accessToken'
  },
  {
    title: 'Slack',
    desc: 'Use slack to send notifications to team members through your own custom bot.',
    img: brands.slack,
    connectionKey: 'slackNode',
    accessTokenKey: 'slackAccessToken',
    slackSpecial: true
  }
]

export const CONNECTION_SEARCH_PARAMS: ConnectionServices = {
  /** Discord */
  webhookId: 'webhook_id',
  channelId: 'channel_id',
  webhookName: 'webhook_name',
  webhookUrl: 'webhook_url',
  guildName: 'guild_name',
  guildId: 'guild_id',

  /** Notion */
  accessToken: 'access_token',
  workspaceId: 'workspace_id',
  workspaceIcon: 'workspace_icon',
  workspaceName: 'workspace_name',
  databaseId: 'database_id',

  /** Slack */
  appId: 'app_id',
  authedUserId: 'authed_user_id',
  authedUserToken: 'authed_user_token',
  slackAccessToken: 'slack_access_token',
  botUserId: 'bot_user_id',
  teamId: 'team_id',
  teamName: 'team_name'
}
