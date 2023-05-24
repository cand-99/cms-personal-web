<script lang="ts" setup>
interface IProps {
  type?: 'submit' | 'button' | 'reset'
  loading?: boolean
  to?: string
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'button',
})
</script>

<template>
  <button
    v-if="!props.to"
    :type="props.type"
    class="inline-block w-full px-6 py-3 mb-2 font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer active:opacity-85 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gray-900 " :class="props.loading ? 'cursor-not-allowed' : 'hover:scale-102'" :disabled="props.loading"
  >
    <Icon v-if="props.loading" size="16px" name="eos-icons:bubble-loading" />
    <slot v-else />
  </button>

  <NuxtLink
    v-else
    :to="props.to"
    class="inline-block w-full px-6 py-3 mb-2 font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer active:opacity-85 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gray-900 " :class="props.loading ? 'cursor-not-allowed' : 'hover:scale-102'" :disabled="props.loading"
  >
    <slot />
  </NuxtLink>
</template>

<style scoped></style>
