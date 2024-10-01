import { Card, CardContent } from '@/components/ui'
import { useConnections } from '@/providers/connections-provider'
import React, { useEffect, useState } from 'react'

type Props = {
  connection: ConnectionProviderProps
  title: string
  googleFile: any
}

const GoogleFileDetails = ({ connection, title, googleFile }: Props) => {
  const {} = useConnections()
  if (Object.keys(googleFile).length === 0 || googleFile.kind === '') return

  const [details, setDetails] = useState(['kind', 'name', 'mimeType'])

  useEffect(() => {
    if (title === 'GoogleDrive') details.push('id')
  }, [title])

  return (
    <Card>
      <CardContent>
        {details.map((v) => (
          <div key={v} className="flex justify-between">
            <p>{v}</p>
            <p>{googleFile[v]}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default GoogleFileDetails
