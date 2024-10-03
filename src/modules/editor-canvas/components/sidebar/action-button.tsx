import { useNode } from '@/providers/node-provider'
import { useNodeStore } from '@/store/node-store'
import React from 'react'

type Props = {
  service: string
}

const ActionButton = ({ service }: Props) => {
  const connection = useNode()
  const { selectedSlackChannels, setSelectedSlackChannels } = useNodeStore()
  return <div>ActionButton</div>
}

export default ActionButton
