import { v4 as uuidv4 } from 'uuid'
import { sanitizeUserForFrontend } from './userService'
import { createSession, getSessionByAuthToken } from '~/server/database/repositories/sessionRepository'
import type { IUser } from '~~/types/IUser'

export const makeSession = async (user: IUser, event: any): Promise<IUser> => {
  const authToken = uuidv4().replaceAll('-', '')
  const session = await createSession({ authToken, userId: user.id as string })
  const userId = session.userId

  if (userId) {
    setCookie(event, 'auth_token', authToken, { path: '/', httpOnly: true })
    return getUserBySessionToken(authToken)
  }

  throw new Error('Error Creating Session')
}

export async function getUserBySessionToken(authToken: string): Promise<IUser> {
  const session = await getSessionByAuthToken(authToken)

  return sanitizeUserForFrontend(session.user)
}
