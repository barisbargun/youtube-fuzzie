'use server'

import { currentUser } from '@clerk/nextjs/server'
import { Prisma } from '@prisma/client'

// eslint-disable-next-line import/no-restricted-paths
import { Option } from '@/features/editor-canvas/types/node-store'

import prisma from './prisma'

const updateDatabase = async (flowId: string, data: Prisma.WorkflowsUpdateInput) => {
  return await prisma.workflows.update({
    where: {
      id: flowId
    },
    data
  })
}

export const workflowCreateNodesEdges = async (
  flowId: string,
  nodes: string,
  edges: string,
  flowPath: string
) => {
  return await updateDatabase(flowId, { nodes, edges, flowPath })
}

export const workflowPublish = async (flowId: string, state: boolean) => {
  return await updateDatabase(flowId, { publish: state })
}

export const workflowCreateTemplate = async (
  flowId: string,
  type: string,
  content: any,
  channels?: Option[],
  accessToken?: string,
  notionDatabaseId?: string
) => {
  switch (type) {
    case 'Discord': {
      return await updateDatabase(flowId, { discordTemplate: content })
    }
    case 'Slack': {
      const resp = await updateDatabase(flowId, {
        slackTemplate: content,
        slackAccessToken: accessToken
      })
      if (!resp || !channels?.length) break

      const channelList = await prisma.workflows.findUnique({
        where: {
          id: flowId
        },
        select: {
          slackChannels: true
        }
      })

      if (channelList) {
        for (const channel of channelList.slackChannels) {
          if (channel !== channels[0].value) {
            await prisma.workflows.update({
              where: {
                id: flowId
              },
              data: {
                slackChannels: { push: channel }
              }
            })
          }
        }
      } else {
        for (const channel of channels) {
          await prisma.workflows.update({
            where: {
              id: flowId
            },
            data: {
              slackChannels: { push: channel.value }
            }
          })
        }
      }
      break
    }
    case 'Notion': {
      return await updateDatabase(flowId, {
        notionTemplate: content,
        notionAccessToken: accessToken,
        notionDbId: notionDatabaseId
      })
    }

    default: {
      break
    }
  }
}

export const workflowCreate = async (name: string, desc: string) => {
  const user = await currentUser()
  if (!user) return
  return await prisma.workflows.create({
    data: {
      userId: user.id,
      name,
      description: desc
    }
  })
}

export const workflowGetNodesEdges = async (flowId: string) => {
  const resp = await prisma.workflows.findUnique({
    where: {
      id: flowId
    },
    select: {
      nodes: true,
      edges: true
    }
  })
  if (resp?.nodes && resp?.edges) return resp
}
