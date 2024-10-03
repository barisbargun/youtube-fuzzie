export type ConnectionTypes = 'GoogleDrive' | 'Notion' | 'Slack' | 'Discord'

export interface ConnectionsConfig {
  img: string
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
    img: '/googleDrive.png',
    connectionKey: 'googleNode',
    alwaysTrue: true
  },
  {
    title: 'Discord',
    desc: 'Connect your discord to send notification and messages',
    img: '/discord.png',
    connectionKey: 'discordNode',
    accessTokenKey: 'webhookURL'
  },
  {
    title: 'Notion',
    desc: 'Create entries in your notion dashboard and automate tasks.',
    img: '/notion.png',
    connectionKey: 'notionNode',
    accessTokenKey: 'accessToken'
  },
  {
    title: 'Slack',
    desc: 'Use slack to send notifications to team members through your own custom bot.',
    img: '/slack.png',
    connectionKey: 'slackNode',
    accessTokenKey: 'slackAccessToken',
    slackSpecial: true
  }
]
