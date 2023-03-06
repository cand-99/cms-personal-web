import { deleteSessionToken } from '~~/server/database/repositories/sessionRepository'

export default defineEventHandler(async (event) => {
  const authToken = parseCookies(event)

  await deleteSessionToken(authToken.auth_token)
  // setCookie(event, 'auth_token', null)
  deleteCookie(event, 'auth_token')
  return 'logout success'
})
