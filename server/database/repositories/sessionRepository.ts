import type { IUser } from '~/types/IUser'
import prisma from '~/server/database/client'
import type { ISession } from '~~/types/ISession'

export async function createSession(data: ISession): Promise<ISession> {
  return await prisma.session.create({
    data: {
      userId: data.userId,
      authToken: data.authToken,
    },
  })
}

export async function getSessionByAuthToken(authToken: string): Promise<ISession | any> {
  const user: IUser = await getUserByAuthToken(authToken) as unknown as IUser

  return { authToken, user }
}

export async function deleteSessionToken(authToken: string): Promise<void> {
  await prisma.session.delete({
    where: {
      authToken,
    },
  })
}

async function getUserByAuthToken(authToken: string): Promise<IUser | null> {
  return prisma.session.findUnique({
    where: {
      authToken,
    },
  }).user() as any
}
