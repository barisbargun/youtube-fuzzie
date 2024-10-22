import EditorCanvas from '@/features/editor-canvas'
import EditorProvider from '@/providers/editor-provider'
import { NodeProvider } from '@/providers/node-provider'

const EditorPage = () => {
  return (
    <EditorProvider>
      <NodeProvider>
        <EditorCanvas />
      </NodeProvider>
    </EditorProvider>
  )
}

export default EditorPage
