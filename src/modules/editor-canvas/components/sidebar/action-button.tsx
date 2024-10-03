import { useConnections } from '@/providers/connections-provider'
import { useConnectionStore } from '@/store/connections'
import React from 'react'

type Props = {
  service: string
}

const ActionButton = ({ service }: Props) => {
  const connection = useConnections()
  const { selectedSlackChannels, setSelectedSlackChannels } = useConnectionStore()
  return <div>ActionButton</div>
}

export default ActionButton
