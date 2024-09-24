import { Separator, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { editorActionItems } from '@/config/editor'
import { useConnections } from '@/providers/connections-provider'
import { useEditor } from '@/providers/editor-provider'
import React, { useMemo } from 'react'
import CanvasSidebarCard from './canvas-sidebar-card'

type Props = {
  nodes: EditorNode[]
}

const CanvasSidebar = ({ nodes }: Props) => {
  const { state } = useEditor()
  const nodeConnection = useConnections()
  // const {googleFile, setSlackChannels} =
  const hasTrigger = useMemo(() => nodes.find((n) => n.type == 'Trigger'), [nodes])
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
              <CanvasSidebarCard
                key={key}
                title={key as EditorCanvasTypes}
                desc={value.description}
                type={value.type}
              />
            ))}
        </TabsContent>
      </Tabs>
    </aside>
  )
}

export default CanvasSidebar
