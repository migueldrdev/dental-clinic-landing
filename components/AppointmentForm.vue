<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'
import { Calendar, CheckCircle2, AlertCircle, Send, ShieldCheck, User, Phone, IdCard, Stethoscope, MessageSquare } from '@lucide/vue'
import ToothLoader from './ToothLoader.vue'

interface Props {
  preselectedSpecialty?: string
}

const props = defineProps<Props>()

const config = useRuntimeConfig()

const formData = ref({
  nombre_completo: '',
  dni: '',
  telefono: '',
  correo: '',
  especialidad: 'Valoración Inicial Completa',
  motivo_consulta: '',
  fecha_preferida: '',
  hora_preferida: '',
})

watch(() => props.preselectedSpecialty, (newVal) => {
  if (newVal) {
    formData.value.especialidad = newVal
  }
})

const isLoading = ref(false)
const showSuccessModal = ref(false)
const errorMessage = ref('')

async function submitAppointment() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const payload = {
      nombre_completo: formData.value.nombre_completo,
      telefono: formData.value.telefono,
      dni: formData.value.dni || null,
      correo: formData.value.correo || null,
      especialidad: formData.value.especialidad,
      fecha_preferida: formData.value.fecha_preferida || null,
      hora_preferida: formData.value.hora_preferida || null,
      motivo_consulta: formData.value.motivo_consulta || null,
    }

    const response = await axios.post(`${config.public.apiBaseUrl}/solicitud-citas`, payload)
    
    if (response.status === 201 || response.data?.success) {
      showSuccessModal.value = true
      // Reset form
      formData.value = {
        nombre_completo: '',
        dni: '',
        telefono: '',
        correo: '',
        especialidad: 'Valoración Inicial Completa',
        motivo_consulta: '',
        fecha_preferida: '',
        hora_preferida: '',
      }
    }
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'Ocurrió un error al enviar tu solicitud. Intenta nuevamente o contáctanos por WhatsApp.'
  } finally {
    isLoading.value = false
  }
}

function closeSuccessModal() {
  showSuccessModal.value = false
}
</script>

<template>
  <section id="agendar" class="py-20 bg-gradient-to-b from-slate-50 via-sky-50/30 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-t border-slate-200/80 dark:border-slate-800 transition-colors">
    <ToothLoader :is-visible="isLoading" />

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-10 space-y-3">
        <span class="inline-flex items-center gap-1.5 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-widest bg-white dark:bg-slate-900 px-3.5 py-1.5 rounded-full border border-sky-100 dark:border-sky-900 shadow-sm">
          <Calendar class="w-3.5 h-3.5" />
          Reserva Inmediata
        </span>
        <h2 class="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Solicitud de Cita Médica
        </h2>
        <p class="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">
          Completa tus datos y nuestro equipo de recepción coordinará tu turno de atención en menos de 15 minutos.
        </p>
      </div>

      <!-- 3-Step Process Indicator -->
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
          <div class="flex items-start gap-3.5 pt-2 md:pt-0">
            <div class="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center font-extrabold text-xs shrink-0 shadow-md shadow-sky-500/20">
              1
            </div>
            <div>
              <h4 class="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                Solicitud Digital
              </h4>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                Ingresa tus datos y especialidad de interés.
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3.5 pt-3 md:pt-0 md:pl-5">
            <div class="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center font-extrabold text-xs shrink-0">
              2
            </div>
            <div>
              <h4 class="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                Asignación Médica
              </h4>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                El sistema programa al especialista indicado.
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3.5 pt-3 md:pt-0 md:pl-5">
            <div class="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center font-extrabold text-xs shrink-0">
              3
            </div>
            <div>
              <h4 class="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                Confirmación Rápida
              </h4>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                Te contactamos por WhatsApp o llamada para confirmar.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Form Container -->
      <div class="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 relative overflow-hidden">
        <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600" />

        <form @submit.prevent="submitAppointment" class="space-y-4">
          <!-- Error Alert -->
          <div
            v-if="errorMessage"
            class="p-4 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-3 animate-in fade-in"
          >
            <AlertCircle class="w-4 h-4 shrink-0 text-red-500" />
            <span>{{ errorMessage }}</span>
          </div>

          <!-- Row 1: Nombre & Teléfono -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Nombre Completo *
              </label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <User class="w-4 h-4" />
                </span>
                <input
                  v-model="formData.nombre_completo"
                  type="text"
                  required
                  placeholder="Ej. Juan Pérez Ramos"
                  class="w-full pl-10 pr-3.5 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none text-xs text-slate-900 dark:text-white transition"
                />
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Teléfono / WhatsApp *
              </label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Phone class="w-4 h-4" />
                </span>
                <input
                  v-model="formData.telefono"
                  type="tel"
                  required
                  placeholder="Ej. 987 654 321"
                  class="w-full pl-10 pr-3.5 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none text-xs text-slate-900 dark:text-white transition"
                />
              </div>
            </div>
          </div>

          <!-- Row 2: DNI & Especialidad -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Documento de Identidad <span class="text-slate-400 font-normal">(Opcional)</span>
              </label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <IdCard class="w-4 h-4" />
                </span>
                <input
                  v-model="formData.dni"
                  type="text"
                  placeholder="DNI / Pasaporte / Carnet Ext."
                  class="w-full pl-10 pr-3.5 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none text-xs text-slate-900 dark:text-white transition"
                />
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Especialidad Requerida *
              </label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Stethoscope class="w-4 h-4" />
                </span>
                <select
                  v-model="formData.especialidad"
                  required
                  class="w-full pl-10 pr-8 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none text-xs text-slate-900 dark:text-white transition appearance-none"
                >
                  <option value="Valoración Inicial Completa">Valoración Inicial Completa (Diagnóstico 3D)</option>
                  <option value="Ortodoncia Invisible">Ortodoncia Invisible (Alineadores 3D)</option>
                  <option value="Diseño de Sonrisa">Diseño de Sonrisa & Carillas</option>
                  <option value="Implantes Dentales">Implantes Dentales & Cirugía</option>
                  <option value="Endodoncia">Endodoncia (Tratamiento de Conducto)</option>
                  <option value="Limpieza y Profilaxis">Limpieza y Profilaxis Ultrasónica</option>
                  <option value="Urgencia Dental">Urgencia Dental por Dolor</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Row 3: Fecha & Turno -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Fecha Preferida <span class="text-slate-400 font-normal">(Opcional)</span>
              </label>
              <input
                v-model="formData.fecha_preferida"
                type="date"
                class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none text-xs text-slate-900 dark:text-white transition"
              />
            </div>

            <div>
              <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Turno Preferido <span class="text-slate-400 font-normal">(Opcional)</span>
              </label>
              <select
                v-model="formData.hora_preferida"
                class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none text-xs text-slate-900 dark:text-white transition"
              >
                <option value="">Cualquier turno disponible</option>
                <option value="09:00:00">Mañana (08:00 AM - 01:00 PM)</option>
                <option value="15:00:00">Tarde (02:00 PM - 08:00 PM)</option>
              </select>
            </div>
          </div>

          <!-- Row 4: Motivo de consulta -->
          <div>
            <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Motivo o Síntomas <span class="text-slate-400 font-normal">(Opcional)</span>
            </label>
            <textarea
              v-model="formData.motivo_consulta"
              rows="3"
              placeholder="Cuéntanos brevemente qué tratamiento buscas o si presentas algún dolor o molestia..."
              class="w-full p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none text-xs text-slate-900 dark:text-white transition resize-none"
            />
          </div>

          <!-- Submit Button -->
          <div class="pt-2">
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white py-4 px-8 rounded-2xl font-extrabold transition-all text-sm shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 hover:scale-[1.01] disabled:opacity-50"
            >
              <Send class="w-4 h-4" />
              <span>Enviar Solicitud de Cita</span>
            </button>
            <p class="text-center text-[11px] text-slate-400 mt-3 flex items-center justify-center gap-1.5">
              <ShieldCheck class="w-3.5 h-3.5 text-emerald-500" />
              <span>Tus datos están protegidos bajo estricto secreto médico y confidencialidad.</span>
            </p>
          </div>
        </form>
      </div>
    </div>

    <!-- Success Modal Dialog -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div class="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-8 text-center shadow-2xl border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-200">
        <!-- Animated Tooth Icon -->
        <div class="relative w-20 h-20 mx-auto mb-5 flex items-center justify-center">
          <div class="absolute inset-0 bg-sky-400/20 rounded-full animate-ping" />
          <div class="relative w-16 h-16 bg-gradient-to-tr from-sky-500 to-sky-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-500/40">
            <svg class="w-9 h-9" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.5 2C5.5 2 3 4.5 3 7.5C3 11 5 14 7 17.5C7.8 19 8.5 21.5 9.5 22C10.5 22.5 11 20.5 11.5 18.5C11.8 17 12.2 17 12.5 18.5C13 20.5 13.5 22.5 14.5 22C15.5 21.5 16.2 19 17 17.5C19 14 21 11 21 7.5C21 4.5 18.5 2 15.5 2C13.8 2 12.6 3 12 3.8C11.4 3 10.2 2 8.5 2Z" />
            </svg>
          </div>
        </div>

        <h3 class="text-xl font-black text-slate-900 dark:text-white mb-2">
          ¡Solicitud Recibida!
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
          Hemos registrado tus datos exitosamente. Un asesor clínico de la <strong>Clínica Dental</strong> te contactará en breve vía WhatsApp para confirmar tu cita.
        </p>

        <button
          @click="closeSuccessModal"
          class="w-full bg-slate-900 dark:bg-sky-500 hover:bg-sky-600 text-white py-3.5 rounded-xl font-extrabold text-xs transition shadow-md"
        >
          Entendido, Gracias
        </button>
      </div>
    </div>
  </section>
</template>
