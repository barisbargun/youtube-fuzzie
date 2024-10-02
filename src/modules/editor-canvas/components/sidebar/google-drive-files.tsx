import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui'
import { Loader } from '@/components/icons'
import { getGoogleListener } from '../../actions/workflow-connections'

const GoogleDriveFiles = () => {
  const [loading, setLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const { toast } = useToast()

  const handleRequest = async () => {
    setLoading(true)
    const res = await axios.get('/api/drive-activity')
    if (res) {
      toast({ title: 'Google Drive Files', description: 'Files fetched successfully' })
      setIsListening(true)
    }
    setLoading(false)
    setIsListening(false)
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
        <Button disabled={loading} onClick={handleRequest}>
          {loading ? <Loader /> : 'Create Listener'}
        </Button>
      )}
    </div>
  )
}

export default GoogleDriveFiles
