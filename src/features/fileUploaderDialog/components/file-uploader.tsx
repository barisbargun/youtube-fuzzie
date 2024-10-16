import { useCallback } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'

import ImageCrop from './image-crop'
import { useToast } from '@/hooks/use-toast'

type props = {
  cropImg: IFileUploader
  setCropImg: React.Dispatch<React.SetStateAction<IFileUploader>>
}

const FileUploader = ({ cropImg, setCropImg }: props) => {
  const { toast } = useToast()

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    const size = acceptedFiles[0].size / 1024
    if (size > 701)
      return toast({
        title: 'File size is too large',
        description: 'Please upload a file less than 700KB',
        variant: 'destructive'
      })
    setCropImg((v) => ({ ...v, url: URL.createObjectURL(acceptedFiles[0]) }))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg']
    }
  })

  return (
    <div className="flex-center w-full">
      <div {...(!cropImg?.url ? getRootProps() : {})} className="flex w-full">
        {!cropImg?.url && <input {...getInputProps()} />}

        <div className="flex-center flex h-[250px] w-full cursor-pointer flex-col sm:h-[300px]">
          {cropImg?.url ? (
            <ImageCrop cropImg={cropImg} setCropImg={setCropImg} />
          ) : (
            <div className="flex-center h-full w-full flex-col rounded-xl border-2 border-dashed">
              <h3 className="text-sm text-muted-foreground">Click or drag a file</h3>
              <h3 className="text-xs text-muted-foreground">(SVG, PNG, JPG, AVIF)</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FileUploader
