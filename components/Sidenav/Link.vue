<script lang="ts" setup>
interface IProps {
  to: string
  icons: string
  isActive: boolean
}

const props = defineProps<IProps>()
</script>

<template>
  <li class="mt-0.5 w-full">
    <NuxtLink :to="props.to" class="py-2.7 text-sm my-0 mx-4 flex items-center whitespace-nowrap px-4" :class="props.isActive ? 'rounded-lg bg-white font-semibold text-slate-700' : ''">
      <div class="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5" :class="props.isActive ? 'bg-gradient-to-tl gradient-brand' : ''">
        <Icon :name="props.icons" :class="props.isActive ? 'text-white' : 'text-black'" />
      </div>
      <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
        <slot />
      </span>
    </NuxtLink>
  </li>
</template>

<style scoped></style>
