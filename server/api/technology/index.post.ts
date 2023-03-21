import { createTechnology } from '~~/server/database/repositories/technologyRepository'
import type { ITechnology } from '~~/types/ITechnology'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body)
    return sendError(event, createError({ statusCode: 400, statusMessage: 'invalid body' }))

  const { icon, name } = body
  if (!icon || !name)
    return sendError(event, createError({ statusCode: 400, statusMessage: 'invalid input' }))

  const technologyData: ITechnology = {
    icon,
    name,
  }

  const technology = await createTechnology(technologyData)

  return technology
})
