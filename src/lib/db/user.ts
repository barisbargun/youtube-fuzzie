"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "./db"

export const getUser = async (id: string) => {
  return await db.user.findUnique({
    where: {
      clerkId: id
    },
    include: {
      connections: true
    }
  })
}

export const getGoogleListener = async () => {
  const { userId } = auth()
  return (
    userId &&
    (await db.user.findUnique({
      where: {
        clerkId: userId
      },
      select: {
        googleResourceId: true
      }
    }))
  )
}