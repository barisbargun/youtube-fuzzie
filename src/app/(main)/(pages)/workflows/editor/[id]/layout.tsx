import React, { Suspense } from 'react'

import Loader from '@/components/icons/loader'
import EditorProvider from '@/features/editor-canvas/providers/editor-provider'
import { NodeProvider } from '@/features/editor-canvas/providers/node-provider'

type Props = {
  children: React.ReactNode
}

const layout = ({ children }: Props) => {
  return (
    <EditorProvider>
      <NodeProvider>
        <Suspense
          fallback={
            <div className="flex-center left-0 top-0 size-full">
              <Loader />
            </div>
          }
        >
          {children}
        </Suspense>
      </NodeProvider>
    </EditorProvider>
  )
}

export default layout
