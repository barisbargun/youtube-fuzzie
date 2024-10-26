import { UploadApiOptions, v2 as cloudinary } from 'cloudinary'
import { NextRequest } from 'next/server'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function POST(request: NextRequest) {

  const { imgUrl, public_id } = await request.json()
  if (!imgUrl || !public_id) return new Response('Invalid request', { status: 400 })
  const options: UploadApiOptions = {
    use_filename: true,
    folder: 'fuzzie',
    overwrite: true,
    unique_filename: true,
    transformation: { quality: '70', crop: 'crop', fetch_format: 'avif' },
    public_id
  }
  const result = await cloudinary.uploader.upload(imgUrl, options)
  return new Response(JSON.stringify({ imgUrl: result.secure_url }), { status: 200 })
}
