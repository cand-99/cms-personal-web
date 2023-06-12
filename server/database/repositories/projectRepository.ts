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
      url: data.url,
      isActive: data.isActive,
      category: data.category,
    },
  })
}

export async function updateProject(id: string, data: IProject) {
  return await prisma.project.updateMany({
    where: {
      id,
    },
    data: {
      name: data.name,
      description_id: data.description_id,
      description_en: data.description_en,
      description_ja: data.description_ja,
      description_ko: data.description_ko,
      dateStart: data.dateStart,
      dateEnd: data.dateEnd,
      technologyIDs: data.technologyIDs,
      url: data.url,
      isActive: data.isActive,
      category: data.category,
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
      url: true,
      isActive: true,
      category: true,
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
          format: true,
        },
      },
      dateStart: true,
      dateEnd: true,
    },
  })
  return projects
}

export async function getProviderPublicId(id: string): Promise <string | undefined> {
  const providerPublicId = await prisma.project.findUnique({
    select: {
      mediaFiles: {
        select: {
          providerPublicId: true,
        },
      },
    },
    where: {
      id,
    },
  })
  return providerPublicId?.mediaFiles?.providerPublicId
}

export async function deleteProject(id: string): Promise<IProject> {
  return await prisma.project.delete({
    where: {
      id,
    },
  })
}
export async function projectById(id: string): Promise<IProject | null> {
  return await prisma.project.findUnique({
    select: {
      id: true,
      name: true,
      description_id: true,
      description_en: true,
      description_ja: true,
      description_ko: true,
      technologyIDs: true,
      url: true,
      isActive: true,
      category: true,
      mediaFiles: {
        select: {
          url: true,
          providerPublicId: true,
          format: true,
        },
      },
      dateStart: true,
      dateEnd: true,
    },
    where: {
      id,
    },
  })
}
