<script setup lang="ts">
import { CalendarCheck, MessageCircle } from '@lucide/vue'
import { useSmoothScroll } from '../composables/useSmoothScroll'

const { scrollToSection } = useSmoothScroll()
</script>

<template>
  <div class="fixed bottom-6 left-4 sm:left-6 z-40">
    <!-- Floating Appointment CTA -->
    <button
      @click="scrollToSection('agendar')"
      class="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-extrabold px-4 sm:px-5 py-3 rounded-full shadow-2xl shadow-sky-500/40 flex items-center gap-2.5 text-xs sm:text-sm border-2 border-white/20 backdrop-blur-md transition-transform hover:scale-105 animate-float-slow"
      title="Agendar Cita Médica"
    >
      <div class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.5 2C5.5 2 3 4.5 3 7.5C3 11 5 14 7 17.5C7.8 19 8.5 21.5 9.5 22C10.5 22.5 11 20.5 11.5 18.5C11.8 17 12.2 17 12.5 18.5C13 20.5 13.5 22.5 14.5 22C15.5 21.5 16.2 19 17 17.5C19 14 21 11 21 7.5C21 4.5 18.5 2 15.5 2C13.8 2 12.6 3 12 3.8C11.4 3 10.2 2 8.5 2Z" />
        </svg>
      </div>
      <span class="hidden sm:inline">¡Reserva tu Cita Online!</span>
      <span class="sm:hidden">Cita Online</span>
    </button>
  </div>

  <div class="fixed bottom-6 right-4 sm:right-6 z-40">
    <!-- WhatsApp Floating Action Button -->
    <a
      href="https://wa.me/51987654321?text=Hola,%20deseo%20información%20sobre%20una%20cita%20odontológica"
      target="_blank"
      rel="noopener noreferrer"
      class="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center text-2xl shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-transform relative group"
      title="Escríbenos por WhatsApp"
      aria-label="WhatsApp"
    >
      <!-- Notification Ping dot -->
      <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-ping" />
      <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
      <MessageCircle class="w-7 h-7" />
    </a>
  </div>
</template>
