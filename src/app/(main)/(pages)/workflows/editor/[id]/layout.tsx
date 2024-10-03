import EditorCanvas from '@/modules/editor-canvas'
import { NodeProvider } from '@/providers/node-provider'
import EditorProvider from '@/providers/editor-provider'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const EditorLayout = ({ children }: Props) => {
  return (
    <EditorProvider>
      <NodeProvider>{children}</NodeProvider>
    </EditorProvider>
  )
}

export default EditorLayout
