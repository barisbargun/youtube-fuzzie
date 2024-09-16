import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { id, email_addresses, first_name, image_url } = body?.data

    const email = email_addresses[0].email_address
    console.log('👍', body)

    await db.user.upsert({
      where: { clerkId: id },
      update: { email, name: first_name, profileImage: image_url },
      create: { email, name: first_name || '', profileImage: image_url || '', clerkId: id }
    })

    return new NextResponse('User created/updated successfully', { status: 200 })
  } catch (error) {
    console.log('👎', error)
    return new NextResponse('Something went wrong', { status: 500 })
  }
}
