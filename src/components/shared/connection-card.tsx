import Image from 'next/image'
import Link from 'next/link'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ConnectionTypes } from '@/types/connection'

import { buttonVariants } from '../ui/button'

type Props = {
  img: string
  title: ConnectionTypes
  desc: string
  connected?: boolean
}

const ConnectionCard = ({ img, title, desc, connected }: Props) => {
  const href = () => {
    if (connected) return ''
    switch (title) {
      case 'Discord': {
        return process.env.NEXT_PUBLIC_DISCORD_REDIRECT!
      }

      case 'Notion': {
        return process.env.NEXT_PUBLIC_NOTION_AUTH_URL!
      }

      case 'Slack': {
        return process.env.NEXT_PUBLIC_SLACK_REDIRECT!
      }

      default: {
        return ''
      }
    }
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <Image alt="icon" height={40} src={img} width={40} />
      </CardHeader>
      <CardContent className="flex justify-between gap-2 max-sm:flex-col sm:items-center">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="mt-1">{desc}</CardDescription>
        </div>
        <Link
          className={cn(
            'w-fit font-medium max-sm:mt-1',
            buttonVariants({ variant: connected ? 'outline' : 'default' })
          )}
          href={href()}
        >
          {connected ? 'Connected' : 'Connect'}
        </Link>
      </CardContent>
    </Card>
  )
}

export default ConnectionCard
