'use server'
import { currentUser } from '@clerk/nextjs/server'
import axios from 'axios'

// eslint-disable-next-line import/no-restricted-paths
import { Option } from '@/features/editor-canvas/types/node-store'
import { ConnectionSlack } from '@/types/connection'

import { prisma } from './prisma'

type Props = ConnectionSlack & {
  userId: string
}

export const slackConnect = async ({
  appId,
  authedUserId,
  authedUserToken,
  slackAccessToken,
  botUserId,
  teamId,
  teamName,
  userId
}: Props) => {
  if (!slackAccessToken) return

  const slackDatabase = await prisma.slack.findFirst({
    where: {
      slackAccessToken
    },
    include: {
      connections: true
    }
  })

  if (slackDatabase) return

  await prisma.slack.create({
    data: {
      userId,
      slackAccessToken,
      appId,
      authedUserId,
      authedUserToken,
      botUserId,
      teamId,
      teamName,
      connections: {
        create: {
          userId,
          type: 'Slack'
        }
      }
    }
  })
}

export const slackGetConnection = async () => {
  const user = await currentUser()
  if (user) {
    return await prisma.slack.findFirst({
      where: {
        userId: user.id
      }
    })
  }
}

export const slackListBotChannels = async (accessToken: string): Promise<Option[]> => {
  const parameters = new URLSearchParams({
    types: 'public_channel,private_channel',
    limit: '200'
  })
  const url = `https://slack.com/api/conversations.list?${parameters}`

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  if (!data.ok) throw new Error(data.error)

  if (!data?.channels?.length) return []

  return (data.channels as any[])
    .filter((ch) => ch.is_member)
    .map((ch) => {
      return { label: ch.name, value: ch.id }
    })
}

export const slackMessageChannel = async (
  accessToken: string,
  channelId: string[],
  content: string
) => {
  const url = 'https://slack.com/api/chat.postMessage'

  return await Promise.all(
    channelId.map(async (id) => {
      await axios.post(
        url,
        {
          channel: id,
          text: content
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json;charset=utf-8'
          }
        }
      )
    })
  )
}
// If get any error, check the code below.

// const postMessageInSlackChannel = async (
//   slackAccessToken: string,
//   slackChannel: string,
//   content: string
// ): Promise<void> => {
//   try {
//     await axios.post(
//       'https://slack.com/api/chat.postMessage',
//       { channel: slackChannel, text: content },
//       {
//         headers: {
//           Authorization: `Bearer ${slackAccessToken}`,
//           'Content-Type': 'application/json;charset=utf-8',
//         },
//       }
//     )
//     console.log(`Message posted successfully to channel ID: ${slackChannel}`)
//   } catch (error: any) {
//     console.error(
//       `Error posting message to Slack channel ${slackChannel}:`,
//       error?.response?.data || error.message
//     )
//   }
// }

// // Wrapper function to post messages to multiple Slack channels
// export const postMessageToSlack = async (
//   slackAccessToken: string,
//   selectedSlackChannels: Option[],
//   content: string
// ): Promise<{ message: string }> => {
//   if (!content) return { message: 'Content is empty' }
//   if (!selectedSlackChannels?.length) return { message: 'Channel not selected' }

//   try {
//     selectedSlackChannels
//       .map((channel) => channel?.value)
//       .forEach((channel) => {
//         postMessageInSlackChannel(slackAccessToken, channel, content)
//       })
//   } catch (error) {
//     return { message: 'Message could not be sent to Slack' }
//   }

//   return { message: 'Success' }
// }
