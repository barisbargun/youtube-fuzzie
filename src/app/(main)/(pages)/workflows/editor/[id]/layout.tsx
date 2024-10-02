import EditorCanvas from '@/modules/editor-canvas'
import { ConnectionsProvider } from '@/providers/connections-provider'
import EditorProvider from '@/providers/editor-provider'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const EditorLayout = ({ children }: Props) => {
  return (
    <EditorProvider>
      <ConnectionsProvider>{children}</ConnectionsProvider>
    </EditorProvider>
  )
}

export default EditorLayout
