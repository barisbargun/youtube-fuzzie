import { useCallback } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

import ImageCrop from './image-crop'

type props = {
  cropImg: IFileUploader
  setCropImg: React.Dispatch<React.SetStateAction<IFileUploader>>
}

const FileUploader = ({ cropImg, setCropImg }: props) => {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const size = acceptedFiles[0].size / 1024
      if (size > 701)
        return toast.error('File size is too large', {
          description: 'Please upload a file less than 700KB'
        })
      setCropImg((v) => ({ ...v, url: URL.createObjectURL(acceptedFiles[0]) }))
    },
    [setCropImg]
  )

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
            <div className="flex-center size-full flex-col rounded-xl border-2 border-dashed">
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
