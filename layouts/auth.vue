<script lang="ts" setup>
</script>

<template>
  <div class="m-0 font-sans antialiased font-normal bg-white text-start text-base leading-default text-slate-500">
    <div class="m-0 font-sans antialiased font-normal bg-white text-start text-base leading-default text-slate-500 min-h-screen flex flex-col">
      <main class="mt-0 transition-all duration-200 ease-soft-in-out">
        <section class="mb-32">
          <div class="relative flex items-start pt-12 pb-56 m-4 overflow-hidden bg-center bg-cover min-h-[50vh] rounded-xl" style="background-image: url('/img/curved-images/curved14.jpg')">
            <span class="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-gray-900 to-slate-800 opacity-60" />
            <div class="container z-10 mx-auto">
              <div class="flex flex-wrap justify-center -mx-3">
                <div class="w-full max-w-full px-3 mx-auto mt-0 text-center lg:flex-0 shrink-0 lg:max-w-lg px-xl">
                  <h1 class="mt-12 mb-2 text-white text-5xl font-semibold">
                    Welcome!
                  </h1>
                  <p class="text-white w-full">
                    Use these awesome forms to login or create new account in your project for free.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <slot />
        </section>
      </main>
      <Footer class="mt-auto" />
    </div>
  </div>
</template>

<style scoped></style>
