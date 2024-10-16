'use client'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui'
import { PlusIcon } from '@radix-ui/react-icons'
import React from 'react'
import { useState } from 'react'
import FileUploader from './components/file-uploader'
import { useToast } from '@/hooks/use-toast'
import getCroppedImg from './lib/crop-image'

type Props = {
  setImage: React.Dispatch<any>
}

const FileUploaderDialog = ({ setImage }: Props) => {
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [cropImg, setCropImg] = useState<IFileUploader>({
    url: '',
    pixels: { x: 0, y: 0, width: 0, height: 0 }
  })
  const { toast } = useToast()

  const handleSubmit = async () => {
    if (!cropImg?.url)
      return toast({
        title: 'No images',
        description: 'Please select a file',
        variant: 'destructive'
      })

    const showImg = await getCroppedImg(cropImg.url, cropImg.pixels, 0)
    setImage(showImg)
    setCropImg({ url: '', pixels: { x: 0, y: 0, width: 0, height: 0 } })
    setDialogOpen(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusIcon className="mr-2 size-5" />
          <span>Change Image</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90%] w-[600px] max-w-[90vw] overflow-y-auto border-4">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>
            Maximum 700kb photos, less is better. You can zoom your picture.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-f flex !flex-col items-center gap-6 overflow-hidden">
          <FileUploader cropImg={cropImg} setCropImg={setCropImg} />
          <Button onClick={handleSubmit} variant="secondary" className="!ml-0 w-full">
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FileUploaderDialog
