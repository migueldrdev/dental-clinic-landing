export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const rawBackend = config.backendApiUrl || process.env.BACKEND_API_URL || ''
  const backendUrl =
    rawBackend && !rawBackend.includes('tu-api.com')
      ? rawBackend
      : 'http://20.171.52.21:8080/api'

  try {
    const response: any = await $fetch(`${backendUrl}/catalogos/tratamientos`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      timeout: 6000,
    })
    return response
  } catch (error: any) {
    console.warn('[Proxy catalogos/tratamientos] Servidor backend no disponible, usando fallback:', error.message)
    return {
      success: false,
      data: [],
      error: error.message,
    }
  }
})
