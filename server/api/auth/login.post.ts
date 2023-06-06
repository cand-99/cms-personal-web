import bcrypt from 'bcrypt'
import { getUserByUsername } from '~/server/database/repositories/userRepository'
import { sendTelegram } from '~/server/service/sendTelegram'
import { makeSession } from '~~/server/service/sessionService'
import { sanitizeUserForFrontend } from '~~/server/service/userService'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const username: string = body.username
  const password: string = body.password
  const user = await getUserByUsername(username)

  if (!user)
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthenticated' }))

  const isPasswordCorrect = await bcrypt.compare(password, user.password as string)

  if (!isPasswordCorrect)
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthenticated' }))

  sendTelegram(`User Login : ${JSON.stringify(user.name)}`)

  await makeSession(user, event)

  return sanitizeUserForFrontend(user)
})
