<script setup lang="ts">
import { ref } from 'vue'
import { HelpCircle, ChevronDown, Sparkles } from '@lucide/vue'

const openIndex = ref<number | null>(0)

const faqs = [
  {
    question: '¿La evaluación inicial incluye escaneo 3D y presupuesto sin compromiso?',
    answer: 'Sí. En tu primera cita realizamos una valoración clínica completa con escáner intraoral 3D de alta definición, permitiéndote ver tu boca en pantalla gigante y conocer las opciones de tratamiento con presupuestos detallados y transparentes.',
  },
  {
    question: '¿Qué modalidades y facilidades de pago ofrecen?',
    answer: 'Contamos con convenios con las principales entidades financieras para ofrecer financiamiento en cuotas sin intereses. Aceptamos tarjetas de crédito, débito (Visa, Mastercard, Diners, Amex), transferencias y planes de pago fraccionados según el avance de tu tratamiento.',
  },
  {
    question: '¿Los tratamientos como implantes, endodoncia o extracciones duelen?',
    answer: 'No. Aplicamos protocolos avanzados de anestesia computarizada guiada que duermen la zona de forma localizada sin dolor ni molestias. Nuestra prioridad absoluta es tu comodidad y tranquilidad durante cada procedimiento.',
  },
  {
    question: '¿Qué diferencia a los alineadores invisibles de los brackets tradicionales?',
    answer: 'Los alineadores invisibles son placas transparentes termoformadas removibles. Puedes retirarlas para comer y cepillarte con total comodidad, sin alambres metálicos ni llagas en los labios, y con citas de control más espaciadas y predecibles.',
  },
  {
    question: '¿Atienden emergencias o urgencias dentales el mismo día?',
    answer: 'Sí. Disponemos de cupos prioritarios en nuestra agenda diaria para atender urgencias odontológicas agudas por dolor, traumatismos, caídas de coronas o fracturas dentales el mismo día de tu solicitud.',
  },
]

function toggleFaq(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section id="faq" class="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16 space-y-3">
        <span class="inline-flex items-center gap-1.5 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-widest bg-sky-50 dark:bg-sky-950/60 px-3.5 py-1.5 rounded-full border border-sky-100 dark:border-sky-900">
          <HelpCircle class="w-3.5 h-3.5" />
          Resolvemos tus Dudas
        </span>
        <h2 class="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Preguntas Frecuentes
        </h2>
        <p class="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">
          Todo lo que necesitas saber antes de agendar tu primera consulta en nuestra clínica.
        </p>
      </div>

      <!-- Accordion List -->
      <div class="space-y-3">
        <div
          v-for="(item, index) in faqs"
          :key="index"
          class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-200"
        >
          <button
            @click="toggleFaq(index)"
            class="w-full p-5 text-left font-bold text-slate-900 dark:text-white flex justify-between items-center text-xs sm:text-sm focus:outline-none hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            <span>{{ item.question }}</span>
            <ChevronDown
              class="w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300"
              :class="{ 'rotate-180 text-sky-500': openIndex === index }"
            />
          </button>

          <div
            v-show="openIndex === index"
            class="px-5 pb-5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 animate-in fade-in"
          >
            {{ item.answer }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
