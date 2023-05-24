<script lang="ts" setup>
import type { IProject } from '~~/types/IProject'

definePageMeta({
  middleware: 'auth',
})
useHead({
  title: 'Project',
})

const { data: project, refresh } = await useFetch<IProject[]>('/api/project', {
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

    <pre>
      {{ project }}
    </pre>
  </div>
</template>

<style scoped>

</style>
