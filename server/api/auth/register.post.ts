import bcrypt from 'bcrypt'
import { createUser } from '~~/server/database/repositories/userRepository'
import { makeSession } from '~~/server/service/sessionService'
import type { IUser } from '~~/types/IUser'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.name || !body.username || !body.password)
    return sendError(event, createError({ statusCode: 400, statusMessage: 'invalid input' }))

  const encryptedPassword: string = await bcrypt.hash(body.password, 10)

  const userData: IUser = {
    name: body.name,
    username: body.username,
    password: encryptedPassword,
  }

  const user = await createUser(userData)

  return await makeSession(user as IUser, event)
})
