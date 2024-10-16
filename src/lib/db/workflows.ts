"use server"

import { Prisma } from "@prisma/client"
import { db } from "./db"
import { currentUser } from "@clerk/nextjs/server"

const updateDb = async (flowId: string, data: Prisma.WorkflowsUpdateInput) => {
  return await db.workflows.update({
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
  return await updateDb(flowId, { nodes, edges, flowPath });
}

export const workflowPublish = async (flowId: string, state: boolean) => {
  return await updateDb(flowId, { publish: state });
}

export const workflowCreateTemplate = async (
  flowId: string,
  type: string,
  content: any,
  channels?: Option[],
  accessToken?: string,
  notionDbId?: string
) => {
  switch (type) {
    case 'Discord':
      return await updateDb(flowId, { discordTemplate: content });

    case 'Slack':
      const res = await updateDb(flowId, { slackTemplate: content, slackAccessToken: accessToken });
      if (!res || !channels?.length) break;

      const channelList = await db.workflows.findUnique({
        where: {
          id: flowId
        },
        select: {
          slackChannels: true
        }
      })

      if (channelList) {
        channelList.slackChannels.forEach(async (channel) => {
          if (channel !== channels[0].value) {
            await db.workflows.update({
              where: {
                id: flowId
              },
              data: {
                slackChannels: { push: channel }
              }
            })

          }
        })
      }
      else {
        channels.forEach(async (channel) => {
          await db.workflows.update({
            where: {
              id: flowId
            },
            data: {
              slackChannels: { push: channel.value }
            }
          })
        })
      }
    case 'Notion':
      return await updateDb(flowId, {
        notionTemplate: content,
        notionAccessToken: accessToken,
        notionDbId: notionDbId
      });

    default:
      break;
  }
}

export const workflowCreate = async (name: string, desc: string) => {
  const user = await currentUser();
  if (!user) return;
  return await db.workflows.create({
    data: {
      userId: user.id,
      name,
      description: desc
    }
  })
}

export const workflowGetNodesEdges = async (flowId: string) => {
  const res = await db.workflows.findUnique({
    where: {
      id: flowId
    },
    select: {
      nodes: true,
      edges: true
    }
  })
  if (res?.nodes && res?.edges) return res;
}