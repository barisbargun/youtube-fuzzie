'use server'

import { auth } from '@clerk/nextjs/server'

import prisma from './prisma'

export const getUser = async (id: string) => {
  return await prisma.user.findUnique({
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
    (await prisma.user.findUnique({
      where: {
        clerkId: userId
      },
      select: {
        googleResourceId: true
      }
    }))
  )
}
