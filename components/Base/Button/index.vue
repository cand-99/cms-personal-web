<script lang="ts" setup>
interface IProps {
  type?: 'submit' | 'button' | 'reset'
  loading?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'button',
})

// const props = defineProps<IProps>()
</script>

<template>
  <button
    :type="props.type"
    class="inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white" :class="props.loading ? 'cursor-not-allowed' : 'hover:scale-102'" :disabled="props.loading"
  >
    <Icon v-if="props.loading" name="eos-icons:bubble-loading" />
    <slot v-else />
  </button>
</template>

<style scoped></style>
