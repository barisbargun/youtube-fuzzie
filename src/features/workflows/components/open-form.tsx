'use client'
import { PlusIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

import { Button, ButtonProps } from '@/components/ui'
import { cn } from '@/lib/utils'
import CustomDrawer from '@/components/shared/custom-drawer'

type Props = ButtonProps & {
  workflowForm: React.ReactNode
}

const OpenForm = ({ className, workflowForm, ...props }: Props) => {
  const [open, setOpen] = useState(false)

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
        {workflowForm}
      </CustomDrawer>
    </>
  )
}

export default OpenForm
