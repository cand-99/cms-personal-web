import prisma from '../client'
import type { IUser } from '~/types/IUser'

export async function createUser(data: IUser) {
  return await prisma.user.create({
    data: {
      username: data.username,
      name: data.name,
      password: data.password as string,
    },
  })
}

export async function getUserById(id: string): Promise<IUser | null> {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  })
}

export async function getUserByUsername(username: string): Promise<IUser | null> {
  return await prisma.user.findUnique({
    where: {
      username,
    },
  })
}
