import { Handle, HandleProps } from '@xyflow/react'
import { CSSProperties } from 'react'

import { useEditor } from '@/features/editor-canvas/providers/editor-provider'

type Props = HandleProps & { style?: CSSProperties }

const CustomHandle = (props: Props) => {
  const { state } = useEditor()

  return (
    <Handle
      {...props}
      className="!-bottom-2 !h-4 !w-4 dark:bg-neutral-800"
      isValidConnection={(event) => {
        const sourcesFromHandleInState = state.editor.edges.filter(
          (edge) => edge.source === event.source
        ).length
        const sourceNode = state.editor.elements.find((node) => node.id === event.source)
        const targetFromHandleInState = state.editor.edges.filter(
          (edge) => edge.target === event.target
        ).length

        if (targetFromHandleInState === 1) return false
        if (sourceNode?.data.title === 'Condition') return true
        if (sourcesFromHandleInState < 1) return true
        return false
      }}
    />
  )
}

export default CustomHandle
