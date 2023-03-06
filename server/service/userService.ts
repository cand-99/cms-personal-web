import type { IUser } from '~~/types/IUser'

export function sanitizeUserForFrontend(user: IUser): IUser {
  if (!user)
    return user as IUser

  delete user.password

  return user
}
