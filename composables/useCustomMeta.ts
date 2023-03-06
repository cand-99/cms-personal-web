export const useCustomMeta = () => {
  const defaultDesc
    = 'app description'
  const defaultImage = 'url ogImage'

  const setMeta = (title: string, desc = defaultDesc, image = defaultImage) => {
    useHead({
      titleTemplate: (title?: string) => `${title} - Personal web`,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: desc },
        { name: 'og:site_name', content: 'Personal web' },
        { name: 'og:type', content: 'website' },
        { name: 'og:url', content: 'url app' },
        { name: 'og:image', content: image },

        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@cand_99' },
        { name: 'twitter:creator', content: '@cand_00' },
        { name: 'twitter:title', content: 'Personal web' },
        { name: 'twitter:description', content: desc },
        { name: 'twitter:image', content: image },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.ico' }],
    })
  }

  return {
    setMeta,
  }
}
