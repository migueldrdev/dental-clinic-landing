<script setup lang="ts">
import { Scan, HeartPulse, UserCheck, CreditCard, Sparkles } from '@lucide/vue'

const features = [
  {
    icon: Scan,
    title: 'Escaneo 3D & Precisión',
    description: 'Olvídate de las tomas de moldes molestas. Diseñamos tus tratamientos con escáneres intraorales de alta resolución.',
    badge: 'Sin moldes de yeso',
  },
  {
    icon: HeartPulse,
    title: 'Atención Sin Dolor',
    description: 'Protocolos de anestesia computarizada guiada y técnicas mínimamente invasivas para una experiencia 100% confortable.',
    badge: 'Máximo confort',
  },
  {
    icon: UserCheck,
    title: 'Especialistas Certificados',
    description: 'Odontólogos con posgrado y colegiatura COP en cada área: ortodoncia, cirugía maxilofacial, implantes, estética y endodoncia.',
    badge: 'Staff de posgrado',
  },
  {
    icon: CreditCard,
    title: 'Facilidades de Pago',
    description: 'Planes de financiamiento accesibles, pagos fraccionados en cuotas sin intereses y facilidades adaptadas a tu presupuesto.',
    badge: 'Cuotas a tu medida',
  },
]
</script>

<template>
  <section id="nosotros" class="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span class="inline-flex items-center gap-1.5 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-widest bg-sky-50 dark:bg-sky-950/60 px-3.5 py-1.5 rounded-full border border-sky-100 dark:border-sky-900">
          <Sparkles class="w-3.5 h-3.5" />
          Compromiso y Excelencia
        </span>
        <h2 class="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          ¿Por qué confiar tu salud en nosotros?
        </h2>
        <p class="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
          Combinamos calidez humana, experiencia médica rigurosa y la infraestructura digital más avanzada para una atención garantizada.
        </p>
      </div>

      <!-- Features Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="item in features"
          :key="item.title"
          class="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 hover:border-sky-400 dark:hover:border-sky-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
        >
          <div>
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-sky-400 text-white flex items-center justify-center text-xl mb-5 shadow-lg shadow-sky-500/20 group-hover:scale-110 transition-transform">
              <component :is="item.icon" class="w-6 h-6" />
            </div>

            <span class="inline-block text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-2">
              {{ item.badge }}
            </span>

            <h3 class="font-extrabold text-slate-900 dark:text-white text-base mb-2">
              {{ item.title }}
            </h3>

            <p class="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
