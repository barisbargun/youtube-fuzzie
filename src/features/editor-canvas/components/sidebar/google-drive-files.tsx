import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import Loader from '@/components/icons/loader'
import { Button } from '@/components/ui/button'
import { getGoogleListener } from '@/lib/db/user'

const GoogleDriveFiles = () => {
  const [loading, setLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)

  const handleRequest = async () => {
    setLoading(true)
    try {
      const resp = await axios.get('/api/drive-activity')
      if (resp) {
        toast('Google Drive Files', { description: 'Files fetched successfully' })
        setIsListening(true)
      }
    } catch {
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
        <Button disabled={loading} variant="outline" onClick={handleRequest}>
          {loading ? <Loader /> : 'Create Listener'}
        </Button>
      )}
    </div>
  )
}

export default GoogleDriveFiles
