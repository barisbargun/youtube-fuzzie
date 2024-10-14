import EditorCanvas from '@/features/editor-canvas'
import EditorProvider from '@/providers/editor-provider'
import { NodeProvider } from '@/providers/node-provider'
import React from 'react'

type Props = {}

const EditorPage = (props: Props) => {
  return (
    <EditorProvider>
      <NodeProvider>
        <EditorCanvas />
      </NodeProvider>
    </EditorProvider>
  )
}

export default EditorPage
