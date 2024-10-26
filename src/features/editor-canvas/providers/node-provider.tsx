'use client'

import { createContext, useContext, useState } from 'react'

import { NodeProviderProps } from '../types/node'

const InitialValues: NodeProviderProps = {
  discordNode: {
    webhookURL: '',
    content: '',
    webhookName: '',
    guildName: ''
  },
  googleNode: [],
  notionNode: {
    accessToken: '',
    databaseId: '',
    workspaceName: '',
    content: {
      kind: '',
      name: '',
      type: ''
    }
  },
  workflowTemplate: {
    discord: '',
    notion: '',
    slack: ''
  },
  slackNode: {
    appId: '',
    authedUserId: '',
    authedUserToken: '',
    slackAccessToken: '',
    botUserId: '',
    teamId: '',
    teamName: '',
    content: ''
  },
  isLoading: false,
  setGoogleNode: () => {},
  setDiscordNode: () => {},
  setNotionNode: () => {},
  setSlackNode: () => {},
  setIsLoading: () => {},
  setWorkFlowTemplate: () => {}
}

const Context = createContext(InitialValues)

export const NodeProvider = ({ children }: { children: React.ReactNode }) => {
  const [discordNode, setDiscordNode] = useState(InitialValues.discordNode)
  const [googleNode, setGoogleNode] = useState(InitialValues.googleNode)
  const [notionNode, setNotionNode] = useState(InitialValues.notionNode)
  const [slackNode, setSlackNode] = useState(InitialValues.slackNode)
  const [isLoading, setIsLoading] = useState(InitialValues.isLoading)
  const [workflowTemplate, setWorkFlowTemplate] = useState(InitialValues.workflowTemplate)

  const values = {
    discordNode,
    setDiscordNode,
    googleNode,
    setGoogleNode,
    notionNode,
    setNotionNode,
    slackNode,
    setSlackNode,
    isLoading,
    setIsLoading,
    workflowTemplate,
    setWorkFlowTemplate
  }

  return <Context.Provider value={values}>{children}</Context.Provider>
}

export const useNode = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('useNode Hook must be used within the editor Provider')
  }
  return context
}
