'use server'
import { currentUser } from '@clerk/nextjs/server'
import { Client } from '@notionhq/client'

// eslint-disable-next-line import/no-restricted-paths
import { NodeProviderProps } from '@/features/editor-canvas/types/node'
import { ConnectionNotion } from '@/types/connection'

import prisma from './prisma'

type Props = ConnectionNotion & {
  userId: string
}

export const notionConnect = async ({
  accessToken,
  workspaceId,
  workspaceIcon,
  workspaceName,
  databaseId,
  userId
}: Props) => {
  if (!accessToken) return

  const notionDatabase = await prisma.notion.findFirst({
    where: {
      accessToken
    },
    include: {
      connections: {
        select: {
          type: true
        }
      }
    }
  })

  if (!notionDatabase) {
    await prisma.notion.create({
      data: {
        userId,
        accessToken,
        workspaceId,
        workspaceIcon,
        workspaceName,
        databaseId,
        connections: {
          create: {
            userId,
            type: 'Notion'
          }
        }
      }
    })
  }
}

export const notionGetConnection = async () => {
  const user = await currentUser()
  if (user) {
    return await prisma.notion.findFirst({
      where: {
        userId: user.id
      }
    })
  }
}

export const notionGetDatabase = async (accessToken: string, databaseId: string) => {
  const notion = new Client({ auth: accessToken })
  return await notion.databases.retrieve({ database_id: databaseId })
}

export const notionCreatePage = async (
  accessToken: string,
  databaseId: string,
  content: string
) => {
  const notion = new Client({ auth: accessToken })
  return await notion.pages.create({
    parent: { type: 'database_id', database_id: databaseId },
    properties: {
      name: [
        {
          text: { content }
        }
      ]
    }
  })
}

export const notionSetContent = (connection: NodeProviderProps, content: any) => {
  connection.setNotionNode((prev) => ({ ...prev, content }))
}
