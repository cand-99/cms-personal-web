<script lang="ts" setup>
import type { ITechnology } from '~~/types/ITechnology'

definePageMeta({
  middleware: 'auth',
})
useHead({
  title: 'Technology',
})
const loading = ref(false)
const iconName = ref('')
const iconId = ref('')
const clearForm = () => {
  iconName.value = ''
  iconId.value = ''
}
const { toasts, showToast, removeToast, addToast, ToastType } = useToast()

const { data: icons, refresh } = await useFetch<ITechnology[]>('/api/technology')

const isOpen = ref(false)
function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}

const addTechnology = async (iconId: string, name: string) => {
  loading.value = true
  try {
    const { data, error } = await useFetch('/api/technology', {
      method: 'POST',
      body: { icon: iconId, name },
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

const deleteTechnology = async (technologyId: string | undefined) => {
  loading.value = true
  try {
    const { data, error } = await useFetch('/api/technology', {
      method: 'DELETE',
      query: {
        id: technologyId,
      },
    })
    if (data.value) {
      refresh()
      clearForm()
      addToast(ToastType.Error, 'Technology Deleted')
    }
    else { throw error }
  }
  catch (error: any) {
    console.error(error)
    addToast(ToastType.Error, error.value.statusMessage)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <div class="flex justify-between pb-4">
      <div>
        <BaseButton type="button" class="block" @click="openModal()">
          Add new technology
        </BaseButton>
      </div>
    </div>

    <div class="flex space-x-4">
      <div v-for="(icon, index) in icons" :key="index" class="mt-4 text-4xl hover:text-green text-center">
        <ClientOnly>
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton>
                <Icon :name="icon.icon" />

                <p class="text-xs">
                  {{ icon.name }}
                </p>
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="absolute left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="px-1 py-1">
                  <MenuItem v-slot="{ active }" @click="deleteTechnology(icon.id)">
                    <button
                      class="group flex w-full items-center rounded-md px-2 py-2 text-sm" :class="[
                        active ? 'bg-light-primary text-white' : 'text-gray-900',
                      ]"
                    >
                      <Icon
                        name="material-symbols:delete-outline-rounded"
                        :class="[
                          active ? 'bg-light-primary text-white' : 'text-red-500',
                        ]"
                        class="mr-2 h-5 w-5 "
                        aria-hidden="true"
                      />
                      Delete <span class="text-red ml-1">{{ icon.name }}</span>?
                    </button>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <button
                      class="group flex w-full items-center rounded-md px-2 py-2 text-sm" :class="[
                        active ? 'bg-light-primary text-white' : 'text-gray-900',
                      ]"
                    >
                      <Icon
                        name="ic:twotone-edit"
                        :class="[
                          active ? 'bg-light-primary text-white' : 'text-blue-500',
                        ]"
                        class="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Edit
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </ClientOnly>
      </div>
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
                    <form @submit.prevent="addTechnology(iconId, iconName)">
                      <div class="mb-4">
                        <BaseInput v-model="iconName" placeholder="name" />
                      </div>
                      <div class="mb-4">
                        <BaseInput v-model="iconId" placeholder="icon" />
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
