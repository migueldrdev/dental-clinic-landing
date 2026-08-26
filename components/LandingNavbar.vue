<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { CalendarCheck, ShieldCheck, Menu, X, Sun, Moon, Sparkles } from '@lucide/vue'
import { useDarkMode } from '../composables/useDarkMode'
import { useSmoothScroll } from '../composables/useSmoothScroll'

const config = useRuntimeConfig()
const { isDark, toggleDarkMode } = useDarkMode()
const { scrollToSection } = useSmoothScroll()

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)
const activeSection = ref('inicio')

const navLinks = [
  { name: 'Inicio', id: 'inicio' },
  { name: 'Nosotros', id: 'nosotros' },
  { name: 'Tratamientos', id: 'tratamientos' },
  { name: 'Casos Clínicos', id: 'casos' },
  { name: 'Preguntas', id: 'faq' },
  { name: 'Sedes', id: 'sedes' },
]

function handleNavClick(sectionId: string) {
  isMobileMenuOpen.value = false
  activeSection.value = sectionId
  scrollToSection(sectionId)
}

function handleScroll() {
  if (import.meta.client) {
    isScrolled.value = window.scrollY > 20

    const sections = navLinks.map((link) => link.id)
    for (const sectionId of sections) {
      const el = document.getElementById(sectionId)
      if (el) {
        const rect = el.getBoundingClientRect()
        if (rect.top <= 150 && rect.bottom >= 150) {
          activeSection.value = sectionId
          break
        }
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    class="sticky top-0 z-40 transition-all duration-300 border-b"
    :class="[
      isScrolled
        ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-md border-slate-200/80 dark:border-slate-800'
        : 'bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-900'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
      <!-- Logo Brand -->
      <a
        href="#inicio"
        @click.prevent="handleNavClick('inicio')"
        class="flex items-center gap-3 group"
      >
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-sky-400 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.5 2C5.5 2 3 4.5 3 7.5C3 11 5 14 7 17.5C7.8 19 8.5 21.5 9.5 22C10.5 22.5 11 20.5 11.5 18.5C11.8 17 12.2 17 12.5 18.5C13 20.5 13.5 22.5 14.5 22C15.5 21.5 16.2 19 17 17.5C19 14 21 11 21 7.5C21 4.5 18.5 2 15.5 2C13.8 2 12.6 3 12 3.8C11.4 3 10.2 2 8.5 2Z" />
          </svg>
        </div>
        <div class="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
          Clínica<span class="text-sky-500">Dental</span>
        </div>
      </a>

      <!-- Desktop Navigation Menu -->
      <nav class="hidden lg:flex items-center gap-7 font-semibold text-slate-600 dark:text-slate-300 text-xs tracking-wide uppercase">
        <button
          v-for="link in navLinks"
          :key="link.id"
          @click="handleNavClick(link.id)"
          class="py-1 transition-colors relative"
          :class="[
            activeSection === link.id
              ? 'text-sky-600 dark:text-sky-400 font-bold'
              : 'hover:text-sky-500 dark:hover:text-sky-400'
          ]"
        >
          {{ link.name }}
          <span
            v-if="activeSection === link.id"
            class="absolute -bottom-1 left-0 right-0 h-0.5 bg-sky-500 rounded-full animate-in fade-in"
          />
        </button>
      </nav>

      <!-- Desktop Actions: Dark Mode + CTAs -->
      <div class="hidden sm:flex items-center gap-3">
        <!-- Dark Mode Toggle Button -->
        <button
          @click="toggleDarkMode"
          class="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Cambiar tema"
          aria-label="Modo Claro/Oscuro"
        >
          <Sun v-if="isDark" class="w-5 h-5 text-amber-400 animate-in spin-in-90 duration-300" />
          <Moon v-else class="w-5 h-5 text-slate-700 animate-in spin-in-90 duration-300" />
        </button>

        <button
          @click="handleNavClick('agendar')"
          class="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-sky-500/20 transition-all flex items-center gap-2 hover:shadow-sky-500/40"
        >
          <CalendarCheck class="w-4 h-4" />
          Agendar Cita
        </button>

        <a
          :href="`${config.public.adminAppUrl}/login`"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white border border-slate-800 dark:border-slate-700 px-4 py-2.5 rounded-xl font-bold text-xs transition shadow-sm flex items-center gap-2"
        >
          <ShieldCheck class="w-4 h-4 text-cyan-400" />
          Portal Médico
        </a>
      </div>

      <!-- Mobile Right Controls (Dark mode + Menu) -->
      <div class="flex items-center gap-2 lg:hidden">
        <button
          @click="toggleDarkMode"
          class="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Cambiar tema"
        >
          <Sun v-if="isDark" class="w-5 h-5 text-amber-400" />
          <Moon v-else class="w-5 h-5 text-slate-700 dark:text-slate-300" />
        </button>

        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
          aria-label="Abrir Menú"
        >
          <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Menu -->
    <div
      v-if="isMobileMenuOpen"
      class="lg:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 px-6 py-5 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200"
    >
      <div class="flex flex-col space-y-1 font-semibold text-slate-700 dark:text-slate-300 text-sm">
        <button
          v-for="link in navLinks"
          :key="link.id"
          @click="handleNavClick(link.id)"
          class="text-left px-3 py-2.5 rounded-xl transition flex items-center justify-between"
          :class="[
            activeSection === link.id
              ? 'bg-sky-50 dark:bg-slate-900 text-sky-600 dark:text-sky-400 font-bold'
              : 'hover:bg-slate-50 dark:hover:bg-slate-900'
          ]"
        >
          <span>{{ link.name }}</span>
          <Sparkles v-if="activeSection === link.id" class="w-3.5 h-3.5 text-sky-500" />
        </button>
      </div>

      <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
        <button
          @click="handleNavClick('agendar')"
          class="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl font-bold text-xs text-center flex items-center justify-center gap-2 shadow-md shadow-sky-500/20"
        >
          <CalendarCheck class="w-4 h-4" />
          Agendar Cita
        </button>
        <a
          :href="`${config.public.adminAppUrl}/login`"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white py-3 rounded-xl font-bold text-xs text-center flex items-center justify-center gap-2 shadow-sm"
        >
          <ShieldCheck class="w-4 h-4 text-cyan-400" />
          Portal Médico
        </a>
      </div>
    </div>
  </header>
</template>
