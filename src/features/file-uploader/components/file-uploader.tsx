'use client'

import { DialogContentProps } from '@radix-ui/react-dialog'
import { PlusIcon } from '@radix-ui/react-icons'
import React, { useState } from 'react'
import { toast } from 'sonner'

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
import { cn } from '@/lib/utils'

import FileUploaderCrop from './crop'
import getCroppedImg from '../lib/crop-image'

type Props = DialogContentProps & {
  setImage?: React.Dispatch<string | null>
  children?: React.ReactNode
}

const FileUploaderDialog = ({ setImage, children, className, ...props }: Props) => {
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [cropImg, setCropImg] = useState<IFileUploader>({
    url: '',
    pixels: { x: 0, y: 0, width: 0, height: 0 }
  })

  const handleSubmit = async () => {
    if (!cropImg?.url)
      return toast.error('No images', {
        description: 'Please select a file'
      })

    const showImg = await getCroppedImg(cropImg.url, cropImg.pixels, 0)
    setImage!(showImg)
    setCropImg({ url: '', pixels: { x: 0, y: 0, width: 0, height: 0 } })
    setDialogOpen(false)
  }
  if (!setImage) return null
  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <PlusIcon className="mr-2 size-5" />
            <span>Change Image</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        className={cn('max-h-[90%] w-[600px] max-w-[90vw] overflow-y-auto border-4', className)}
        {...props}
      >
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>
            Maximum 700kb photos, less is better. You can zoom your picture.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-f flex !flex-col items-center gap-6 overflow-hidden">
          <FileUploaderCrop cropImg={cropImg} setCropImg={setCropImg} />
          <Button onClick={handleSubmit} variant="secondary" className="!ml-0 w-full">
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FileUploaderDialog
