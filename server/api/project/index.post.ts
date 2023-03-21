import { createProject } from '~~/server/database/repositories/projectRepository'
import type { IProject } from '~~/types/IProject'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { name, image, description, dateStart, dateEnd, technologyIDs } = body

  if (!name || !image || !description || !dateStart || !dateEnd || !technologyIDs)
    return sendError(event, createError({ statusCode: 400, statusMessage: 'invalid input' }))

  const projectData: IProject = {
    name,
    image,
    description,
    dateStart,
    dateEnd,
    technologyIDs,
  }

  const project = await createProject(projectData)

  return project
})
