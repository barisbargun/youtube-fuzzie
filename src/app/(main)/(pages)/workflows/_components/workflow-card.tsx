import { Card, CardDescription, CardHeader, CardTitle, Switch } from '@/components/ui'
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
        <label htmlFor="workflow-mode" className="text-sm text-muted-foreground">
          {publish ? 'On' : 'Off'}
        </label>
        <Switch id="workflow-mode" defaultChecked={publish} />
      </div>
    </Card>
  )
}

export default WorkflowCard
