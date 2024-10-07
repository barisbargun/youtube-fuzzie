import React from 'react'
import Header from '../_components/header'
import { connectionsConfig } from '@/config/connections'
import ConnectionCard from '../_components/connection-card'
import { currentUser } from '@clerk/nextjs/server'
import { DiscordConnectionProps, onDiscordConnect } from './_actions/discord-connection'

type Props = {
  searchParams?: DiscordConnectionProps
}

const ConnectionsPage = async ({ searchParams }: Props) => {
  const user = await currentUser()
  if (!user) return

  const handleConnection = async () => {
    await onDiscordConnect({ ...searchParams, userId: user.id })
  }
  // handleConnection()

  return (
    <div>
      <Header title="Connections" />
      <p className="text-neutral-400/90">
        Connect all your apps directly from here. You may need to connect these apps regularly to
        refresh verification
      </p>
      <ul className="mt-5 grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
        {connectionsConfig.map((v) => (
          <ConnectionCard key={v.title} {...v} />
        ))}
      </ul>
    </div>
  )
}

export default ConnectionsPage
