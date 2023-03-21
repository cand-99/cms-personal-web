import prisma from '~/server/database/client'
import type { ITechnology } from '~~/types/ITechnology'

export async function createTechnology(data: ITechnology): Promise<ITechnology> {
  return await prisma.technology.create({
    data: {
      name: data.name,
      icon: data.icon,
    },
  })
}

export async function getTechnologys(): Promise<ITechnology[]> {
  return await prisma.technology.findMany({
    select: {
      id: true,
      icon: true,
      name: true,
    },
  })
}
