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

const clearPassword = () => {
  password.value = ''
}

const handleLogin = async (username: string, password: string) => {
  loading.value = true
  try {
    const { data: user, error } = await useFetch('/api/auth/login', {
      method: 'POST',
      body: { username, password },
      key: username + password,
    })

    if (user.value) {
      useState('user').value = user
      await useRouter().push('/')
    }
    else { throw error }
  }
  catch (error: any) {
    clearPassword()
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
            <h1>Login</h1>
          </div>
          <div class="flex-auto p-6">
            <form @submit.prevent="handleLogin(username, password)">
              <div class="mb-4">
                <BaseInput v-model="username" placeholder="username" required />
              </div>
              <div class="mb-4">
                <BaseInput v-model="password" type="password" placeholder="password" required />
              </div>
              <div class="text-center">
                <BaseButton type="submit" :loading="loading">
                  Login
                </BaseButton>
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
