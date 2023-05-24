<script lang="ts" setup>
interface IProps {
  type?: 'submit' | 'button' | 'reset'
  loading?: boolean
  to?: string
  color?: string
  icon?: string
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'button',
  color: 'bg-gray-900',
})
</script>

<template>
  <button
    v-if="!props.to"
    :type="props.type"
    class="inline-flex items-center w-full px-6 py-3 mb-2 font-bold text-center text-white align-middle transition-all border-0 rounded-lg cursor-pointer active:opacity-85 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25" :class="props.loading ? 'cursor-not-allowed' : `hover:scale-102 ${props.color}`" :disabled="props.loading"
  >
    <Icon v-if="props.loading" size="16px" name="eos-icons:bubble-loading" />
    <slot v-else />
    <Icon v-if="props.icon" :name="props.icon" class="ml-1 text-base" />
  </button>

  <NuxtLink
    v-else
    :to="props.to"
    class="inline-flex items-center w-full px-6 py-3 mb-2 font-bold text-center text-white align-middle transition-all border-0 rounded-lg cursor-pointer active:opacity-85 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25" :class="props.loading ? 'cursor-not-allowed' : `hover:scale-102 ${props.color}`" :disabled="props.loading"
  >
    <slot />
    <Icon v-if="props.icon" :name="props.icon" class="ml-1 text-base" />
  </NuxtLink>
</template>

<style scoped></style>
