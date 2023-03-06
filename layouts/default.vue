<script lang="ts" setup></script>

<template>
  <Sidenav />
  <main class="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
    <Navbar />
    <div class="w-full px-6 py-6 mx-auto">
      <slot />
    </div>
    <Footer />
  </main>
</template>

<style scoped>
.ease-soft-in-out {
  transition-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
}
</style>
