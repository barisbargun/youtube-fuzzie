import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { workflowCreateNodesEdges, workflowPublish } from '@/lib/db/workflows'

import { useEditor } from '../../providers/editor-provider'

const FlowInstance = () => {
  const { state } = useEditor()
  const { elements: nodes, edges } = state.editor
  const pathname = usePathname()
  const [isFlow, setIsFlow] = useState<any>([])

  const onFlowAutomation = useCallback(async () => {
    const resp = await workflowCreateNodesEdges(
      pathname.split('/').pop()!,
      JSON.stringify(nodes),
      JSON.stringify(edges),
      JSON.stringify(isFlow)
    )

    toast[resp ? 'success' : 'error']('Flow Automation', {
      description: resp ? 'Flow automation saved successfully' : 'Failed to save flow automation'
    })
  }, [edges, isFlow, nodes, pathname])

  const onPublishWorkflow = useCallback(async () => {
    const resp = await workflowPublish(pathname.split('/').pop()!, true)
    toast[resp?.publish ? 'success' : 'error']('Flow Automation', {
      description: resp?.publish ? 'Workflow published successfully' : 'Failed to publish workflow'
    })
  }, [pathname])

  useEffect(() => {
    const onAutomateFlow = async () => {
      const flows = edges.map((edge) => {
        if (edge.target) return nodes?.find((node) => node.id === edge.target)?.type
      })
      setIsFlow(flows)
    }
    onAutomateFlow()
  }, [edges, nodes])

  return (
    <div className="flex gap-3 py-4">
      <Button disabled={isFlow.length <= 0} onClick={onFlowAutomation}>
        Save
      </Button>
      <Button disabled={isFlow.length <= 0} onClick={onPublishWorkflow}>
        Publish
      </Button>
    </div>
  )
}

export default FlowInstance
