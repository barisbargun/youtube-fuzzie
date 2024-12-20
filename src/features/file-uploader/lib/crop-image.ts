export const createImage = (url: string) =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })

export function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation)

  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height)
  }
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export default async function getCroppedImg(
  imageSource: string,
  pixelCrop: any,
  rotation = 0,
  flip?: { horizontal: boolean; vertical: boolean }
) {
  const image = (await createImage(imageSource)) as any
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    return
  }

  const rotRad = getRadianAngle(rotation)

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation)

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth
  canvas.height = bBoxHeight

  // translate canvas context to a central location to allow rotating and flipping around the center
  context.translate(bBoxWidth / 2, bBoxHeight / 2)
  context.rotate(rotRad)
  context.scale(flip?.horizontal ? -1 : 1, flip?.vertical ? -1 : 1)
  context.translate(-image.width / 2, -image.height / 2)

  // draw rotated image
  context.drawImage(image, 0, 0)

  const croppedCanvas = document.createElement('canvas')

  const croppedContext = croppedCanvas.getContext('2d')

  if (!croppedContext) {
    return
  }

  // Set the size of the cropped canvas
  croppedCanvas.width = pixelCrop.width
  croppedCanvas.height = pixelCrop.height

  // Draw the cropped image onto the new canvas
  croppedContext.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  // As Base64 string
  return croppedCanvas.toDataURL('image/jpeg')

  // As a blob
  // return new Promise((resolve, reject) => {
  //   croppedCanvas.toBlob((file) => {
  //     resolve(URL.createObjectURL(file as any))
  //   }, 'image/jpeg')
  // })
}
