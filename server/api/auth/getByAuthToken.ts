import type { IUser } from '~/types/IUser'
import { getUserBySessionToken } from '~~/server/service/sessionService'

export default defineEventHandler<IUser>(async (event) => {
  const authToken = parseCookies(event)
  const user = await getUserBySessionToken(authToken.auth_token)

  return user
})
