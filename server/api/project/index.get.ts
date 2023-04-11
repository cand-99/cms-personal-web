import { getProjects } from '~~/server/database/repositories/projectRepository'
import type { IProject } from '~~/types/IProject'
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  let lang: string = query.lang as string

  if (!lang)
    lang = 'id'

  if (lang !== 'id' && lang !== 'en' && lang !== 'ja' && lang !== 'ko')
    lang = 'id'

  const projects: IProject[] = await getProjects(lang)

  return projects.map(proj => ({
    id: proj.id,
    name: proj.name,
    description: proj.description_id || proj.description_en || proj.description_ja || proj.description_ko,
    technology: proj.technology,
    dateStart: proj.dateStart,
    dateEnd: proj.dateEnd,
    mediaFiles: proj.mediaFiles,
  }))
})
