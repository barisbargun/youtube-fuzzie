'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Loader } from '@/components/icons'
import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MiniMap,
  ReactFlow,
  ReactFlowInstance,
  useEdgesState,
  useNodesState
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useEditor } from '@/providers/editor-provider'
import { usePathname } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { v4 } from 'uuid'
import ActionItem from './_components/action-item'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui'
import FlowInstance from './_components/flow-instance'
import CanvasSidebar from './_components/canvas-sidebar'
import ActionProvider from './_components/action-provider'
import { editorActionItems } from '@/config/editor'
const initialNodes: EditorNode[] = []
const initialEdges: { id: string; source: string; target: string }[] = []

const nodeTypes = {
  Action: ActionItem,
  Trigger: ActionProvider,
  Email: ActionItem,
  Condition: ActionItem,
  AI: ActionItem,
  Slack: ActionItem,
  GoogleDrive: ActionProvider,
  Notion: ActionItem,
  Discord: ActionItem,
  CustomWebhook: ActionItem,
  GoogleCalendar: ActionItem,
  Wait: ActionItem
}

const page = () => {
  const { dispatch, state } = useEditor()
  const [loading, setLoading] = useState(false)
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>()

  const { toast } = useToast()
  const pathname = usePathname()

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedEdge, setSelectedEdge] = useState<any>(null)
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  )

  const onDragOver = useCallback((event: any) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault()

      const type: EditorActionTypes = event.dataTransfer.getData('application/reactflow')

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return
      }

      const triggerAlreadyExists = state.editor.elements.find((node) => node.type === 'Trigger')

      if (type === 'Trigger' && triggerAlreadyExists) {
        toast({
          title: "'Only one trigger can be added to automations at the moment'",
          variant: 'destructive'
        })
        return
      }

      if (!reactFlowInstance) return
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      })

      const newNode = {
        id: v4(),
        type,
        position,
        data: {
          title: type,
          description: editorActionItems[type].description,
          completed: false,
          current: false,
          metadata: {},
          type: type
        }
      }
      //@ts-ignore
      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, state]
  )

  const handleClickCanvas = () => {
    dispatch({
      type: 'SELECTED_ELEMENT',
      payload: {
        element: {
          data: {
            completed: false,
            current: false,
            description: '',
            metadata: {},
            title: undefined
          },
          id: '',
          position: { x: 0, y: 0 },
          type: undefined
        }
      }
    })
  }

  useEffect(() => {
    dispatch({ type: 'LOAD_DATA', payload: { edges, elements: nodes } })
  }, [nodes, edges])

  // const onGetWorkFlow = async () => {
  //   setLoading(true)
  //   const response = await onGetNodesEdges(pathname.split('/').pop()!)
  //   if (response) {
  //     setEdges(JSON.parse(response.edges!))
  //     setNodes(JSON.parse(response.nodes!))
  //     setIsWorkFlowLoading(false)
  //   }
  //   setIsWorkFlowLoading(false)
  // }

  // useEffect(() => {
  //   onGetWorkFlow()
  // }, [])

  const handleKeyDown = useCallback(
    (event: any) => {
      const selectedNode = state.editor.selectedNode
      if (event.key === 'Delete') {
        if (selectedNode.id) {
          setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id))
          setEdges((eds) =>
            eds.filter((e) => e.source !== selectedNode.id && e.target !== selectedNode.id)
          )
          handleClickCanvas()
        } else if (selectedEdge) {
          setEdges((eds) => eds.filter((e) => e.id !== selectedEdge.id))
        }
      }
    },
    [state.editor.selectedNode, selectedEdge]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={70}>
        <div className="flex h-full items-center justify-center">
          <div className="relative h-full w-full pb-16">
            {loading ? (
              <div className="flex-center left-0 top-0 h-full w-full">
                <Loader />
              </div>
            ) : (
              <ReactFlow
                className="w-[300px]"
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodes={state.editor.elements}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect} // @ts-ignore
                onInit={setReactFlowInstance}
                fitView
                onClick={handleClickCanvas}
                nodeTypes={nodeTypes}
                onEdgeClick={(event, element) => setSelectedEdge(element)}
              >
                <Controls position="top-left" className="text-neutral-900" />
                <MiniMap position="bottom-left" className="!bg-background" zoomable pannable />
                <Background
                  //@ts-ignore
                  variant="dots"
                  gap={12}
                  size={1}
                />
              </ReactFlow>
            )}
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={30} className="relative max-h-screen sm:block">
        {loading ? (
          <div className="flex-center left-0 top-0 h-full w-full">
            <Loader />
          </div>
        ) : (
          <FlowInstance edges={edges} nodes={nodes}>
            <CanvasSidebar nodes={nodes} />
          </FlowInstance>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default page
