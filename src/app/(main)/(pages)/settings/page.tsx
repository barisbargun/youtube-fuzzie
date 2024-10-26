import { currentUser } from '@clerk/nextjs/server'
import { z } from 'zod'

import ProfileForm from '@/components/others/profile-form'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  PageSeparate
} from '@/components/shared/page-header'
import FileUploaderDialog from '@/features/file-uploader/components/file-uploader'
import { prisma } from '@/lib/db/prisma'
import { userUpdateSchema } from '@/lib/validations/user'

const Settings = async () => {
  const authUser = await currentUser()

  if (!authUser) return
  const user = await prisma.user.findUnique({ where: { clerkId: authUser.id } })

  const saveSettings = async (values: z.infer<typeof userUpdateSchema>) => {
    'use server'
    await prisma.user.update({
      where: { clerkId: authUser.id },
      data: {
        name: values.name,
        profileImage: values.file
      }
    })
  }

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Settings</PageHeaderHeading>
        <PageHeaderDescription>Update your profile information.</PageHeaderDescription>
      </PageHeader>
      <PageSeparate />
      <section>
        <div className="mb-8">
          <h2 className="text-xl font-semibold">User Profile</h2>
          <h3 className="text-sm opacity-40">Add or update your information.</h3>
        </div>
      </section>
      {user && (
        <>
          <ProfileForm saveSettings={saveSettings} user={user}>
            <FileUploaderDialog />
          </ProfileForm>
        </>
      )}
    </>
  )
}

export default Settings
