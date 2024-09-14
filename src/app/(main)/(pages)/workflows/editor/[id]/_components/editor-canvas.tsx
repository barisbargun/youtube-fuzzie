"use client"

import React, { useState } from 'react'
import { ReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Loader } from '@/components/icons'

const EditorCanvas = () => {
  const [loading, setLoading] = useState(true)

  return (
    <div className="h-full">
      {loading ? (
        <div className="flex-center left-0 top-0 h-full w-full">
          <Loader />
        </div>
      ) : (
        <div>

        </div>
      )}
    </div>
  )
}

export default EditorCanvas
