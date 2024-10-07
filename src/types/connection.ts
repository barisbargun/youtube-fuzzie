type ConnectionProviderProps = {
  userId: string
  discordNode: {
    channel_id: string
    webhook_id: string
    webhook_name: string
    webhook_url: string
    guild_name: string
    guild_id: string
  }
  notionNode: {
    accessToken: string
    workspace_id: string
    workspace_icon: string
    workspace_name: string
    database_id: string
  }
  slackNode: {
    app_id: string
    authed_user_id: string
    authed_user_token: string
    bot_user_id: string
    team_id: string
    team_name: string
  }
  setUserId: React.Dispatch<React.SetStateAction<any>>
  setDiscordNode: React.Dispatch<React.SetStateAction<any>>
  setNotionNode: React.Dispatch<React.SetStateAction<any>>
  setSlackNode: React.Dispatch<React.SetStateAction<any>>
}
