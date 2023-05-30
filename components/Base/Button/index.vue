<script lang="ts" setup>
interface IProps {
  type?: 'submit' | 'button' | 'reset'
  loading?: boolean
  to?: string
  color?: string
  icon?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'button',
  color: 'bg-gray-900',
  disabled: false,
})
</script>

<template>
  <button
    v-if="!props.to"
    :type="props.type"
    class="inline-flex justify-center w-full px-6 py-3 mb-2 font-bold text-center text-white align-middle transition-all border-0 rounded-lg cursor-pointer active:opacity-85 text-sm ease-in shadow disabled:cursor-not-allowed hover:scale-102 disabled:hover:scale-100" :class="`${props.color}`" :disabled="props.loading || props.disabled "
  >
    <Icon v-if="props.loading" size="16px" name="eos-icons:bubble-loading" />
    <slot v-else />
    <Icon v-if="props.icon" :name="props.icon" class="ml-1 text-base" />
  </button>

  <NuxtLink
    v-else
    :to="props.to"
    class="inline-flex justify-center w-full px-6 py-3 mb-2 font-bold text-center text-white align-middle transition-all border-0 rounded-lg cursor-pointer active:opacity-85 text-sm ease-in shadow disabled:cursor-not-allowed hover:scale-102 disabled:hover:scale-100" :class="`${props.color}`" :disabled="props.loading || props.disabled"
  >
    <slot />
    <Icon v-if="props.icon" :name="props.icon" class="ml-1 text-base" />
  </NuxtLink>
</template>

<style scoped></style>
