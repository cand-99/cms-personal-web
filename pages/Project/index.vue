<script lang="ts" setup>
import type { IProject } from '~~/types/IProject'

definePageMeta({
  middleware: 'auth',
})
useHead({
  title: 'Project',
})

const { toasts, showToast, removeToast, addToast, ToastType } = useToast()
const { data: projects, refresh } = await useFetch<IProject[]>('/api/project', {
  query: { lang: 'id' },
})

const loading = ref(false)
const loadingDelete = ref('')

const deleteProject = async (projectId: string | undefined) => {
  loading.value = true
  if (!projectId)
    return
  loadingDelete.value = projectId
  try {
    const { data, error } = await useFetch('/api/project', {
      method: 'DELETE',
      query: {
        id: projectId,
      },
    })
    if (data.value) {
      refresh()
      addToast(ToastType.Error, 'Project Deleted')
    }

    else { throw error }
  }
  catch (error: any) {
    console.error(error)
    addToast(ToastType.Error, error.value.statusMessage)
  }
  finally {
    loading.value = false
    loadingDelete.value = ''
  }
}
</script>

<template>
  <div>
    <div class="flex justify-between pb-4">
      <div>
        <BaseButton to="/project/add" class="block">
          Add Project
        </BaseButton>
      </div>
    </div>

    <!-- Card Project -->
    <div class="grid grid-cols-1 gap-14">
      <div v-for="project in projects" :key="project.id" class="md:flex gap-6">
        <figure class="overflow-hidden md:w-1/2">
          <NuxtImg
            class="rounded-2xl"
            loading="lazy" format="webp" provider="cloudinary" :src="`${project.mediaFiles?.providerPublicId}.${project.mediaFiles?.format}`"
            width="100%" height="100%" :alt="project.name"
          />
        </figure>
        <div class="md:w-1/2 mt-3 md:mt-0 flex flex-col">
          <h1 class="text-lg md:text-3xl font-bold">
            {{ project.name }}
          </h1>
          <p class="mt-3">
            {{ project.description }}
          </p>
          <div class="flex justify-between mt-3">
            <div>
              <h1 class="font-bold text-lg">
                Technology
              </h1>
              <div class="flex gap-3 py-1">
                <Icon v-for="technology in project.technology" :key="technology.id" class="text-3xl" :name="technology.icon" />
              </div>
            </div>
            <div>
              <time class="text-sm">{{ project.dateStart }} - {{ project.dateEnd }}</time>
            </div>
          </div>

          <div class="mt-auto flex justify-between pt-3 md:pt-0">
            <div>
              <BaseButton type="button" class="block" icon="iconamoon:link-external">
                Kunjungi
              </BaseButton>
            </div>
            <div class="flex gap-3">
              <BaseButton :disabled="loading && (loadingDelete === project.id)" type="button" color="bg-blue-600" class="block" icon="ic:twotone-edit">
                Edit
              </BaseButton>
              <BaseButton :loading="loading && (loadingDelete === project.id)" type="button" color="bg-red-600" class="block" icon="solar:trash-bin-trash-bold" @click="deleteProject(project.id)">
                Delete
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <pre>
      {{ projects }}
    </pre>

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
