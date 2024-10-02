import { useToast } from '@/hooks/use-toast'
import { usePathname } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { onCreateNodesEdges, onFlowPublish } from '../actions/editor-db'
import { useConnections } from '@/providers/connections-provider'
import { Button } from '@/components/ui'

type Props = {
  children: React.ReactNode
  edges: any[]
  nodes: any[]
}

const FlowInstance = ({ children, edges, nodes }: Props) => {
  const pathname = usePathname()
  const [isFlow, setIsFlow] = useState([])
  const nodeConnection = useConnections()
  const { toast } = useToast()

  const onFlowAutomation = useCallback(async () => {
    const flow = await onCreateNodesEdges(
      pathname.split('/').pop()!,
      JSON.stringify(nodes),
      JSON.stringify(edges),
      JSON.stringify(isFlow)
    )

    if (flow)
      toast({
        title: 'Flow Automation',
        description: flow.message
      })
  }, [nodeConnection])

  const onPublishWorkflow = useCallback(async () => {
    const response = await onFlowPublish(pathname.split('/').pop()!, true)
    if (response) toast({
      title: 'Flow Automation',
      description: response
    })
  }, [])

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex gap-3 p-4">
        <Button onClick={onFlowAutomation} disabled={isFlow.length < 1}>
          Save
        </Button>
        <Button disabled={isFlow.length < 1} onClick={onPublishWorkflow}>
          Publish
        </Button>
      </div>
      {children}
    </div>
  )
}

export default FlowInstance
