<script lang="ts" setup>
import type { IMediaFiles } from '~/types/IMediaFiles'
import type { IProject } from '~/types/IProject'
import type { ITechnology } from '~/types/ITechnology'

definePageMeta({
  middleware: 'auth',
})
useHead({
  title: 'Edit Project',
})
const { toasts, showToast, removeToast, addToast, ToastType } = useToast()
const { imageFile, imageUrl, errors, handleImageSelected } = useImageUpload()
const { data: technologys, refresh } = await useFetch<ITechnology[]>('/api/technology')
const loading = ref(false)
const router = useRouter()
const route = useRoute()
const { data } = await useFetch<IProject>(`/api/project/${route.params.id}`)

const categories = [
  { name: data.value?.category === 'Personal' ? 'Personal' : 'Team' },
  { name: data.value?.category === 'Team' ? 'Team' : 'Personal' },
]
const selectedCategories = ref(categories[0])

const name = ref<string>(data.value?.name ?? '')
const projectId = ref<string>(data.value?.id ?? '')
const description_id = ref<string>(data.value?.description_id ?? '')
const description_en = ref<string>(data.value?.description_en ?? '')
const description_ja = ref<string>(data.value?.description_ja ?? '')
const description_ko = ref<string>(data.value?.description_ko ?? '')
const dateStart = ref<string>(data.value?.dateStart ?? '')
const dateEnd = ref<string>(data.value?.dateEnd ?? '')
const url = ref<string>(data.value?.url ?? '')
const isActive = ref<boolean>(data.value?.isActive ?? false)
const category = ref<string>(data.value?.category ?? 'Personal')

const technologyIDs = reactive<string[]>(data.value?.technologyIDs ?? [])
const mediaFiles = ref<IMediaFiles | undefined | null>(data.value?.mediaFiles)

const addProject = async () => {
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('projectId', projectId.value)
    formData.append('name', name.value)
    formData.append('description_id', description_id.value)
    formData.append('description_en', description_en.value)
    formData.append('description_ja', description_ja.value)
    formData.append('description_ko', description_ko.value)
    formData.append('dateStart', dateStart.value)
    formData.append('dateEnd', dateEnd.value)
    formData.append('url', url.value)
    formData.append('isActive', isActive.value.toString())
    formData.append('category', selectedCategories.value.name)
    formData.append('technologyIDs', JSON.stringify(technologyIDs))
    formData.append('file', imageFile.value)

    const { data, error } = await useFetch(`/api/project/${route.params.id}`, {
      method: 'PATCH',
      body: formData,
    })
    if (data.value) {
      addToast(ToastType.Success, 'Project Edited')
      await navigateTo('/project')
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

function addTechnology(idTechnology: string) {
  if (technologyIDs.includes(idTechnology))
    technologyIDs.splice(technologyIDs.indexOf(idTechnology), 1)

  else
    technologyIDs.push(idTechnology)
}

const clearImage = () => {
  imageUrl.value = ''
  imageFile.value = ''
}
</script>

<template>
  <div>
    <div class="flex justify-between mb-8">
      <div>
        <BaseButton type="button" @click="router.back()">
          Go Back
        </BaseButton>
      </div>
    </div>
    <form @submit.prevent="addProject()">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Edit Project
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-full">
              <label for="project-name" class="block text-sm font-medium leading-6 text-gray-900">Project Name</label>
              <div class="mt-2">
                <BaseInput id="project-name" v-model="name" type="text" placeholder="Project Name" required />
              </div>
            </div>
            <div class="sm:col-span-full">
              <label for="project-url" class="block text-sm font-medium leading-6 text-gray-900">Project URL</label>
              <div class="mt-2">
                <BaseInput id="project-url" v-model="url" type="text" placeholder="Project Name" required />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label for="date-start" class="block text-sm font-medium leading-6 text-gray-900">Date Start</label>
              <div class="mt-2">
                <BaseInput id="date-start" v-model="dateStart" type="text" placeholder="Date Start" required />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label for="date-end" class="block text-sm font-medium leading-6 text-gray-900">Date End</label>
              <div class="mt-2">
                <BaseInput id="date-end" v-model="dateEnd" type="text" placeholder="Date End" required />
              </div>
            </div>

            <div class="sm:col-span-full">
              <label for="project-description-id" class="block text-sm font-medium leading-6 text-gray-900">Project Description (ID) <Icon name="openmoji:flag-indonesia" /> </label>
              <div class="mt-2">
                <BaseInput id="project-description-id" v-model="description_id" type="textarea" placeholder="Project Description (ID)" required />
                <p class="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>
            </div>
            <div class="sm:col-span-full">
              <label for="project-description-en" class="block text-sm font-medium leading-6 text-gray-900">Project Description (EN) <Icon name="flagpack:gb-ukm" /> </label>
              <div class="mt-2">
                <BaseInput id="project-description-en" v-model="description_en" type="textarea" placeholder="Project Description (EN)" required />
                <p class="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>
            </div>
            <div class="sm:col-span-full">
              <label for="project-description-ja" class="block text-sm font-medium leading-6 text-gray-900">Project Description (JA) <Icon name="twemoji:flag-japan" /> </label>
              <div class="mt-2">
                <BaseInput id="project-description-ja" v-model="description_ja" type="textarea" placeholder="Project Description (JA)" required />
                <p class="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>
            </div>
            <div class="sm:col-span-full">
              <label for="project-description-ko" class="block text-sm font-medium leading-6 text-gray-900">Project Description (KO) <Icon name="twemoji:flag-south-korea" /> </label>
              <div class="mt-2">
                <BaseInput id="project-description-ko" v-model="description_ko" type="textarea" placeholder="Project Description (KO)" required />
                <p class="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>
            </div>

            <div class="sm:col-span-full">
              <span class="block text-sm font-medium leading-6 text-gray-900">Technology </span>
              <div class="mt-2 flex  space-x-2 text-4xl transition-all">
                <button v-for="(technology, index) in technologys" :key="index" type="button" :class="technologyIDs.includes(technology?.id ?? '') ? 'text-green' : ''" @click="addTechnology(technology?.id ?? '') ">
                  <Icon :name="technology.icon" />
                </button>
              </div>
            </div>

            <div class="sm:col-span-full">
              <span class="block text-sm font-medium leading-6 text-gray-900 mr-3">{{ isActive ? 'Active' : 'Non-Active' }} </span>
              <Switch
                v-model="isActive"
                :class="isActive ? 'bg-green' : 'bg-gray-200'"
                class="relative inline-flex h-6 w-11 items-center rounded-full"
              >
                <span class="sr-only">Enable notifications</span>
                <span
                  :class="isActive ? 'translate-x-6' : 'translate-x-1'"
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition"
                />
              </Switch>
            </div>

            <div class="sm:col-span-full">
              <span class="block text-sm font-medium leading-6 text-gray-900">Category </span>
              <div class="w-72">
                <Listbox v-model="selectedCategories">
                  <div class="relative mt-1">
                    <ListboxButton
                      class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                    >
                      <span class="block truncate">{{ selectedCategories?.name }}</span>
                      <span
                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                      >
                        <Icon
                          name="heroicons:chevron-up-down"
                          class="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </ListboxButton>

                    <Transition
                      leave-active-class="transition duration-100 ease-in"
                      leave-from-class="opacity-100"
                      leave-to-class="opacity-0"
                    >
                      <ListboxOptions
                        class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                      >
                        <ListboxOption
                          v-for="category in categories"
                          v-slot="{ active, selected }"
                          :key="category.name"
                          :value="category"
                          as="template"
                        >
                          <li
                            class="relative cursor-default select-none py-2 pl-10 pr-4" :class="[
                              active ? 'bg-green-100 text-green-900' : 'text-gray-900',
                            ]"
                          >
                            <span
                              class="block truncate" :class="[
                                selected ? 'font-medium' : 'font-normal',
                              ]"
                            >{{ category.name }}</span>
                            <span
                              v-if="selected"
                              class="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600"
                            >
                              <Icon name="heroicons:check" class="h-5 w-5" aria-hidden="true" />
                            </span>
                          </li>
                        </ListboxOption>
                      </ListboxOptions>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>

            <div class="col-span-full">
              <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
              <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div class="text-center">
                  <div v-if="imageUrl" class="mb-4 relative max-w-sm">
                    <figure class="w-full rounded-xl overflow-hidden">
                      <img :src="imageUrl" class="w-full h-full object-cover">
                    </figure>
                    <button
                      type="button"
                      class="absolute top-1 left-1 text-white text-xl h-7 w-7 rounded-full bg-gray-700 hover:bg-gray-900 inline-flex justify-center items-center transition-colors"
                      @click="clearImage()"
                    >
                      <Icon name="material-symbols:close-rounded" />
                    </button>
                  </div>
                  <div v-else>
                    <NuxtImg
                      v-if="mediaFiles?.providerPublicId"
                      class="rounded-2xl"
                      loading="lazy" format="webp" provider="cloudinary" :src="`${mediaFiles?.providerPublicId}.${mediaFiles?.format}`"
                      width="100%" height="100%" :alt="name"
                    />
                    <svg v-else class="mx-auto h-20rem w-20rem text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                    <label for="selectImage" class="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input id="selectImage" type="file" accept="image/*" class="hidden" @change="handleImageSelected">
                    </label>
                    <p class="pl-1">
                      or drag and drop
                    </p>
                  </div>
                  <p class="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 3MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" class="text-sm font-semibold leading-6 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed" :disabled="loading" @click="router.back()">
          Cancel
        </button>
        <div>
          <BaseButton type="submit" :loading="loading">
            Save
          </BaseButton>
        </div>
      </div>
    </form>
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

<style scoped></style>
