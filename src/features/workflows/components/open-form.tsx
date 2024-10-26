'use client'
import { PlusIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

import CustomDrawer from '@/components/shared/custom-drawer'
import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Props = ButtonProps & {
  workflowForm: React.ReactNode
}

const OpenForm = ({ className, workflowForm, ...props }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        {...props}
        className={cn('', className)}
        size="icon"
        variant="outline"
        onClick={() => setOpen(true)}
      >
        <PlusIcon className="size-5" />
      </Button>
      <CustomDrawer
        desc="Workflows are a powerful that help you automate your automate tasks."
        open={open}
        title="Create a Workflow Automation"
        onOpenChange={setOpen}
      >
        {workflowForm}
      </CustomDrawer>
    </>
  )
}

export default OpenForm
