import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui'
import { editorCanvasDefaultCards } from '@/config/editor'
import { useConnections } from '@/providers/connections-provider'
import { useEditor } from '@/providers/editor-provider'
import React from 'react'
import EditorIconHelper from './editor-icon-helper'
import { onDragStart } from '@/lib/editor'

type Props = {
  nodes: EditorNode[]
}

const EditorCanvasSidebar = ({ nodes }: Props) => {
  const { state } = useEditor()
  const nodeConnection = useConnections()
  // const {googleFile, setSlackChannels} =

  return (
    <aside className='px-4 h-full'>
      <Tabs defaultValue="actions" className="overflow-scroll pb-24 h-full">
        <TabsList>
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value="actions">
          {Object.entries(editorCanvasDefaultCards)
            .filter(
              ([_, cardType]) =>
                (!nodes.length && cardType.type === 'Trigger') ||
                (nodes.length && cardType.type === 'Action')
            )
            .map(([key, value]) => (
              <Card
                key={key}
                draggable
                className="w-full cursor-grab border-black bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 mb-4 last:mb-0"
                onDragStart={(event) => onDragStart(event, key as EditorCanvasTypes)}
              >
                <CardHeader className="flex flex-row items-center gap-4 p-4">
                  <EditorIconHelper type={key as EditorCanvasTypes} />
                  <CardTitle className="text-md">
                    {key}
                    <CardDescription>{value.description}</CardDescription>
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </aside>
  )
}

export default EditorCanvasSidebar
