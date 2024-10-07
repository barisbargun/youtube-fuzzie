import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"
import axios from "axios"

export type DiscordConnectionProps = {
  channel_id: string
  webhook_id: string
  webhook_name: string
  webhook_url: string
  guild_name: string
  guild_id: string
}

type OnDiscordConnect = Partial<DiscordConnectionProps> & {
  userId: string
}

export const onDiscordConnect = async ({ channel_id, webhook_id, webhook_name, webhook_url, guild_name, guild_id, userId }: OnDiscordConnect) => {
  if (webhook_id) return;

  const webhook = await db.discordWebhook.findFirst({
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

  const webhookChannel = await db.discordWebhook.findUnique({
    where: {
      channelId: channel_id
    },
    include: {
      connections: {
        select: {
          type: true
        }
      }
    }
  })

  if (!webhook || !webhookChannel) {
    await db.discordWebhook.create({
      data: {
        userId,
        channelId: channel_id || "",
        webhookId: webhook_id || "",
        name: webhook_name || "",
        url: webhook_url || "",
        guildName: guild_name || "",
        guildId: guild_id || "",
        connections: {
          create: {
            userId: userId,
            type: 'Discord'
          }
        }
      }
    })
  }
}

export const getDiscortConnectionUrl = async () => {
  const user = await currentUser();
  if (user) {
    return await db.discordWebhook.findFirst({
      where: {
        userId: user.id
      },
      select: {
        url: true,
        channelId: true,
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