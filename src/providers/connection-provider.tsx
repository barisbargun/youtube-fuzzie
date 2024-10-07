'use client'

import { createContext, useContext, useState } from 'react'

const InitialValues: ConnectionProviderProps = {
  userId: '',
  discordNode: {
    channel_id: '',
    webhook_id: '',
    webhook_name: '',
    webhook_url: '',
    guild_name: '',
    guild_id: ''
  },
  notionNode: {
    accessToken: '',
    workspace_id: '',
    workspace_icon: '',
    workspace_name: '',
    database_id: ''
  },
  slackNode: {
    app_id: '',
    authed_user_id: '',
    authed_user_token: '',
    bot_user_id: '',
    team_id: '',
    team_name: ''
  },

  setUserId: () => undefined,
  setDiscordNode: () => undefined,
  setNotionNode: () => undefined,
  setSlackNode: () => undefined
}

const Context = createContext(InitialValues)

export const ConnectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState(InitialValues.userId)
  const [discordNode, setDiscordNode] = useState(InitialValues.discordNode)
  const [notionNode, setNotionNode] = useState(InitialValues.notionNode)
  const [slackNode, setSlackNode] = useState(InitialValues.slackNode)

  const values = {
    userId,
    setUserId,
    discordNode,
    setDiscordNode,
    notionNode,
    setNotionNode,
    slackNode,
    setSlackNode
  }

  return <Context.Provider value={values}>{children}</Context.Provider>
}

export const useConnection = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('useConnection Hook must be used within the editor Provider')
  }
  return context
}
