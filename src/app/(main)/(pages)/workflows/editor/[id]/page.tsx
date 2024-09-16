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
import { editorCanvasDefaultCards } from '@/config/editor'
import EditorActionItem from './_components/editor-action-item'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui'
import EditorFlowInstance from './_components/editor-flow-instance'
import EditorCanvasSidebar from './_components/editor-canvas-sidebar'
import EditorActionInit from './_components/editor-action-init'
const initialNodes: EditorNode[] = []
const initialEdges: { id: string; source: string; target: string }[] = []

const page = () => {
  const { dispatch, state } = useEditor()
  const [loading, setLoading] = useState(false)
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>()

  const { toast } = useToast()
  const pathname = usePathname()

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onDragOver = useCallback((event: any) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  )

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault()

      const type: EditorCanvasCardType['type'] = event.dataTransfer.getData('application/reactflow')

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
          description: editorCanvasDefaultCards[type].description,
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
            title: '',
            type: 'Trigger'
          },
          id: '',
          position: { x: 0, y: 0 },
          type: 'Trigger'
        }
      }
    })
  }

  useEffect(() => {
    dispatch({ type: 'LOAD_DATA', payload: { edges, elements: nodes } })
  }, [nodes, edges])

  const nodeTypes = useMemo(
    () => ({
      Action: EditorActionItem,
      Trigger: EditorActionInit,
      Email: EditorActionItem,
      Condition: EditorActionItem,
      AI: EditorActionItem,
      Slack: EditorActionItem,
      GoogleDrive: EditorActionInit,
      Notion: EditorActionItem,
      Discord: EditorActionItem,
      CustomWebhook: EditorActionItem,
      GoogleCalendar: EditorActionItem,
      Wait: EditorActionItem
    }),
    []
  )

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
      <ResizableHandle/>
      <ResizablePanel defaultSize={30} className="relative sm:block max-h-screen">
        {loading ? (
          <div className="flex-center left-0 top-0 h-full w-full">
            <Loader />
          </div>
        ) : (
          <EditorFlowInstance edges={edges} nodes={nodes}>
            <EditorCanvasSidebar nodes={nodes} />
          </EditorFlowInstance>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default page
