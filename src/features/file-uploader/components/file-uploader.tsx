'use client'

import { DialogContentProps } from '@radix-ui/react-dialog'
import { PlusIcon } from '@radix-ui/react-icons'
import React, { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

import getCroppedImg from '../lib/crop-image'
import { IFileUploader } from '../types/file-upload'
import FileUploaderCrop from './crop'

type Props = DialogContentProps & {
  setImage?: React.Dispatch<string | undefined>
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
  if (!setImage) return
  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button size="sm" variant="outline">
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
          <Button className="!ml-0 w-full" variant="secondary" onClick={handleSubmit}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FileUploaderDialog
