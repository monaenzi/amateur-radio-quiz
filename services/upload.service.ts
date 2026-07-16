import { v2 as cloudinary } from 'cloudinary'

export const uploadService = {
  async uploadFile(buffer: Buffer, folder: string = 'amateurfunk') {
    return new Promise<string>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder }, (error, result) => {
          if (error) reject(error)
          else resolve(result!.secure_url)
        })
        .end(buffer)
    })
  },
}