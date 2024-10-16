"use server"
import { db } from "./db"
import { currentUser } from "@clerk/nextjs/server"
import { Client } from "@notionhq/client";
type Props = ConnectionNotion & {
  userId: string
}

export const notionConnect = async ({ accessToken, workspaceId, workspaceIcon, workspaceName, databaseId, userId }: Props) => {
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

export const notionGetConnection = async () => {
  const user = await currentUser();
  if (user) {
    return await db.notion.findFirst({
      where: {
        userId: user.id
      },
    })
  }
}

export const notionGetDb = async (accessToken: string, databaseId: string) => {
  const notion = new Client({ auth: accessToken });
  return await notion.databases.retrieve({ database_id: databaseId });
}

export const notionCreatePage = async (accessToken: string, databaseId: string, content: string) => {
  const notion = new Client({ auth: accessToken });
  return await notion.pages.create({
    parent: { type: "database_id", database_id: databaseId },
    properties: {
      name: [
        {
          text: { content }
        }
      ]
    }
  });
}

export const notionSetContent = (connection: NodeProviderProps, content: any) => {
  connection.setNotionNode((prev) => ({ ...prev, content }));
}