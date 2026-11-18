// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  experimental: {
    appManifest: false,
  },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  app: {
    head: {
      title: 'ODONTEC | Sistema Odontológico',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'ODONTEC - Sistema Integral de Gestión Odontológica y Atención Clínica de Alta Precisión. Reserva tu cita online.' },
        { name: 'theme-color', content: '#024b7b' },
        { property: 'og:site_name', content: 'ODONTEC' },
        { property: 'og:title', content: 'ODONTEC | Sistema Odontológico' },
        { property: 'og:description', content: 'Atención odontológica integral, tecnología 3D y gestión clínica especializada.' },
        { property: 'og:image', content: '/og-image.svg' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: '/og-image.svg' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'alternate icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap' },
      ],
    },
  },
  runtimeConfig: {
    backendApiUrl:
      process.env.BACKEND_API_URL && !process.env.BACKEND_API_URL.includes('tu-api.com')
        ? process.env.BACKEND_API_URL
        : 'http://20.171.52.21:8080/api',
    public: {
      apiBaseUrl: '/api',
      adminAppUrl:
        process.env.NUXT_PUBLIC_ADMIN_APP_URL && !process.env.NUXT_PUBLIC_ADMIN_APP_URL.includes('tu-app-admin')
          ? process.env.NUXT_PUBLIC_ADMIN_APP_URL
          : 'http://20.171.52.21',
    },
  },
  nitro: {
    compressPublicAssets: true,
  },
})
