import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui'
import React, { useEffect, useMemo } from 'react'
import { editorActionItems } from '@/config/editor'
import { connectionsConfig } from '@/config/connections'
import { useNode } from '@/providers/node-provider'
import { useEditor } from '@/providers/editor-provider'
import ActionCard from './action-card'
import AccordionAccount from './accordion-account'
import AccordionAction from './accordion-action'
import { useNodeStore } from '@/store/node-store'
import { fetchBotSlackChannels, onConnections } from '@/lib/editor'

type Props = {
  nodes: EditorNode[]
}

const Sidebar = ({ nodes }: Props) => {
  const { state } = useEditor()
  const connection = useNode()
  const { googleFile, setSlackChannels } = useNodeStore()
  const hasTrigger = useMemo(() => nodes.find((n) => n.type == 'Trigger'), [nodes])

  useEffect(() => {
    if (state) onConnections(connection, state, googleFile)
  }, [state])

  useEffect(() => {
    const accessToken = connection.slackNode.slackAccessToken
    if (accessToken) fetchBotSlackChannels(accessToken, setSlackChannels)
  }, [connection.slackNode.slackAccessToken])

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
