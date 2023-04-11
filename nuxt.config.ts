// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  modules: [
    '@kevinmarrec/nuxt-pwa',
    '@nuxt/image-edge',
    'nuxt-icon',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    'nuxt-headlessui',
  ],

  // pwa config
  pwa: {
    meta: {
      mobileAppIOS: true,
      name: 'CMS Personal Web',
      ogDescription: 'CMS Personal Web',
    },
    workbox: {
      enabled: true,
    },
    manifest: {
      name: 'CMS Personal Web',
      lang: 'en',
    },
  },

  headlessui: {
    prefix: '',
  },

  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
  },

  // nuxt-mage config
  image: {
    // Options
  },

  // unocss config
  unocss: {
    preflight: true,
  },

})
