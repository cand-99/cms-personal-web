<script lang="ts" setup>
const props = defineProps<IProps>()
const emit = defineEmits(['close'])
onMounted(() => {
  setTimeout(() => {
    emit('close')
  }, 5000)
})

interface IProps {
  type: string
}
</script>

<template>
  <div class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow ml-a">
    <div v-if="props.type === 'warning'" class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg ">
      <Icon name="typcn:warning" />
    </div>
    <div v-else-if="props.type === 'info'" class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg ">
      <Icon name="bi:info-circle-fill" />
    </div>
    <div v-else-if="props.type === 'success'" class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg ">
      <Icon name="material-symbols:check-circle-rounded" />
    </div>
    <div v-else-if="props.type === 'error'" class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg ">
      <Icon name="fluent-mdl2:status-error-full" />
    </div>
    <div class="ml-3 text-sm font-normal">
      <slot />
    </div>
    <button type="button" class="ml-auto bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8" aria-label="Close" @click="emit('close')">
      <Icon name="material-symbols:close" class="m-auto" />
    </button>
  </div>
</template>

<style scoped></style>
