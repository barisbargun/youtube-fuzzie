import React from 'react'
import EditorCanvas from './_components/editor-canvas'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='h-full'>
      <EditorCanvas />
    </div>
  )
}

export default page
