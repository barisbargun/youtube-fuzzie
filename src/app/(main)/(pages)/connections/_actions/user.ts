import { db } from "@/lib/db"

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