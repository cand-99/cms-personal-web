import prisma from '~/server/database/client'
import type { IProject } from '~~/types/IProject'

export async function createProject(data: IProject): Promise<IProject> {
  return await prisma.project.create({
    data: {
      name: data.name,
      description_id: data.description_id,
      description_en: data.description_en,
      description_ja: data.description_ja,
      description_ko: data.description_ko,
      dateStart: data.dateStart,
      dateEnd: data.dateEnd,
      technologyIDs: data.technologyIDs,
    },
  })
}

export async function getProjects(lang: string): Promise <IProject[]> {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      name: true,
      description_id: lang === 'id',
      description_en: lang === 'en',
      description_ja: lang === 'ja',
      description_ko: lang === 'ko',
      technology: {
        select: {
          id: true,
          name: true,
          icon: true,
        },
      },
      mediaFiles: {
        select: {
          url: true,
          providerPublicId: true,
        },
      },
      dateStart: true,
      dateEnd: true,
    },
  })
  return projects
}

export async function deleteProject(id: string): Promise<void> {
  await prisma.project.delete({
    where: {
      id,
    },
  })
}
