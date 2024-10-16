import React from 'react'
import ProfileForm from './_components/profile-form'
import { currentUser } from '@clerk/nextjs/server'
import { db } from '@/lib/db/db'
import { z } from 'zod'
import { userUpdateSchema } from '@/lib/validations'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading
} from '@/components/shared/page-header'

const Settings = async () => {
  const authUser = await currentUser()

  if (!authUser) return null
  const user = await db.user.findUnique({ where: { clerkId: authUser.id } })

  const saveSettings = async (values: z.infer<typeof userUpdateSchema>) => {
    'use server'
    console.log(values)
    await db.user.update({
      where: { clerkId: authUser.id },
      data: {
        name: values.name,
        profileImage: values.file
      }
    })
  }

  return (
    <>
      <PageHeader separate>
        <PageHeaderHeading>Settings</PageHeaderHeading>
        <PageHeaderDescription>Update your profile information.</PageHeaderDescription>
      </PageHeader>

      <section>
        <div className="mb-8">
          <h2 className="text-xl font-semibold">User Profile</h2>
          <h3 className="text-sm opacity-40">Add or update your information.</h3>
        </div>
      </section>
      {user && (
        <>
          <ProfileForm user={user} saveSettings={saveSettings} />
        </>
      )}
    </>
  )
}

export default Settings
