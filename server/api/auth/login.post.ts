import bcrypt from 'bcrypt'
import { getUserByUsername } from '~/server/database/repositories/userRepository'
import { sendTelegram } from '~/server/utils/sendTelegram'
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

  const userAgent = event.node.req.headers['user-agent']
  const host = event.node.req.headers.host
  const ip = event.node.req.headers['x-forwarded-for']

  sendTelegram(`--User Login--\n name: ${JSON.stringify(user.name)}\n User Agent: ${userAgent}\n host: ${host}\n ip: ${ip}`)

  await makeSession(user, event)

  return sanitizeUserForFrontend(user)
})
