import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui'
import { Separator, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { editorActionItems } from '@/config/editor'
import { useConnections } from '@/providers/connections-provider'
import { useEditor } from '@/providers/editor-provider'
import React, { useMemo } from 'react'
import CanvasSidebarActionCard from './canvas-sidebar-action-card'
import CanvasSidebarSettingCard from './canvas-sidebar-setting-card'
import { connectionsConfig } from '@/config/connections'

type Props = {
  nodes: EditorNode[]
}

const CanvasSidebar = ({ nodes }: Props) => {
  const { state } = useEditor()
  const nodeConnection = useConnections()
  const hasTrigger = useMemo(() => nodes.find((n) => n.type == 'Trigger'), [nodes])

  const connection = useMemo(() => {
    console.log('state.editor.selectedNode.data.title', state.editor.selectedNode.data.title)
    return connectionsConfig.find((c) => c.title == state.editor.selectedNode.data.title)
  }, [state.editor.selectedNode.data.title])
  console.log('connection', connection)
  return (
    <aside className="h-full px-4">
      <Tabs defaultValue="actions" className="h-full overflow-scroll pb-24">
        <TabsList>
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value="actions">
          {Object.entries(editorActionItems)
            .filter(([_, cardType]) =>
              hasTrigger ? cardType.type == 'Action' : cardType.type == 'Trigger'
            )
            .map(([key, value]) => (
              <CanvasSidebarActionCard
                key={key}
                title={key as EditorCanvasTypes}
                desc={value.description}
                type={value.type}
              />
            ))}
        </TabsContent>
        <TabsContent value="settings">
          {state.editor.selectedNode.id && (
            <>
              <div className="w-full py-4">
                <h1 className="text-center text-lg font-semibold">
                  {state.editor.selectedNode.data.title}
                </h1>
              </div>
              {connection && (
                <Accordion type="single" collapsible>
                  <AccordionItem value="account">
                    <AccordionTrigger>Account</AccordionTrigger>
                    {state.editor.selectedNode.id && (
                      <AccordionContent>
                        <CanvasSidebarSettingCard {...state} {...connection} />
                      </AccordionContent>
                    )}
                  </AccordionItem>
                </Accordion>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </aside>
  )
}

export default CanvasSidebar
