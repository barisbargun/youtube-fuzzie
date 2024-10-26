export type DispatchAction<T> = React.Dispatch<React.SetStateAction<T>>

export type NodeProviderProps = {
  discordNode: {
    webhookURL: string
    content: string
    webhookName: string
    guildName: string
  }
  setDiscordNode: DispatchAction<NodeProviderProps['discordNode']>
  googleNode: object[]
  setGoogleNode: DispatchAction<NodeProviderProps['googleNode']>
  notionNode: {
    accessToken: string
    databaseId: string
    workspaceName: string
    content: {
      // WIP: Check if this is the correct type (for _actions/notion.ts(74) and lib/editor.ts(58))
      name: string
      kind: string
      type: string
    }
  }
  workflowTemplate: {
    discord?: string
    notion?: string
    slack?: string
  }
  setNotionNode: DispatchAction<NodeProviderProps['notionNode']>
  slackNode: {
    appId: string
    authedUserId: string
    authedUserToken: string
    slackAccessToken: string
    botUserId: string
    teamId: string
    teamName: string
    content: string
  }
  setSlackNode: DispatchAction<NodeProviderProps['slackNode']>
  setWorkFlowTemplate: DispatchAction<{
    discord?: string
    notion?: string
    slack?: string
  }>
  isLoading: boolean
  setIsLoading: DispatchAction<boolean>
}
