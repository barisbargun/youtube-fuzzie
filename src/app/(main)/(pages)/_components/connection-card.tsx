'use client'
import {
  Button,
  buttonVariants,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui'
import { ConnectionsConfig } from '@/config/connections'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo } from 'react'

type Props = Pick<ConnectionsConfig, 'img' | 'title' | 'desc'> & {
  connected?: boolean
}

const ConnectionCard = ({ img, title, desc, connected }: Props) => {
  const href = useMemo(() => {
    switch (title) {
      case 'Discord':
        return process.env.NEXT_PUBLIC_DISCORD_REDIRECT!

      case 'Notion':
        return process.env.NEXT_PUBLIC_NOTION_AUTH_URL!

      case 'Slack':
        return process.env.NEXT_PUBLIC_SLACK_REDIRECT!

      default:
        return ''
    }
  }, [title, connected])

  return (
    <Card className="h-fit">
      <CardHeader>
        <Image src={img} width={40} height={40} alt="icon" />
      </CardHeader>
      <CardContent className="flex justify-between gap-2 max-sm:flex-col sm:items-center">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="mt-1">{desc}</CardDescription>
        </div>
        <Link
          href={connected ? '' : href}
          className={cn(
            'w-fit font-medium max-sm:mt-1',
            buttonVariants({ variant: connected ? 'outline' : 'default' })
          )}
        >
          {connected ? 'Connected' : 'Connect'}
        </Link>
      </CardContent>
    </Card>
  )
}

export default ConnectionCard
