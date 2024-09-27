import React from 'react'
import Header from '../_components/header'
import { connectionsConfig } from '@/config/connections'
import ConnectionCard from '../_components/connection-card'

type Props = {
  searchParams?: { [key: string]: string | undefined }
}

const Connections = (props: Props) => {
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

export default Connections
