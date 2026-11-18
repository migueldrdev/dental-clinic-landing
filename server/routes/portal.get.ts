import { defineEventHandler, sendRedirect, setResponseHeader } from 'h3'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const rawAdminUrl = config.public?.adminAppUrl || ''
  const targetUrl =
    rawAdminUrl && !rawAdminUrl.includes('tu-app-admin')
      ? `${rawAdminUrl}/login`
      : 'http://20.171.52.21/login'

  setResponseHeader(event, 'Referrer-Policy', 'no-referrer')
  setResponseHeader(event, 'Cache-Control', 'no-cache, no-store, must-revalidate')

  return sendRedirect(event, targetUrl, 302)
})
