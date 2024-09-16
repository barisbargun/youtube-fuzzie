import {
  Button,
  Card,
  CardBody,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui'
import { ConnectionsConfig } from '@/config/connections'
import Image from 'next/image'
import React from 'react'

type Props = ConnectionsConfig & {}

const ConnectionCard = ({
  img,
  title,
  desc,
  connectionKey,
  accessTokenKey,
  alwaysTrue,
  slackSpecial
}: Props) => {
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
        <Button className="w-fit font-medium max-sm:mt-1">Connect</Button>
      </CardContent>
    </Card>
  )
}

export default ConnectionCard
