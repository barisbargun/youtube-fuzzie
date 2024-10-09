import { db } from "@/lib/db"

type Props = ConnectionSlack & {
  userId: string
}

export const onSlackConnect = async ({ appId, authedUserId, authedUserToken, slackAccessToken, botUserId, teamId, teamName, userId }: Props) => {
  if (!slackAccessToken) return;

  const slackDb = await db.slack.findFirst({
    where: {
      slackAccessToken
    },
    include: {
      connections: true
    }
  })

  if (slackDb) return;

  await db.slack.create({
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
