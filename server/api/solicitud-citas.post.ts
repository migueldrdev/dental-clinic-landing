export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const rawBackend = config.backendApiUrl || process.env.BACKEND_API_URL || ''
  const backendUrl =
    rawBackend && !rawBackend.includes('tu-api.com')
      ? rawBackend
      : 'http://20.171.52.21:8080/api'

  try {
    const response = await $fetch(`${backendUrl}/solicitud-citas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body,
    })
    return response
  } catch (error: any) {
    const status = error.statusCode || error.status || error.response?.status || 500
    const responseData = error.data || error.response?._data || {}
    const message =
      responseData.message ||
      error.message ||
      'Ocurrió un error al procesar tu solicitud con el servidor clínico.'

    throw createError({
      statusCode: status,
      statusMessage: message,
      data: responseData,
    })
  }
})
