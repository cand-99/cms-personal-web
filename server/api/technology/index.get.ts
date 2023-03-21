import { getTechnologys } from '~~/server/database/repositories/technologyRepository'
import type { ITechnology } from '~~/types/ITechnology'

export default defineEventHandler(async () => {
  const technology: ITechnology[] = await getTechnologys()
  return technology
})
