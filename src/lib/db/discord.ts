"use server"
import { db } from "./db"
import { currentUser } from "@clerk/nextjs/server"
import axios from "axios"

type Props = ConnectionDiscord & {
  userId: string
}

export const onDiscordConnect = async ({ channelId, webhookId, webhookName, webhookUrl, guildName, guildId, userId }: Props) => {
  if (!webhookId) return;
  const discordDb = await db.discordWebhook.findFirst({
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

  const findChannel = await db.discordWebhook.findUnique({
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

  if (!discordDb || !findChannel) {
    await db.discordWebhook.create({
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

export const getDiscordConnectionUrl = async () => {
  const user = await currentUser();
  if (user) {
    return await db.discordWebhook.findFirst({
      where: {
        userId: user.id
      },
      select: {
        url: true,
        name: true,
        guildName: true,
      }
    })
  }
}

export const postContentToWebHook = async (url: string, content: string) => {
  if (content.length) {
    const res = await axios.post(url, { content });
    return { message: res.data ? 'Success' : 'Failed' };
  }
  return { message: 'Content empty' };
}