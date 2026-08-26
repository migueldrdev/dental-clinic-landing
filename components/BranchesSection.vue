<script setup lang="ts">
import { MapPin, Phone, Mail, Clock, ExternalLink, Sparkles } from '@lucide/vue'

const branches = [
  {
    name: 'Sede Principal (San Isidro)',
    address: 'Av. Javier Prado Este 2450, Edificio Médico Salud, Piso 4',
    phone: '(01) 748-9100 / +51 987 654 321',
    email: 'sanisidro@clinicadental.com',
    hours: 'Lun - Vie: 8:00 AM - 8:00 PM | Sáb: 8:30 AM - 6:00 PM',
    isPrimary: true,
  },
  {
    name: 'Sede Miraflores',
    address: 'Calle Schell 310, Of. 502 (A 2 cdras. del Parque Kennedy)',
    phone: '(01) 748-9102 / +51 987 654 322',
    email: 'miraflores@clinicadental.com',
    hours: 'Lun - Vie: 9:00 AM - 8:00 PM | Sáb: 9:00 AM - 5:00 PM',
    isPrimary: false,
  },
  {
    name: 'Sede Surco / Chacarilla',
    address: 'Av. Primavera 640, Centro Empresarial Chacarilla, Torre B',
    phone: '(01) 748-9103 / +51 987 654 323',
    email: 'surco@clinicadental.com',
    hours: 'Lun - Vie: 8:30 AM - 7:30 PM | Sáb: 9:00 AM - 2:00 PM',
    isPrimary: false,
  },
]
</script>

<template>
  <section id="sedes" class="py-20 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span class="inline-flex items-center gap-1.5 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-widest bg-sky-50 dark:bg-sky-950/60 px-3.5 py-1.5 rounded-full border border-sky-100 dark:border-sky-900">
          <MapPin class="w-3.5 h-3.5" />
          Nuestras Ubicaciones
        </span>
        <h2 class="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Sedes & Horarios de Atención
        </h2>
        <p class="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">
          Encuentra la sede más cercana a tu ubicación con estacionamiento gratuito y acceso para pacientes.
        </p>
      </div>

      <!-- Branches Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="branch in branches"
          :key="branch.name"
          class="bg-slate-50 dark:bg-slate-950 rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between"
          :class="[
            branch.isPrimary
              ? 'border-sky-400 dark:border-sky-600 shadow-lg ring-2 ring-sky-500/10'
              : 'border-slate-200/80 dark:border-slate-800 hover:border-sky-300'
          ]"
        >
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-500/20">
                <MapPin class="w-5 h-5" />
              </div>
              <span
                v-if="branch.isPrimary"
                class="text-[10px] font-bold bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 px-2.5 py-1 rounded-full border border-sky-200 dark:border-sky-800"
              >
                Sede Central
              </span>
            </div>

            <h3 class="font-extrabold text-slate-900 dark:text-white text-base">
              {{ branch.name }}
            </h3>

            <div class="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div class="flex items-start gap-2.5">
                <MapPin class="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <span>{{ branch.address }}</span>
              </div>
              <div class="flex items-center gap-2.5">
                <Phone class="w-4 h-4 text-sky-500 shrink-0" />
                <span>{{ branch.phone }}</span>
              </div>
              <div class="flex items-center gap-2.5">
                <Mail class="w-4 h-4 text-sky-500 shrink-0" />
                <span class="truncate">{{ branch.email }}</span>
              </div>
              <div class="flex items-start gap-2.5">
                <Clock class="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <span>{{ branch.hours }}</span>
              </div>
            </div>
          </div>

          <div class="pt-5 mt-5 border-t border-slate-200/80 dark:border-slate-800">
            <a
              :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address)}`"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full py-2.5 px-4 bg-white dark:bg-slate-900 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Ver en Google Maps</span>
              <ExternalLink class="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
