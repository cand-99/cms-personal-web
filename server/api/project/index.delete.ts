import { deleteMediaFiles } from '~/server/database/repositories/mediaFiles'
import { deleteProject, getProviderPublicId } from '~~/server/database/repositories/projectRepository'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const projectId: string = query.id as string

  if (!projectId)
    return sendError(event, createError({ statusCode: 400, statusMessage: 'invalid param' }))

  const providerPublicId = await getProviderPublicId(projectId)
  if (!providerPublicId)
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Project not Found' }))

  // delete foto fron cloudinary
  await deleteImageCloudinary(providerPublicId)
  // delete MediaFiles by ProjectId
  await deleteMediaFiles(projectId)
  // delete project by projectId
  await deleteProject(projectId)

  return 'project deleted'
})
