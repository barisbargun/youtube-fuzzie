"use client"
import { Card, CardDescription, CardHeader, CardTitle, Switch } from '@/components/ui'
import { useToast } from '@/hooks/use-toast'
import { onFlowPublish } from '@/lib/db'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  id: string
  title: string
  desc: string
  publish: boolean
}

const WorkflowCard = ({ id, desc, title, publish }: Props) => {
  const { toast } = useToast()

  const publishFlow = async (check: boolean) => {
    const res = await onFlowPublish(id, check)
    toast({
      title: 'Flow Automation',
      description: res?.publish ? 'Workflow published successfully' : 'Failed to publish workflow',
      variant: res?.publish ? 'default' : 'destructive'
    })
  }

  return (
    <Card className="flex h-fit w-full items-center justify-between">
      <CardHeader className="flex flex-col">
        <Link href={`/workflows/editor/${id}`}>
          <div className="flex gap-2">
            <Image src="/googleDrive.png" width={30} height={30} alt="google-drive" />
            <Image src="/notion.png" width={30} height={30} alt="notion" />
            <Image src="/discord.png" width={30} height={30} alt="discord" />
          </div>
          <CardTitle className="mt-3 capitalize">{title}</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </Link>
      </CardHeader>
      <div className="mr-6 flex flex-col items-center">
        <label htmlFor="airplane-mode" className="text-sm text-muted-foreground">
          {publish ? 'On' : 'Off'} {/* WIP: Not changing. */}
        </label>
        <Switch
          id="airplane-mode"
          defaultChecked={publish}
          // onCheckedChange={(v) => publishFlow(v)}
        />
      </div>
    </Card>
  )
}

export default WorkflowCard
