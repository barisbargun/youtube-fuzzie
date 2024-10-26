import { useEffect, useState } from 'react'

import { Card, CardContent } from '@/components/ui/card'
import { onAddTemplate } from '@/features/editor-canvas/lib/editor'
import { useNode } from '@/features/editor-canvas/providers/node-provider'
import { EditorCanvasTypes } from '@/features/editor-canvas/types/editor'

type Props = {
  title: EditorCanvasTypes
  googleFile: any
}

const GoogleFileDetails = ({ title, googleFile }: Props) => {
  const connection = useNode()
  const [details, setDetails] = useState(['kind', 'name', 'mimeType'])

  useEffect(() => {
    if (title === 'GoogleDrive') setDetails((prev) => [...prev, 'id'])
  }, [title])

  const handleClick = (detail: string) => {
    onAddTemplate(connection, googleFile[detail], title)
  }

  if (Object.keys(googleFile).length === 0 || googleFile.kind === '') return
  return (
    <Card>
      <CardContent>
        {details.map((v) => (
          <button key={v} className="flex justify-between" onClick={() => handleClick(v)}>
            <p>{v}</p>
            <p>{googleFile[v]}</p>
          </button>
        ))}
      </CardContent>
    </Card>
  )
}

export default GoogleFileDetails
