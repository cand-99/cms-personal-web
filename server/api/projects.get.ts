import { getActiveProjects } from '~~/server/database/repositories/projectRepository'
import type { IProject } from '~~/types/IProject'
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  let lang: string = query.lang as string

  if (!lang)
    lang = 'id'

  if (lang !== 'id' && lang !== 'en' && lang !== 'ja' && lang !== 'ko')
    lang = 'id'

  const projects: IProject[] = await getActiveProjects(lang)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    },
    body: projects.map(project => ({
      id: project.id,
      name: project.name,
      description: project.description_id || project.description_en || project.description_ja || project.description_ko,
      technology: project.technology,
      dateStart: project.dateStart,
      dateEnd: project.dateEnd,
      mediaFiles: project.mediaFiles,
      url: project.url,
      isActive: project.isActive,
      category: project.category,
    } as IProject)),
  }
})
