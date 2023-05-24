<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
const target = ref(null)
const route = useRoute()

const sideNav = useState('sideNav', () => false)

onClickOutside(target, (event) => {
  sideNav.value = false
})
</script>

<template>
  <aside
    ref="target"
    class="max-w-62.5 ease-nav-brand z-9 fixed inset-y-0 my-4 ml-4 block w-full -translate-x-full flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 antialiased shadow-xl transition-transform duration-200 xl:left-0 xl:translate-x-0"
    :class="sideNav ? 'translate-x-0' : ''"
  >
    <div class="h-19.5">
      <div class="absolute top-1 right-1 p-2 xl:hidden cursor-pointer" @click="sideNav = !sideNav">
        <Icon name="ic:baseline-close" class="text-slate-500" />
      </div>
      <NuxtLink to="/" class="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700">
        <Icon name="logos:nuxt-icon" />
        <span class="ml-1 font-semibold transition-all duration-200">Personal Web</span>
      </NuxtLink>
    </div>

    <hr class="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent mb-xl">

    <div class="items-center block w-auto max-h-screen overflow-auto grow h-sidenav basis-full">
      <ul class="flex flex-col pl-0 mb-0 pb-14">
        <li class="w-full mt-4 mb-md">
          <h6 class="pl-6 ml-2 font-bold leading-tight uppercase text-xs text-slate-600">
            Account pages
          </h6>
        </li>
        <SidenavLink
          to="/" icons="material-symbols:add-home" :is-active="route.name === 'Dashboard' "
        >
          Dashboard
        </SidenavLink>
        <SidenavLink to="/technology" icons="material-symbols:add-home" :is-active="route.name === 'Technology'">
          Technology
        </SidenavLink>
        <SidenavLink to="/project" icons="material-symbols:add-home" :is-active="(route.name as string).includes('Project')">
          Project
        </SidenavLink>
      </ul>
    </div>

    <div class="mx-4 h-[220px] flex flex-col justify-end">
      <!-- pro btn  -->
      <BaseButton type="button">
        User
      </BaseButton>
    </div>
  </aside>
</template>

<style scoped>
.h-sidenav {
    height: calc(100vh - 370px);
}
</style>
