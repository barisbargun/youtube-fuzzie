import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui'
import { Separator, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { editorActionItems } from '@/config/editor'
import { useConnections } from '@/providers/connections-provider'
import { useEditor } from '@/providers/editor-provider'
import React, { useEffect, useMemo } from 'react'
import { connectionsConfig } from '@/config/connections'
import ActionCard from './action-card'
import AccordionAccount from './accordion-account'
import AccordionAction from './accordion-action'

type Props = {
  nodes: EditorNode[]
}

const Sidebar = ({ nodes }: Props) => {
  const { state } = useEditor()
  const hasTrigger = useMemo(() => nodes.find((n) => n.type == 'Trigger'), [nodes])

  // useEffect(() => {
  //   if(connection.slackNode.slackAccessToken) {
  //     connection.fetchSlackChannels()
  // }, [connection.slackNode.slackAccessToken])

  const selectedConnection = useMemo(() => {
    return connectionsConfig.find((c) => c.title == state.editor.selectedNode.data.title)
  }, [state.editor.selectedNode.data.title])

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
              <ActionCard
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
              {selectedConnection && (
                <Accordion type="multiple">
                  <AccordionItem value="account">
                    <AccordionTrigger>Account</AccordionTrigger>
                    {state.editor.selectedNode.id && (
                      <AccordionContent>
                        <AccordionAccount {...state} {...selectedConnection} />
                      </AccordionContent>
                    )}
                  </AccordionItem>
                  <AccordionItem value="action">
                    <AccordionTrigger>Action</AccordionTrigger>
                    <AccordionContent>
                      <AccordionAction state={state} />
                    </AccordionContent>
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

export default Sidebar
