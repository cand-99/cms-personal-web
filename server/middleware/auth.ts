import UrlPattern from 'url-pattern'
import { getSessionByAuthToken } from '../database/repositories/sessionRepository'
export default defineEventHandler(async (event) => {
  const isAllowed = await protectAuthRoute(event)

  if (!isAllowed) {
    deleteCookie(event, 'auth_token')
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }))
  }
})

async function protectAuthRoute(event: any): Promise<boolean> {
  const token: string | undefined = getCookie(event, 'auth_token')

  const protectedRoutes = [
    '/api/project*',
    '/api/technology*',
    '/api/auth/logout',
    '/api/auth/register*',
  ]

  const isHandledByThisMiddleware = protectedRoutes.some((endopoint) => {
    const pattern = new UrlPattern(endopoint)

    return pattern.match(event.path)
  })

  if (!event?.path || !isHandledByThisMiddleware)
    return true

  return await authCheck(token)
}

async function authCheck(token: string | undefined): Promise<boolean> {
  if (!token)
    return false
  const user = await getSessionByAuthToken(token)
  if (!user.user)
    return false

  return true
}
