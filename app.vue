<script setup lang="ts">
const { setMeta } = useCustomMeta()
setMeta('App Title')
</script>

<template>
  <Body class="m-0 font-sans antialiased font-normal text-base bg-gray-50 text-slate-500">
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
