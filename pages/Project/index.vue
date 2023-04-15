<script lang="ts" setup>
import type { IProject } from '~~/types/IProject'

definePageMeta({
  middleware: 'auth',
})
useHead({
  title: 'Project',
})
const { imageFile, imageUrl, errors, handleImageSelected } = useImageUpload()
const loading = ref(false)

const defaultProjectData = {
  name: 'nama',
  description_id: 'des indo',
  description_en: 'des en',
  description_ja: 'des ja',
  description_ko: 'des ko',
  dateStart: 'date start',
  dateEnd: 'date end',
  technologyIDs: '6428e3de694f9cbfa32a4857',
}
const projectData = reactive(defaultProjectData)
const clearForm = () => {
  Object.assign(projectData, defaultProjectData)
}

const { toasts, showToast, removeToast, addToast, ToastType } = useToast()
const { data: project, refresh } = await useFetch<IProject[]>('/api/project')

const isOpen = ref(false)
function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}

const addProject = async () => {
  loading.value = true
  try {
    const { name, description_id, description_en, description_ja, description_ko, dateStart, dateEnd, technologyIDs } = projectData
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description_id', description_id)
    formData.append('description_en', description_en)
    formData.append('description_ja', description_ja)
    formData.append('description_ko', description_ko)
    formData.append('dateStart', dateStart)
    formData.append('dateEnd', dateEnd)
    formData.append('technologyIDs', technologyIDs)
    formData.append('file', imageFile.value)

    const { data, error } = await useFetch('/api/project', {
      method: 'POST',
      body: formData,
    })
    if (data.value) {
      refresh()
      clearForm()
      addToast(ToastType.Success, 'Project Saved')
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
        Add new Project
      </button>
    </div>

    <pre>
      {{ project }}
    </pre>

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
                    <form @submit.prevent="addProject()">
                      <div class="mb-4">
                        <BaseInput v-model="projectData.name" placeholder="name" />
                      </div>
                      <div class="mb-4">
                        <BaseInput v-model="projectData.description_id" placeholder="Description ID" />
                      </div>
                      <div class="mb-4">
                        <BaseInput v-model="projectData.description_en" placeholder="Description EN" />
                      </div>
                      <div class="mb-4">
                        <BaseInput v-model="projectData.description_ja" placeholder="Description JA" />
                      </div>
                      <div class="mb-4">
                        <BaseInput v-model="projectData.description_ko" placeholder="Description KO" />
                      </div>
                      <div class="mb-4">
                        <BaseInput v-model="projectData.dateStart" placeholder="Date Start" />
                      </div>
                      <div class="mb-4">
                        <BaseInput v-model="projectData.dateEnd" placeholder="Date End" />
                      </div>

                      <div>
                        <input id="selectImage" type="file" accept="image/*" class="hidden" @change="handleImageSelected">
                        <!-- Upload File Component -->
                        <div class=" flex justify-between w-full">
                          <div class="space-x-3 space-y-3 flex-1">
                            <label
                              for="selectImage"
                              class="bg-transparent border border-gray-400 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded-full h-9 w-9 md:w-auto md:h-auto md:px-6 md:py-2 text-xs font-bold inline-flex items-center hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-500 group cursor-pointer"
                            >
                              <Icon
                                name="ion:image"
                                class="text-lg text-emerald-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-300 m-auto"
                              />
                              <span class="ml-2 hidden md:block">Photo</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div v-show="imageUrl" class="mt-4 relative">
                        <figure class="w-full rounded-xl overflow-hidden">
                          <img :src="imageUrl" class="w-full h-full object-cover">
                        </figure>
                        <button
                          type="button"
                          class="absolute top-1 left-1 text-white text-xl h-7 w-7 rounded-full bg-gray-700 hover:bg-gray-900 inline-flex justify-center items-center transition-colors"
                          @click="imageUrl = ''"
                        >
                          <Icon name="material-symbols:close-rounded" />
                        </button>
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
