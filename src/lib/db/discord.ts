'use server'
import { currentUser } from '@clerk/nextjs/server'
import axios from 'axios'

import { ConnectionDiscord } from '@/types/connection'

import { prisma } from './prisma'

type Props = ConnectionDiscord & {
  userId: string
}

export const discordConnect = async ({
  channelId,
  webhookId,
  webhookName,
  webhookUrl,
  guildName,
  guildId,
  userId
}: Props) => {
  if (!webhookId) return
  const discordDatabase = await prisma.discordWebhook.findFirst({
    where: {
      userId: userId
    },
    include: {
      connections: {
        select: {
          type: true
        }
      }
    }
  })

  const findChannel = await prisma.discordWebhook.findUnique({
    where: {
      channelId: channelId
    },
    include: {
      connections: {
        select: {
          type: true
        }
      }
    }
  })

  if (!discordDatabase || !findChannel) {
    await prisma.discordWebhook.create({
      data: {
        userId,
        channelId,
        webhookId,
        name: webhookName,
        url: webhookUrl,
        guildName,
        guildId,
        connections: {
          create: {
            userId,
            type: 'Discord'
          }
        }
      }
    })
  }
}

export const discordGetConnection = async () => {
  const user = await currentUser()
  if (user) {
    return await prisma.discordWebhook.findFirst({
      where: {
        userId: user.id
      },
      select: {
        url: true,
        name: true,
        guildName: true
      }
    })
  }
}
// WIP: Move it to another related file
export const postContentToWebHook = async (url: string, content: string) => {
  if (content.length > 0) return await axios.post(url, { content })
}
