import { ConnectionProvider } from '@/providers/connection-provider'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const ConnectionsLayout = ({ children }: Props) => {
  return <ConnectionProvider>{children}</ConnectionProvider>
}

export default ConnectionsLayout
