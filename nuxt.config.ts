// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  app: {
    head: {
      title: 'Clínica Dental | Especialistas en Odontología Digital 3D',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Atención odontológica integral, ortodoncia invisible 3D, implantes dentales guiados y diseño de sonrisa sin dolor. Reserva tu cita online.' },
        { name: 'theme-color', content: '#0f172a' },
        { property: 'og:site_name', content: 'Clínica Dental' },
        { property: 'og:title', content: 'Clínica Dental | Especialistas en Odontología Digital 3D' },
        { property: 'og:description', content: 'Diagnósticos computarizados en alta definición, especialistas colegiados COP y tratamientos garantizados.' },
        { property: 'og:image', content: '/og-image.svg' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: '/og-image.svg' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'alternate icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap' },
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api',
      adminAppUrl: process.env.NUXT_PUBLIC_ADMIN_APP_URL || 'http://localhost:5173',
    },
  },
  nitro: {
    compressPublicAssets: true,
  },
})
