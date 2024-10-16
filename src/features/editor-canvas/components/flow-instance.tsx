import { useToast } from '@/hooks/use-toast'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { useNode } from '@/providers/node-provider'
import { Button } from '@/components/ui'
import { workflowCreateNodesEdges, workflowPublish } from '@/lib/db'

type Props = {
  children: React.ReactNode
  edges: any[]
  nodes: any[]
}

const FlowInstance = ({ children, edges, nodes }: Props) => {
  const pathname = usePathname()
  const [isFlow, setIsFlow] = useState([])
  const nodeConnection = useNode()
  const { toast } = useToast()

  const onFlowAutomation = useCallback(async () => {
    const res = await workflowCreateNodesEdges(
      pathname.split('/').pop()!,
      JSON.stringify(nodes),
      JSON.stringify(edges),
      JSON.stringify(isFlow)
    )

    toast({
      title: 'Flow Automation',
      description: res ? 'Flow automation saved successfully' : 'Failed to save flow automation',
      variant: res ? 'default' : 'destructive'
    });
  }, [nodeConnection])

  const onPublishWorkflow = useCallback(async () => {
    const res = await workflowPublish(pathname.split('/').pop()!, true)
    toast({
      title: 'Flow Automation',
      description: res?.publish ? 'Workflow published successfully' : 'Failed to publish workflow',
      variant: res?.publish ? 'default' : 'destructive'
    });
  }, [])

  useEffect(() => {
    const onAutomateFlow = async () => {
      const flows: any = edges.map((edge) => {
        if (edge.target) return nodes.find((node) => node.id === edge.target).type
      })
      setIsFlow(flows)
    }
    onAutomateFlow()
  }, [edges])

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex gap-3 p-4">
        <Button disabled={isFlow.length < 1} onClick={onFlowAutomation}>
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
