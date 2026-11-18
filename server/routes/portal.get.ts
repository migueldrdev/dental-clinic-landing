import { defineEventHandler, setResponseHeader } from 'h3'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const targetUrl = `${config.public.adminAppUrl || 'http://20.171.52.21'}/login`

  // Establecer cabeceras para máxima compatibilidad y privacidad
  setResponseHeader(event, 'Content-Type', 'text/html; charset=utf-8')
  setResponseHeader(event, 'Referrer-Policy', 'no-referrer')
  setResponseHeader(event, 'Cache-Control', 'no-cache, no-store, must-revalidate')

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Accediendo a ODONTEC | Portal Médico</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta http-equiv="refresh" content="0; url=${targetUrl}">
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: #020b18;
      color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 1.5rem;
    }
    .card {
      background: #0b1e36;
      border: 1px solid #1e3a5f;
      border-radius: 1.25rem;
      padding: 2.5rem 2rem;
      max-width: 460px;
      width: 100%;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
    .logo {
      height: 42px;
      width: auto;
      margin-bottom: 1.5rem;
      object-contain: contain;
    }
    .spinner {
      width: 44px;
      height: 44px;
      border: 4px solid #1e3a5f;
      border-top-color: #38bdf8;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 1.5rem auto;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .badge {
      display: inline-block;
      background: rgba(14, 165, 233, 0.15);
      border: 1px solid rgba(14, 165, 233, 0.4);
      color: #38bdf8;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1rem;
    }
    h2 {
      font-size: 1.35rem;
      margin: 0 0 0.5rem 0;
      font-weight: 800;
    }
    p {
      color: #94a3b8;
      font-size: 0.875rem;
      line-height: 1.5;
      margin: 0;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background: linear-gradient(135deg, #0284c7, #0369a1);
      color: white;
      text-decoration: none;
      font-weight: 700;
      padding: 0.85rem 1.75rem;
      border-radius: 0.75rem;
      font-size: 0.95rem;
      margin-top: 1.75rem;
      box-shadow: 0 10px 15px -3px rgba(2, 132, 199, 0.3);
      transition: all 0.2s;
    }
    .btn:hover {
      background: linear-gradient(135deg, #0369a1, #075985);
      transform: translateY(-1px);
    }
    .hint {
      margin-top: 1.25rem;
      font-size: 0.75rem;
      color: #64748b;
    }
  </style>
  <script>
    // Redirección inmediata por script
    try {
      window.location.replace("${targetUrl}");
    } catch (e) {
      window.location.href = "${targetUrl}";
    }
  </script>
</head>
<body>
  <div class="card">
    <div class="badge">Portal Médico Odontológico</div>
    <br>
    <img src="/images/brand/logo-odontec-white.png" alt="ODONTEC" class="logo">
    <h2>Conectando al Sistema</h2>
    <p>Redirigiendo de forma segura al entorno en la nube de Azure...</p>
    <div class="spinner"></div>
    <a href="${targetUrl}" class="btn">Continuar al Portal Clínico &rarr;</a>
    <div class="hint">Servidor Azure VM: <code>${targetUrl}</code></div>
  </div>
</body>
</html>`
})
