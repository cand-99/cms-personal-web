import { projectById } from '~~/server/database/repositories/projectRepository'
import type { IProject } from '~~/types/IProject'
export default defineEventHandler(async (event) => {
  const { id }: any = event.context.params

  const project: IProject | null = await projectById(id)
  if (!project)
    return sendError(event, createError({ statusCode: 404, statusMessage: 'Project not found' }))

  return project
})
