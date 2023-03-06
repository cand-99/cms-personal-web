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
  <nav ref="navbar" class="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start xl:sticky mt-2">
    <div class="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
      <nav>
        <!-- breadcrumb -->
        <ol class="hidden md:flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
          <li class="leading-normal text-sm">
            <a class="opacity-50 text-slate-700">Pages</a>
          </li>
          <li class="text-xs flex items-center ml-2">
            /
          </li>
          <li class="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']" aria-current="page">
            {{ route.name }}
          </li>
        </ol>
        <h6 class="mb-0 font-bold capitalize">
          {{ route.name }}
        </h6>
      </nav>

      <div class="flex items-center justify-end grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
        <ul class="flex flex-row items-center justify-end pl-0 mb-0 list-none md:max-w-full space-x-4">
          <li>
            <Icon name="ic:sharp-notifications" />
          </li>
          <li>
            <Icon name="fa6-solid:gear" />
          </li>
          <li class="items-center hidden md:flex">
            <button type="button" class="block px-0 py-2 font-semibold transition-all text-sm text-slate-500" @click="handleLogout()">
              Logout
            </button>
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
  z-index: 980;
}
</style>
