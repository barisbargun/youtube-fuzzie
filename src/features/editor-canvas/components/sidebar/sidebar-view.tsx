'use client'
import { useEffect, useMemo } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { connectionsConfig } from '@/config/connections'
import { editorActionItems } from '@/config/editor'
import { slackListBotChannels } from '@/lib/db/slack'
import { onConnections } from '@/lib/editor'

import { useEditor } from '../../providers/editor-provider'
import { useNode } from '../../providers/node-provider'
import { useNodeStore } from '../../store/node-store'
import { EditorCanvasTypes } from '../../types/editor'
import AccordionAccount from './accordion-account'
import AccordionAction from './accordion-action'
import ActionCard from './action-card'
import FlowInstance from './flow-instance'

const EditorSidebarView = () => {
  const { state } = useEditor()
  const nodes = state.editor.elements
  const connection = useNode()
  const { googleFile, setSlackChannels } = useNodeStore()
  const hasTrigger = useMemo(() => nodes.find((n) => n.type == 'Trigger'), [nodes])

  useEffect(() => {
    if (state) onConnections(connection, state, googleFile)
  }, [connection, googleFile, state])

  useEffect(() => {
    const accessToken = connection.slackNode.slackAccessToken
    if (accessToken)
      slackListBotChannels(accessToken)?.then((channels) => setSlackChannels(channels))
  }, [connection.slackNode.slackAccessToken, setSlackChannels])

  const selectedConnection = useMemo(() => {
    return connectionsConfig.find((c) => c.title == state.editor.selectedNode.data.title)
  }, [state.editor.selectedNode.data.title])

  return (
    <div className="flex h-full flex-col gap-2">
      <FlowInstance />
      <Tabs className="h-full overflow-scroll pb-24" defaultValue="actions">
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
                desc={value.description}
                title={key as EditorCanvasTypes}
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
    </div>
  )
}

export default EditorSidebarView
