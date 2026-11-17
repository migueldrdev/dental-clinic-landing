<script setup lang="ts">
interface Props {
  isVisible: boolean
  title?: string
  subtitle?: string
}

withDefaults(defineProps<Props>(), {
  isVisible: false,
  title: 'Registrando tu solicitud...',
  subtitle: 'Estamos conectando con el sistema clínico para agendar tu cita.',
})
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md transition-all duration-300"
  >
    <div class="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl border border-slate-100 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
      <!-- Animated Tooth SVG -->
      <div class="relative w-20 h-20 mb-4 flex items-center justify-center">
        <div class="absolute inset-0 bg-sky-400/20 rounded-full animate-ping duration-1000" />
        <div class="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-sky-500/30 animate-bounce duration-1000 p-3">
          <img src="/images/brand/icon-odontec-white.png" class="w-10 h-10 object-contain" alt="ODONTEC" />
        </div>
      </div>

      <h3 class="text-base font-bold text-slate-900 tracking-tight mb-1">
        {{ title }}
      </h3>
      <p class="text-xs text-slate-500 max-w-xs leading-relaxed">
        {{ subtitle }}
      </p>

      <!-- Spinner Progress Dots -->
      <div class="flex items-center gap-1.5 mt-5">
        <span class="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
        <span class="w-2 h-2 rounded-full bg-sky-400 animate-pulse delay-150" />
        <span class="w-2 h-2 rounded-full bg-sky-300 animate-pulse delay-300" />
      </div>
    </div>
  </div>
</template>
