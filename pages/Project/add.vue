<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
})
useHead({
  title: 'Add Project',
})
const { toasts, showToast, removeToast, addToast, ToastType } = useToast()
const { imageFile, imageUrl, errors, handleImageSelected } = useImageUpload()
const loading = ref(false)
const router = useRouter()

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
const project = reactive(defaultProjectData)

const addProject = async () => {
  loading.value = true
  try {
    const { name, description_id, description_en, description_ja, description_ko, dateStart, dateEnd, technologyIDs } = project
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
      addToast(ToastType.Success, 'Project Saved')
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
</script>

<template>
  <div>
    <div class="flex justify-between mb-8">
      <div>
        <BaseButton type="button" @click="router.back()">
          go back
        </BaseButton>
      </div>
    </div>
    <form @submit.prevent="addProject()">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Project
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="project-name" class="block text-sm font-medium leading-6 text-gray-900">Project Name</label>
              <div class="mt-2">
                <BaseInput id="project-name" v-model="project.name" type="text" placeholder="Project Name" required />
              </div>
            </div>

            <div class="sm:col-span-full">
              <label for="project-description-id" class="block text-sm font-medium leading-6 text-gray-900">Project Description (ID) <Icon name="openmoji:flag-indonesia" /> </label>
              <div class="mt-2">
                <BaseInput id="project-description-id" v-model="project.description_id" type="textarea" placeholder="Project Description (ID)" required />
                <p class="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>
            </div>
            <div class="sm:col-span-full">
              <label for="project-description-id" class="block text-sm font-medium leading-6 text-gray-900">Project Description (EN) <Icon name="flagpack:gb-ukm" /> </label>
              <div class="mt-2">
                <BaseInput id="project-description-id" v-model="project.description_en" type="textarea" placeholder="Project Description (EN)" required />
                <p class="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>
            </div>
            <div class="sm:col-span-full">
              <label for="project-description-id" class="block text-sm font-medium leading-6 text-gray-900">Project Description (JA) <Icon name="twemoji:flag-japan" /> </label>
              <div class="mt-2">
                <BaseInput id="project-description-id" v-model="project.description_ja" type="textarea" placeholder="Project Description (JA)" required />
                <p class="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>
            </div>
            <div class="sm:col-span-full">
              <label for="project-description-id" class="block text-sm font-medium leading-6 text-gray-900">Project Description (KO) <Icon name="twemoji:flag-south-korea" /> </label>
              <div class="mt-2">
                <BaseInput id="project-description-id" v-model="project.description_ko" type="textarea" placeholder="Project Description (KO)" required />
                <p class="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
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
                      @click="imageUrl = ''"
                    >
                      <Icon name="material-symbols:close-rounded" />
                    </button>
                  </div>
                  <svg v-else class="mx-auto h-24rem w-24rem text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                  </svg>
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
        <button type="button" class="text-sm font-semibold leading-6 text-gray-900" @click="router.back()">
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
