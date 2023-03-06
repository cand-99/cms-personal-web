import type { IUser } from '~/types/IUser'

export const useAuthCookie = () => useCookie('auth_token')

export async function useUser(): Promise<IUser | undefined> {
  const authCookie = useAuthCookie().value
  const user = useState<IUser>('user')

  if (authCookie && !user.value) {
    const { data } = await useFetch<IUser>('/api/auth/getByAuthToken', {
      headers: useRequestHeaders(['cookie']) as HeadersInit,
    })

    user.value = data.value as IUser
  }

  return user.value
}

export async function useLoggedIn() {
  const user = await useUser()
  if (user?.id !== null && user !== undefined)
    return true

  return false
}

export async function userLogout() {
  await $fetch('/api/auth/logout', {
    headers: useRequestHeaders(['cookie']) as HeadersInit,
  })
  useState('user').value = null
  await useRouter().push('/login')
}

export async function loginWithUserName(username: string, password: string) {
  const { data: user, error } = await useFetch('/api/auth/login', {
    method: 'POST',
    body: { username, password },
    server: false,
    key: username + password,
  })

  if (user.value) {
    useState('user').value = user
    await useRouter().push('/')
  }
  else { return error }
}
