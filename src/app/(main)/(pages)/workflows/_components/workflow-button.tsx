'use client'
import { CustomDrawer } from '@/components/global'
import { Button, ButtonProps } from '@/components/ui'
import { cn } from '@/lib/utils'
import { PlusIcon } from '@radix-ui/react-icons'
import React, { useEffect, useState } from 'react'
import WorkflowForm from './workflow-form'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Props = ButtonProps & {}

const WorkflowButton = ({ className, ...props }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const checkSearch = async () => {
      if (searchParams.get('openDialog')) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        setOpen(true)
      }
      router.push(pathname)
    }
    checkSearch()
  }, [])

  return (
    <>
      <Button
        {...props}
        size="icon"
        variant="outline"
        className={cn('', className)}
        onClick={() => setOpen(true)}
      >
        <PlusIcon className="size-5" />
      </Button>
      <CustomDrawer
        title="Create a Workflow Automation"
        desc="Workflows are a powerful that help you automate your automate tasks."
        open={open}
        onOpenChange={setOpen}
      >
        <WorkflowForm />
      </CustomDrawer>
    </>
  )
}

export default WorkflowButton
