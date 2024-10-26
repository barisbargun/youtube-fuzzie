'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { workflowSchema } from '@/features/workflows/lib/validations'

const CreateWorkflow = () => {
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof workflowSchema>>({
    resolver: zodResolver(workflowSchema),
    defaultValues: {
      name: '',
      desc: ''
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function onSubmit(values: z.infer<typeof workflowSchema>) {
    setLoading(true)
    // try {
    // } catch (error) {
    // } finally {
    //   setLoading(false)
    // }
  }

  return (
    <Form {...form}>
      <form className="flex w-full flex-col gap-8 text-left" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  disabled={loading}
                  placeholder="Enter your description"
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-2 w-full font-semibold" disabled={loading} type="submit">
          {loading ? (
            <>
              <Loader2 className="mr-2 size-6 animate-spin" />
              <span>Saving</span>
            </>
          ) : (
            'Save Settings'
          )}
        </Button>
      </form>
    </Form>
  )
}

export default CreateWorkflow
