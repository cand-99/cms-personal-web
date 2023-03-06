<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
  middleware: 'guest',
  pageTransition: false,
  layoutTransition: false,
})

const username = ref('')
const password = ref('')
const loading = ref(false)
const { toasts, showToast, removeToast, addToast, ToastType } = useToast()

const handleLogin = async (username: string, password: string) => {
  loading.value = true
  try {
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
    else { throw error }
  }
  catch (error: any) {
    addToast(ToastType.Error, error.value.statusMessage)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container mx-2xl md:mx-auto">
    <div class="flex flex-wrap -mx-3 -mt-48 md:-mt-56 lg:-mt-48">
      <div class="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
        <div class="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border mx-md">
          <div class="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
            <h5>Login with</h5>
          </div>
          <div class="flex-auto p-6">
            <form role="form text-left" @submit.prevent="handleLogin(username, password)">
              <div class="mb-4">
                <input v-model="username" type="text" class="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" placeholder="username" aria-label="username" aria-describedby="username-addon">
              </div>
              <div class="mb-4">
                <input v-model="password" type="password" class="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" placeholder="Password" aria-label="Password" aria-describedby="password-addon">
              </div>
              <div class="text-center">
                <button type="submit" class="inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Transition>
      <div v-if="showToast" class="fixed w-full max-w-md space-y-3 right-4 top-4 z-99">
        <TransitionGroup name="list">
          <Toast v-for="(toast, index) in toasts" :key="toast.index" :type="toast.type" @close="removeToast(index)">
            {{ toast.message }}
          </Toast>
        </TransitionGroup>
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>
