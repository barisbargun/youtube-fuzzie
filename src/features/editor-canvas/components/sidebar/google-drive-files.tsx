import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Loader } from '@/components/icons'
import { Button } from '@/components/ui'
import { getGoogleListener } from '@/lib/db/user'

const GoogleDriveFiles = () => {
  const [loading, setLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)

  const handleRequest = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/api/drive-activity')
      if (res) {
        toast('Google Drive Files', { description: 'Files fetched successfully' })
        setIsListening(true)
      }
    } catch (error) {
      setIsListening(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    const onListener = async () => {
      const listener = await getGoogleListener()
      if (listener && listener.googleResourceId) setIsListening(true)
    }
    onListener()
  }, [])

  return (
    <div>
      {isListening ? (
        <p>Listening...</p>
      ) : (
        <Button disabled={loading} onClick={handleRequest} variant="outline">
          {loading ? <Loader /> : 'Create Listener'}
        </Button>
      )}
    </div>
  )
}

export default GoogleDriveFiles
