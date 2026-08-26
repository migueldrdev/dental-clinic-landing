<script setup lang="ts">
import { useSmoothScroll } from '../composables/useSmoothScroll'

const { scrollToSection } = useSmoothScroll()
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 text-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-900">
        <!-- Col 1: Brand -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center text-white shadow-md">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.5 2C5.5 2 3 4.5 3 7.5C3 11 5 14 7 17.5C7.8 19 8.5 21.5 9.5 22C10.5 22.5 11 20.5 11.5 18.5C11.8 17 12.2 17 12.5 18.5C13 20.5 13.5 22.5 14.5 22C15.5 21.5 16.2 19 17 17.5C19 14 21 11 21 7.5C21 4.5 18.5 2 15.5 2C13.8 2 12.6 3 12 3.8C11.4 3 10.2 2 8.5 2Z" />
              </svg>
            </div>
            <div class="text-xl font-extrabold text-white tracking-tight">
              Clínica<span class="text-sky-400">Dental</span>
            </div>
          </div>
          <p class="text-slate-400 leading-relaxed">
            Centro estomatológico de referencia nacional. Odontología digital 3D, calidez profesional y tratamientos certificados.
          </p>
          <p class="text-[11px] text-slate-500">
            Resolución Directoral MINSA N° 4589-2024 / Colegio Odontológico del Perú
          </p>
        </div>

        <!-- Col 2: Tratamientos -->
        <div class="space-y-3">
          <h4 class="font-extrabold text-sm uppercase tracking-wider text-white">
            Tratamientos
          </h4>
          <ul class="space-y-2 text-slate-400">
            <li>
              <button @click="scrollToSection('tratamientos')" class="hover:text-sky-400 transition">
                Ortodoncia Invisible 3D
              </button>
            </li>
            <li>
              <button @click="scrollToSection('tratamientos')" class="hover:text-sky-400 transition">
                Diseño de Sonrisa & Carillas
              </button>
            </li>
            <li>
              <button @click="scrollToSection('tratamientos')" class="hover:text-sky-400 transition">
                Implantes Dentales Guiados
              </button>
            </li>
            <li>
              <button @click="scrollToSection('tratamientos')" class="hover:text-sky-400 transition">
                Endodoncia Rotatoria
              </button>
            </li>
            <li>
              <button @click="scrollToSection('tratamientos')" class="hover:text-sky-400 transition">
                Profilaxis & Blanqueamiento
              </button>
            </li>
          </ul>
        </div>

        <!-- Col 3: Enlaces Rápidos -->
        <div class="space-y-3">
          <h4 class="font-extrabold text-sm uppercase tracking-wider text-white">
            Navegación
          </h4>
          <ul class="space-y-2 text-slate-400">
            <li>
              <button @click="scrollToSection('inicio')" class="hover:text-sky-400 transition">
                Inicio
              </button>
            </li>
            <li>
              <button @click="scrollToSection('nosotros')" class="hover:text-sky-400 transition">
                ¿Por qué elegirnos?
              </button>
            </li>
            <li>
              <button @click="scrollToSection('casos')" class="hover:text-sky-400 transition">
                Casos Clínicos
              </button>
            </li>
            <li>
              <button @click="scrollToSection('faq')" class="hover:text-sky-400 transition">
                Preguntas Frecuentes
              </button>
            </li>
            <li>
              <button @click="scrollToSection('sedes')" class="hover:text-sky-400 transition">
                Sedes y Horarios
              </button>
            </li>
          </ul>
        </div>

        <!-- Col 4: Horarios & Contacto Central -->
        <div class="space-y-3">
          <h4 class="font-extrabold text-sm uppercase tracking-wider text-white">
            Atención al Paciente
          </h4>
          <div class="space-y-2 text-slate-400">
            <p><strong>Central:</strong> (01) 748-9100</p>
            <p><strong>WhatsApp 24/7:</strong> +51 987 654 321</p>
            <p><strong>Correo:</strong> citas@clinicadental.com</p>
            <p class="text-[11px] text-emerald-400 font-semibold pt-1">
              • Urgencias Odontológicas atendidas de inmediato
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-500">
        <p>© {{ currentYear }} Clínica Dental. Todos los derechos reservados.</p>
        <p class="text-[11px]">
          Desarrollado bajo estándares médicos de seguridad de datos y privacidad HIPAA / MINSA.
        </p>
      </div>
    </div>
  </footer>
</template>
