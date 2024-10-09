import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"

type Props = ConnectionNotion & {
  userId: string
}

export const onNotionConnect = async ({ accessToken, workspaceId, workspaceIcon, workspaceName, databaseId, userId }: Props) => {
  if (!accessToken) return;

  const notionDb = await db.notion.findFirst({
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

  if (!notionDb) {
    await db.notion.create({
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

export const getNotionConnection = async () => {
  const user = await currentUser();
  if (user) {
    return await db.notion.findFirst({
      where: {
        userId: user.id
      },
    })
  }
}

// export const getNotionDatabase = async (accessToken: string, databaseId: string) => {
//   const notion = new Client({ auth: accessToken });
// }