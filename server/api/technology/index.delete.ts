import { deleteTechnology } from '~~/server/database/repositories/technologyRepository'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const technologyId: string = query.id as string

  if (!technologyId)
    return sendError(event, createError({ statusCode: 400, statusMessage: 'invalid param' }))

  await deleteTechnology(technologyId)
  return 'Success'
})
