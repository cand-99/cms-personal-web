<script lang="ts" setup>
const navbar = ref(null)
onMounted(() => {
  if (!navbar.value)
    return

  // scroll
  const { onScroll } = useSticky(navbar.value, 0)
  setTimeout(() => onScroll(), 50)
})

const route = useRoute()
const sideNav = useState('sideNav')

const handleLogout = async () => {
  await userLogout()
}
</script>

<template>
  <nav ref="navbar" class="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start xl:sticky mt-2 z-3">
    <div class="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
      <nav>
        <!-- breadcrumb -->
        <ol class="hidden md:flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
          <li class="leading-normal text-sm">
            <p class="text-slate-500">
              Pages
            </p>
          </li>
          <li class="text-xs flex items-center ml-2">
            /
          </li>
          <li class="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']" aria-current="page">
            {{ route.name }}
          </li>
        </ol>
        <h1 class="mb-0 font-bold capitalize">
          {{ route.name }}
        </h1>
      </nav>

      <div class="flex items-center justify-end grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
        <ul class="flex flex-row items-center justify-end pl-0 mb-0 list-none md:max-w-full space-x-4">
          <li>
            <Icon name="ic:sharp-notifications" />
          </li>
          <li>
            <ClientOnly>
              <Menu as="div" class="relative inline-block text-left">
                <div>
                  <MenuButton aria-label="setting">
                    <Icon name="ic:baseline-settings" />
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <MenuItems
                    class="absolute right-0 mt-2 w-42 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div class="px-1 py-1">
                      <MenuItem v-slot="{ active }">
                        <button
                          class="group flex w-full items-center rounded-md px-2 py-2 text-sm transition-all" :class="[
                            active ? 'bg-light-primary text-white' : 'text-slate-700',
                          ]"
                          @click="handleLogout()"
                        >
                          <Icon
                            name="solar:logout-3-bold" size="20px" class="mr-2"
                          />
                          Logout
                        </button>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
            </ClientOnly>
          </li>
          <li class="flex items-center xl:hidden">
            <button type="button" class="block p-1 transition-all text-2xl text-slate-500" @click="sideNav = !sideNav">
              <Icon name="heroicons-solid:menu" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.ease-soft-in {
  transition-timing-function: cubic-bezier(0.42, 0, 1, 1);
}

.navbar-scrolled {
  top: 1%;
  background: hsla(0,0%,100%,0.8);
  --tw-shadow: inset 0 0 1px 1px hsla(0,0%,100%,.9),0 20px 27px 0 rgba(0,0,0,.05);
  --tw-shadow-colored: inset 0 0 1px 1px var(--tw-shadow-color), 0 20px 27px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  backdrop-filter: blur(30px);
}
</style>
