<script lang="ts" setup>
import type { ITechnology } from '~~/types/ITechnology'

definePageMeta({
  middleware: 'auth',
})
useHead({
  title: 'Technology',
})
const loading = ref(false)
const name = ref('')
const icon = ref('')
const clearForm = () => {
  name.value = ''
  icon.value = ''
}
const { toasts, showToast, removeToast, addToast, ToastType } = useToast()

const { data: icons, error, refresh } = await useFetch<ITechnology[]>('/api/technology')

const isOpen = ref(false)
function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}

const addTechnology = async (icon: string, name: string) => {
  loading.value = true
  try {
    const { data, error } = await useFetch('/api/technology', {
      method: 'POST',
      body: { icon, name },
    })
    if (data.value) {
      refresh()
      clearForm()
      addToast(ToastType.Success, 'Technology Saved')
      closeModal()
    }
    else { throw error }
  }
  catch (error: any) {
    console.error(error)
    addToast(ToastType.Error, error.value.statusMessage)
    openModal()
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <div class="flex justify-between pb-4">
      <button type="button" class="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white disabled:cursor-not-allowed disabled:scale-100!" @click="openModal()">
        Add new technology
      </button>
    </div>

    <div v-for="(icon, index) in icons" :key="index" class="mt-4">
      <p>name: {{ icon.name }}</p>
      <Icon :name="icon.icon" />
    </div>

    <ClientOnly>
      <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" class="relative z-12" @close="closeModal">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div
              class="flex items-center justify-center min-h-full p-4 text-center"
            >
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel
                  class="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
                >
                  <div class="flex-auto w-full max-w-md p-6 mx-auto">
                    <form @submit.prevent="addTechnology(icon, name)">
                      <div class="mb-4">
                        <BaseInput v-model="name" placeholder="name" />
                      </div>
                      <div class="mb-4">
                        <BaseInput v-model="icon" placeholder="icon" />
                      </div>

                      <div class="text-center">
                        <BaseButton type="submit" :loading="loading">
                          Save
                        </BaseButton>
                      </div>
                    </form>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </ClientOnly>

    <!-- Toasts -->
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

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
