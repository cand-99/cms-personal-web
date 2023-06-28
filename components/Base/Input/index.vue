<script lang="ts" setup>
interface IProps {
  modelValue: string
  type?: 'text' | 'email' | 'textarea' | 'password'
  placeholder: string
  required?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  type: 'text',
  required: false,
})

const emit = defineEmits(['update:modelValue'])
const modelValue = useSyncProps<string>(props, 'modelValue', emit)
</script>

<template>
  <textarea v-if="type === 'textarea'" v-model="modelValue" :type="type" :placeholder="placeholder" :required="required" rows="3" class="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" :aria-label="placeholder" />
  <input v-else v-model="modelValue" :type="type" :placeholder="placeholder" :required="required" class="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" :aria-label="placeholder">
</template>

<style scoped></style>
