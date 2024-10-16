import { useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
type Props = {
  cropImg: IFileUploader
  setCropImg: React.Dispatch<React.SetStateAction<IFileUploader>>
}

const ImageCrop = ({ cropImg, setCropImg }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const onCropComplete = (_croppedArea: Area, pixels: Area) => {
    setCropImg((v) => v && { ...v, pixels })
  }
  return (
    <div className="relative h-full w-full">
      <Cropper
        image={cropImg.url}
        crop={crop}
        zoom={zoom}
        maxZoom={9}
        aspect={1 / 1}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        cropShape="round"
      />
    </div>
  )
}

export default ImageCrop
