'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import { Loader2, Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import React, { ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { userUpdateSchema } from '@/lib/validations/user'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

type Props = {
  user: User
  saveSettings: (values: z.infer<typeof userUpdateSchema>) => Promise<void>
  children: ReactElement
}

const ProfileForm = ({ user, saveSettings, children }: Props) => {
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof userUpdateSchema>>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      file: user.profileImage || '',
      name: user.name || '',
      email: user.email
    }
  })

  async function onSubmit(values: z.infer<typeof userUpdateSchema>) {
    setLoading(true)
    try {
      await saveSettings({ ...values })
    } catch {
      toast.error('Failed to save user settings')
    } finally {
      setLoading(false)
    }
  }

  const handleDefaultImage = () => {
    form.setValue(
      'file',
      'https://res.cloudinary.com/ddxnzumxe/image/upload/c_scale,w_200/v1725881024/fuzzie/250228050_b4054888-b6a2-423e-bc7a-6f78c4d624ac_xkilwf.svg'
    )
  }

  return (
    <Form {...form}>
      <form className="flex w-full flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Picture</FormLabel>
              <Image
                alt="profile-img"
                className="mb-2 aspect-square overflow-visible rounded-full"
                height={240}
                src={field.value || user.profileImage || ''}
                width={240}
              />
              <div className="mt-4 flex gap-2">
                <FormControl>
                  {React.cloneElement(children, { setImage: field.onChange })}
                </FormControl>
                <Button size="sm" type="button" variant="destructive" onClick={handleDefaultImage}>
                  <Trash2Icon className="mr-2 size-4" />
                  <span>Remove</span>
                </Button>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled={true} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-2 w-fit font-semibold" disabled={loading} type="submit">
          {loading ? (
            <>
              <Loader2 className="mr-2 size-6 animate-spin" />
              <span>Saving</span>
            </>
          ) : (
            'Save User Settings'
          )}
        </Button>
      </form>
    </Form>
  )
}

export default ProfileForm
