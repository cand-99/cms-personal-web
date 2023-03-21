import prisma from '~/server/database/client'
import type { IProject } from '~~/types/IProject'

export async function createProject(data: IProject): Promise<IProject> {
  return await prisma.project.create({
    data: {
      name: data.name,
      image: data.image,
      description: data.description,
      dateStart: data.dateStart,
      dateEnd: data.dateEnd,
      technologyIDs: data.technologyIDs,
    },
  })
}
