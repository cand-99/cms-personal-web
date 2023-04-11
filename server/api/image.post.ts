import formidable from 'formidable'
import { uploadToCloudinary } from '../utils/cloudinary'

export default defineEventHandler(async (event) => {
  const form = formidable({})

  const response = await new Promise((resolve, reject) => {
    form.parse(event.req, (err, fields: any, files: any) => {
      if (err)
        reject(err)

      resolve({ fields, files })
    })
  })

  // return response

  const { fields, files } = response as any

  if (!fields.text)
    return sendError(event, createError({ statusCode: 400, statusMessage: 'text is required' }))

  // console.log(fields.text);

  // const filePromises = Object.keys(files).map(async key => {
  //     const file = files[key]
  //     const cloudinaryResource = await deleteImageCloudinary('sjtvs9vq6vqmto3qjpii')

  //     console.log(cloudinaryResource);
  //     return cloudinaryResource

  // })
  const filePromises = Object.keys(files).map(async (key) => {
    const file = files[key]
    const cloudinaryResource: any = await uploadToCloudinary(file.filepath)

    // console.log(cloudinaryResource.secure_url)
    const dat = cloudinaryResource
    return {
      tes: dat,
    }
  })

  await Promise.all(filePromises)

  // console.log(filePromises);

  return filePromises
})
