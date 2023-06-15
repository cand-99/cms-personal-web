<script lang="ts" setup>
import type { IUser } from '~/types/IUser'

definePageMeta({
  alias: '/dashboard',
  name: 'Dashboard',
  middleware: 'auth',
})
useHead({
  title: 'Dashboard',
})

const user = useState<IUser>('user')
</script>

<template>
  <div>
    <!-- row 1 -->
    <div class="flex flex-wrap -mx-3">
      <!-- card1 -->
      <div class="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
        <div class="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
          <div class="flex-auto p-4">
            <div class="flex flex-row -mx-3">
              <div class="flex-none w-2/3 max-w-full px-3">
                <div>
                  <p class="mb-0 font-sans font-semibold leading-normal text-sm">
                    Today's Money
                  </p>
                  <h5 class="mb-0 font-bold">
                    {{ user.name }}
                  </h5>
                </div>
              </div>
              <div class="px-3 text-right basis-1/3">
                <div class="inline-flex items-center justify-center w-12 h-12 text-center rounded-lg bg-gradient-to-tl gradient-brand">
                  <Icon name="game-icons:take-my-money" class="text-2xl text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- card2 -->
      <div class="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
        <div class="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
          <div class="flex-auto p-4">
            <div class="flex flex-row -mx-3">
              <div class="flex-none w-2/3 max-w-full px-3">
                <div>
                  <p class="mb-0 font-sans font-semibold leading-normal text-sm">
                    Today's Visitor
                  </p>
                  <h5 class="mb-0 font-bold">
                    2,300
                    <span class="leading-normal text-sm font-weight-bolder text-lime-500">+3%</span>
                  </h5>
                </div>
              </div>
              <div class="px-3 text-right basis-1/3">
                <div class="inline-flex items-center justify-center w-12 h-12 text-center rounded-lg bg-gradient-to-tl gradient-brand">
                  <Icon name="game-icons:take-my-money" class="text-2xl text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- card3 -->
      <div class="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
        <div class="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
          <div class="flex-auto p-4">
            <div class="flex flex-row -mx-3">
              <div class="flex-none w-2/3 max-w-full px-3">
                <div>
                  <p class="mb-0 font-sans font-semibold leading-normal text-sm">
                    Total Project
                  </p>
                  <h5 class="mb-0 font-bold">
                    +3,462
                    <span class="leading-normal text-red-600 text-sm font-weight-bolder">-2%</span>
                  </h5>
                </div>
              </div>
              <div class="px-3 text-right basis-1/3">
                <div class="inline-flex items-center justify-center w-12 h-12 text-center rounded-lg bg-gradient-to-tl gradient-brand">
                  <Icon name="game-icons:take-my-money" class="text-2xl text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- card4 -->
      <div class="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:w-1/4">
        <div class="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
          <div class="flex-auto p-4">
            <div class="flex flex-row -mx-3">
              <div class="flex-none w-2/3 max-w-full px-3">
                <div>
                  <p class="mb-0 font-sans font-semibold leading-normal text-sm">
                    Total Blog
                  </p>
                  <h5 class="mb-0 font-bold">
                    $103,430
                    <span class="leading-normal text-sm font-weight-bolder text-lime-500">+5%</span>
                  </h5>
                </div>
              </div>
              <div class="px-3 text-right basis-1/3">
                <div class="inline-flex items-center justify-center w-12 h-12 text-center rounded-lg bg-gradient-to-tl gradient-brand">
                  <Icon name="game-icons:take-my-money" class="text-2xl text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
