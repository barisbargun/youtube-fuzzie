import { Card, CardContent } from '@/components/ui'
import { onAddTemplate } from '@/lib/editor'
import { useNode } from '@/providers/node-provider'
import React, { useEffect, useState } from 'react'

type Props = {
  title: EditorCanvasTypes
  googleFile: any
}

const GoogleFileDetails = ({ title, googleFile }: Props) => {
  const connection = useNode()
  if (Object.keys(googleFile).length === 0 || googleFile.kind === '') return

  const [details, setDetails] = useState(['kind', 'name', 'mimeType'])

  useEffect(() => {
    if (title === 'GoogleDrive') setDetails((prev) => prev.concat('id'))
  }, [title])

  const handleClick = (detail: string) => {
    onAddTemplate(connection, googleFile[detail], title)
  }

  return (
    <Card>
      <CardContent>
        {details.map((v) => (
          <div key={v} className="flex justify-between" onClick={(_) => handleClick(v)}>
            <p>{v}</p>
            <p>{googleFile[v]}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default GoogleFileDetails
