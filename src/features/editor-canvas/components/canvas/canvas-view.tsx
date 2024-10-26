'use client'

import '@xyflow/react/dist/style.css'

import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MiniMap,
  ReactFlow,
  ReactFlowInstance,
  useEdgesState,
  useNodesState
} from '@xyflow/react'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { v4 } from 'uuid'

import Loader from '@/components/icons/loader'

import { useEditor } from '../../providers/editor-provider'
import { EditorActionItems, EditorActionTypes, EditorNode } from '../../types/editor'
import ActionItem from './action-item'
import ActionProvider from './action-provider'

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

type Props = {
  editorActionItems: EditorActionItems
}

const EditorCanvasView = ({ editorActionItems }: Props) => {
  const { dispatch, state } = useEditor()
  const [loading, _setLoading] = useState(false)
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>()

  // const pathname = usePathname()

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedEdge, setSelectedEdge] = useState<any>()
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onDragOver = useCallback((event: any) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault()
      const title: EditorActionTypes = event.dataTransfer.getData('application/reactflow')

      // check if the dropped element is valid
      if (!title || !editorActionItems) return

      const item = editorActionItems[title]

      const triggerAlreadyExists = state.editor.elements.find((node) => node.type === 'Trigger')
      if (item.type === 'Trigger' && triggerAlreadyExists) {
        toast.error('Only one trigger can be added to automations at the moment')
        return
      }

      if (!reactFlowInstance) return
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      })

      const newNode: EditorNode = {
        id: v4(),
        type: item.type,
        position,
        data: {
          title: title,
          description: item.description,
          completed: false,
          current: false,
          metadata: {}
        }
      }
      setNodes((nds) => [...nds, newNode])
    },
    [editorActionItems, reactFlowInstance, setNodes, state.editor.elements]
  )

  const handleClickCanvas = useCallback(() => {
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
  }, [dispatch])

  useEffect(() => {
    dispatch({ type: 'LOAD_DATA', payload: { edges, elements: nodes } })
  }, [nodes, edges, dispatch])

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
            eds.filter(
              (event) => event.source !== selectedNode.id && event.target !== selectedNode.id
            )
          )
          handleClickCanvas()
        } else if (selectedEdge) {
          setEdges((eds) => eds.filter((event) => event.id !== selectedEdge.id))
        }
      }
    },
    [state.editor.selectedNode, selectedEdge, setNodes, setEdges, handleClickCanvas]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  if (loading) {
    return (
      <div className="flex-center left-0 top-0 size-full">
        <Loader />
      </div>
    )
  }
  return (
    <ReactFlow
      fitView
      className="w-[300px]"
      edges={edges}
      nodeTypes={nodeTypes}
      nodes={state.editor.elements}
      onClick={handleClickCanvas}
      onConnect={onConnect}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onEdgeClick={(_, element) => setSelectedEdge(element)}
      onEdgesChange={onEdgesChange} // @ts-expect-error WIP:Fix this type error
      onInit={setReactFlowInstance}
      onNodesChange={onNodesChange}
    >
      <Controls className="text-neutral-900" position="top-left" />
      <MiniMap pannable zoomable className="!bg-background" position="bottom-left" />
      <Background gap={12} size={1} variant={BackgroundVariant.Dots} />
    </ReactFlow>

    //       <FlowInstance edges={edges} nodes={nodes}>
    //         <EditorSidebar />
    //       </FlowInstance>
    //     )}
    //   </ResizablePanel>
    // </ResizablePanelGroup>
  )
}

export default EditorCanvasView
