import formidable from 'formidable'
import { uploadToCloudinary } from '~~/server/utils/cloudinary'
import { createProject } from '~~/server/database/repositories/projectRepository'
import type { IProject } from '~~/types/IProject'
import { createMediaFile } from '~~/server/database/repositories/mediaFiles'

export default defineEventHandler(async (event) => {
  const form = formidable({})

  const response = await new Promise((resolve, reject) => {
    form.parse(event.req, (err, fields: any, files: any) => {
      if (err)
        reject(err)
      resolve({ fields, files })
    })
  })

  const { fields, files } = response as any
  const { name, description_id, description_en, description_ja, description_ko, dateStart, dateEnd, technologyIDs, url, isActive, category } = fields

  if (!name || !description_id || !description_en || !description_ja || !description_ko || !dateStart || !dateEnd || !url || !isActive || !category || !JSON.parse(technologyIDs).length || !files.file)
    return sendError(event, createError({ statusCode: 400, statusMessage: 'invalid input' }))

  const projectData = {
    name,
    description_id,
    description_en,
    description_ja,
    description_ko,
    dateStart,
    dateEnd,
    url,
    isActive: !(isActive === 'false'),
    category,
    technologyIDs: JSON.parse(technologyIDs),
  } as IProject

  const project = await createProject(projectData)

  const filePromises = Object.keys(files).map(async (key) => {
    const file = files[key]
    const cloudinaryResource: any = await uploadToCloudinary(file.filepath)

    return createMediaFile({
      url: cloudinaryResource.secure_url,
      providerPublicId: cloudinaryResource.public_id,
      projectId: project.id,
      format: cloudinaryResource.format,
    })
  })

  await Promise.all(filePromises)

  sendTelegram(`Project added ${JSON.stringify(project.name)}`)

  return project
})
