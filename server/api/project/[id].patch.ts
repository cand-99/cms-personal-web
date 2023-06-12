import formidable from 'formidable'
import { updateMediaFile } from '~/server/database/repositories/mediaFiles'
import { projectById, updateProject } from '~~/server/database/repositories/projectRepository'
import type { IProject } from '~~/types/IProject'

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
  const { name, description_id, description_en, description_ja, description_ko, dateStart, dateEnd, technologyIDs, projectId, url, isActive, category } = fields

  if (!name || !description_id || !description_en || !description_ja || !description_ko || !dateStart || !dateEnd || !url || !isActive || !category || !JSON.parse(technologyIDs).length || !projectId)
    return sendError(event, createError({ statusCode: 400, statusMessage: 'invalid input' }))

  const project: IProject | null = await projectById(projectId)
  if (!project)
    return sendError(event, createError({ statusCode: 404, statusMessage: 'Project not found' }))

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

  const projectUpdated = await updateProject(projectId, projectData)

  if (files.file) {
    await deleteImageCloudinary(project.mediaFiles?.providerPublicId as any)

    const filePromises = Object.keys(files).map(async (key) => {
      const file = files[key]
      const cloudinaryResource: any = await uploadToCloudinary(file.filepath)

      return updateMediaFile(projectId,
        {
          url: cloudinaryResource.secure_url,
          providerPublicId: cloudinaryResource.public_id,
          projectId: project.id,
          format: cloudinaryResource.format,
        })
    })

    await Promise.all(filePromises)
  }

  sendTelegram(`Project updated ${JSON.stringify(project.name)}`)

  return projectUpdated
})
