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

  await deleteImageCloudinary(providerPublicId)
  await deleteMediaFiles(projectId)
  const deletedProject = await deleteProject(projectId)
  sendTelegram(`Project ${JSON.stringify(deletedProject.name)} has deleted`)

  return 'project deleted'
})
