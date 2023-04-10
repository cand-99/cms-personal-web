import { deleteProject } from '~~/server/database/repositories/projectRepository'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const projectId: string = query.id as string

  if (!projectId)
    return sendError(event, createError({ statusCode: 400, statusMessage: 'invalid param' }))

  await deleteProject(projectId)
  return 'Success'
})
