<script lang="ts" setup>
import type { IProject } from '~~/types/IProject'

definePageMeta({
  middleware: 'auth',
})
useHead({
  title: 'Project',
})

const { data: projects, refresh } = await useFetch<IProject[]>('/api/project', {
  query: { lang: 'id' },
})
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
      <div v-for="(project, index) in projects" :key="index" class="md:flex gap-6">
        <figure class="overflow-hidden rounded-2xl md:w-1/2">
          <NuxtImg
            loading="lazy" format="webp" :src="project.mediaFiles?.url"
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
          <h1 class="font-bold mt-3 text-lg">
            Technology
          </h1>
          <div class="flex gap-3 py-1">
            <Icon v-for="technology in project.technology" :key="technology.id" class="text-3xl" :name="technology.icon" />
          </div>
          <div class="mt-auto flex justify-between pt-3 md:pt-0">
            <div>
              <BaseButton type="button" class="block" icon="iconamoon:link-external">
                Kunjungi
              </BaseButton>
            </div>
            <div class="flex gap-3">
              <BaseButton type="button" color="bg-blue-500" class="block" icon="ic:twotone-edit">
                Edit
              </BaseButton>
              <BaseButton type="button" color="bg-red-500" class="block" icon="solar:trash-bin-trash-bold">
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
  </div>
</template>

<style scoped></style>
