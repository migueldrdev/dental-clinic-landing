# 🦷 Dental Clinic Landing Page — Nuxt 3 & Tailwind CSS

<div align="center">

![Nuxt 3](https://img.shields.io/badge/Nuxt_3-3.15+-00DC82?style=for-the-badge&logo=nuxtdotjs&logoColor=white)
![Vue 3](https://img.shields.io/badge/Vue_3-3.5+-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-11+-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![SEO](https://img.shields.io/badge/SEO-Schema.org_JSON--LD-FF6B6B?style=for-the-badge&logo=google&logoColor=white)

**Landing page pública de alto rendimiento, optimizada para conversión de pacientes, reservas médicas en tiempo real y posicionamiento SEO orgánico.**

[Características](#-características-principales) • [Tecnologías](#-stack-tecnológico) • [Estructura](#-estructura-del-proyecto) • [Instalación](#-instalación-y-uso) • [Despliegue](#-guía-de-despliegue-a-producción) • [Catálogo de Imágenes](#-catálogo-de-imágenes)

</div>

---

## 🌟 Descripción del Proyecto

**Dental Clinic Landing** es una aplicación frontend desarrollada en **Nuxt 3** con Server-Side Rendering (SSR) y Static Site Generation (SSG), diseñada específicamente para clínicas dentales, centros odontológicos y policlínicos estomatológicos modernos.

Forma parte del ecosistema desacoplado de la clínica:
1. **`dental-clinic-landing`** (Este repositorio): Frontend público, SSR, SEO estomatológico y captación de pacientes.
2. **`dental-clinic-vue`**: Portal Administrativo y Clínico (Vite SPA + Pinia + shadcn-vue).
3. **`dental-clinic-laravel`**: Backend API RESTful (Laravel 12 + PostgreSQL + Sanctum).

---

## ✨ Características Principales

* 🌓 **Modo Oscuro Integrado:** Selector fluido Claro / Oscuro con persistencia en `localStorage` y detección automática de preferencia de sistema (`prefers-color-scheme`).
* ⚡ **Cero CLS (Cumulative Layout Shift):** Componente `ImageSkeleton` con dimensiones explícitas, shimmer progresivo y fallback gráfico vectorial offline.
* 📅 **Formulario de Citas Inteligente:**
  * Flujo intuitivo en 3 etapas.
  * Selector reactivo de especialidades sincronizado con el catálogo de tratamientos.
  * Animación de carga médica personalizada (`ToothLoader`).
  * Modal de confirmación tras registrar la solicitud en la API.
* 🔍 **SEO Integral y Datos Estructurados:**
  * Metadatos OpenGraph y Twitter Cards para previews en redes sociales y WhatsApp.
  * Marcado **Schema.org JSON-LD** de tipo `Dentist` con horarios, sedes y teléfonos para Google Local Pack.
  * `sitemap.xml` y `robots.txt` autogenerados y optimizados.
* 📍 **Módulo de Sedes y Horarios:** Fichas de sedes (San Isidro, Miraflores, Surco) con enlace directo y parametrizado a Google Maps.
* ⭐ **Prueba Social y Casos Clínicos:** Comparativa visual **Antes / Después** con slider táctil y testimonios verificados de pacientes.
* 📱 **Navegación Fluida:** Scroll suave sin parpadeos de URL, menú responsive y botones flotantes interactivos de WhatsApp y Reserva rápida.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Framework** | [Nuxt 3](https://nuxt.com/) | Renderizado SSR híbrido, motor Nitro y optimización de rutas |
| **Librería UI** | [Vue 3](https://vuejs.org/) (Composition API) | Reactividad moderna y componentes desacoplados |
| **Estilos** | [Tailwind CSS v3](https://tailwindcss.com/) | Diseño utilitario, paleta médica y soporte nativo dark mode |
| **Iconos** | [@lucide/vue](https://lucide.dev/) | Iconografía SVG ligera y accesible |
| **Cliente HTTP** | [Axios](https://axios-http.com/) | Conexión con el endpoint `POST /api/solicitud-citas` de Laravel |
| **Gestor de Paquetes**| [pnpm](https://pnpm.io/) | Instalación ultrarrápida y gestión estricta de dependencias |

---

## 📁 Estructura del Proyecto

```text
dental-clinic-landing/
├── assets/
│   └── css/
│       └── main.css              # Capas de Tailwind, animaciones float y scroll suave
├── components/
│   ├── AppointmentForm.vue       # Formulario interactivo con ToothLoader y modal de éxito
│   ├── BranchesSection.vue       # Sedes, horarios de atención y Google Maps
│   ├── FaqSection.vue            # Acordeón de preguntas frecuentes con respuestas médicas
│   ├── FeaturesSection.vue       # Propuesta de valor: Escaneo 3D, sin dolor, especialistas COP
│   ├── FloatingCtas.vue          # Botones flotantes (WhatsApp + Reserva Online)
│   ├── HeroSection.vue           # Banner principal con métricas de confianza (+5k pacientes)
│   ├── ImageSkeleton.vue         # Contenedor de imágenes con carga progresiva y cero CLS
│   ├── LandingFooter.vue         # Pie de página institucional y marco legal MINSA
│   ├── LandingNavbar.vue         # Menú sticky con scroll-tracker, dark mode y acceso a Portal
│   ├── TestimonialsSection.vue   # Slider de casos clínicos Antes/Después con 5 estrellas
│   ├── ToothLoader.vue           # Animación de carga con silueta de muela médica
│   └── TreatmentsSection.vue     # Catálogo con tabs de filtrado y preselección de cita
├── composables/
│   ├── useDarkMode.ts            # Lógica de cambio de tema y sincronización con el DOM
│   └── useSmoothScroll.ts        # Desplazamiento suave entre secciones por ID
├── public/
│   ├── favicon.ico / .svg        # Favicons de la clínica
│   ├── og-image.svg              # Banner para previsualización en WhatsApp / RRSS
│   ├── robots.txt                # Reglas de indexación
│   ├── sitemap.xml               # Mapa del sitio para motores de búsqueda
│   └── images/                   # Activos locales organizados por sección
├── app.vue                       # Layout principal y Schema.org JSON-LD
├── nuxt.config.ts                # Configuración de Nitro, Tailwind y Runtime Variables
└── pnpm-workspace.yaml           # Configuración de ejecución segura de dependencias pnpm
```

---

## 🚀 Instalación y Uso

### Prerrequisitos
* **Node.js**: v18.0.0 o superior (Recomendado v20+)
* **pnpm**: v9.0.0 o superior (`npm install -g pnpm`)

### 1. Clonar el repositorio
```bash
git clone https://github.com/migueldrdev/dental-clinic-landing.git
cd dental-clinic-landing
```

### 2. Configurar variables de entorno
Crea un archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

Configura las URLs de tus servicios:
```env
NUXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
NUXT_PUBLIC_ADMIN_APP_URL=http://localhost:5173
```

### 3. Instalar dependencias
```bash
pnpm install
```

### 4. Iniciar servidor de desarrollo
```bash
pnpm dev
```
La aplicación estará disponible en `http://localhost:3000`.

---

## 📦 Guía de Despliegue a Producción

### Opción 1: Vercel / Netlify (Serverless - Recomendado)
1. Conecta este repositorio en tu cuenta de **Vercel** o **Netlify**.
2. El framework se detectará automáticamente como **Nuxt.js**.
3. En la sección de **Environment Variables**, define:
   * `NUXT_PUBLIC_API_BASE_URL`: `https://api.tu-clinica.com/api`
   * `NUXT_PUBLIC_ADMIN_APP_URL`: `https://admin.tu-clinica.com`
4. ¡El despliegue se ejecutará automáticamente con SSL y CDN global!

### Opción 2: Exportación Estática (SSG) para Hosting Tradicional / cPanel
```bash
pnpm generate
```
Los archivos estáticos generados se ubicarán en `.output/public` listos para subir a cualquier servidor web (Nginx, Apache, S3, Hostinger).

### Opción 3: Servidor Node.js / Docker / VPS
```bash
pnpm build
node .output/server/index.mjs
```

---

## 📸 Catálogo de Imágenes

Para personalizar las fotografías con las de tu clínica real, simplemente reemplaza los archivos en `public/images/` manteniendo la siguiente nomenclatura:

| Sección | Ruta Local | Dimensiones | Formato |
| :--- | :--- | :--- | :--- |
| **Hero Principal** | `public/images/hero/clinic-3d-office.webp` | 800 x 600 px | WebP / JPG |
| **Ortodoncia** | `public/images/treatments/invisible-orthodontics.webp` | 600 x 400 px | WebP / JPG |
| **Diseño Sonrisa** | `public/images/treatments/smile-design-veneers.webp` | 600 x 400 px | WebP / JPG |
| **Implantes** | `public/images/treatments/dental-implants.webp` | 600 x 400 px | WebP / JPG |
| **Endodoncia** | `public/images/treatments/endodontics.webp` | 600 x 400 px | WebP / JPG |
| **Limpieza** | `public/images/treatments/ultrasonic-cleaning.webp` | 600 x 400 px | WebP / JPG |
| **Blanqueamiento** | `public/images/treatments/laser-whitening.webp` | 600 x 400 px | WebP / JPG |
| **Casos (Antes)** | `public/images/testimonials/before-*.webp` | 400 x 300 px | WebP / JPG |
| **Casos (Después)**| `public/images/testimonials/after-*.webp` | 400 x 300 px | WebP / JPG |
| **Avatares** | `public/images/testimonials/avatar-*.webp` | 150 x 150 px | WebP / JPG |

---

## 📄 Licencia

Este proyecto está bajo la Licencia [MIT](LICENSE).

---

<div align="center">
Desarrollado con ❤️ para transformar la experiencia digital odontológica.
</div>
