<script setup lang="ts">
import { ref, watch, computed } from "vue";
import axios from "axios";
import {
    Calendar,
    CheckCircle2,
    AlertCircle,
    Send,
    ShieldCheck,
    User,
    Phone,
    IdCard,
    Stethoscope,
    MessageSquare,
    Mail,
    Sun,
    Sunset,
    Clock,
    Sparkles,
    Check,
    ChevronDown,
} from "@lucide/vue";
import ToothLoader from "./ToothLoader.vue";
import CustomSelect from "./CustomSelect.vue";
import CustomDatePicker from "./CustomDatePicker.vue";

interface Props {
    preselectedSpecialty?: string;
}

const props = defineProps<Props>();

const config = useRuntimeConfig();

const specialtyOptions = [
    {
        value: "Valoración Inicial Completa",
        label: "Valoración Inicial Completa (Diagnóstico 3D)",
        description: "Diagnóstico computarizado integral, fotos intraorales y plan de tratamiento.",
        badge: "Recomendado",
    },
    {
        value: "Ortodoncia Invisible",
        label: "Ortodoncia Invisible (Alineadores 3D)",
        description: "Alineamiento dental estético y transparente sin brackets metálicos.",
        badge: "3D Tech",
    },
    {
        value: "Diseño de Sonrisa",
        label: "Diseño de Sonrisa & Carillas Estéticas",
        description: "Carillas de resina estética de alta gama o porcelana ultrafina.",
        badge: "Estética",
    },
    {
        value: "Implantes Dentales",
        label: "Implantes Dentales Guiados & Cirugía",
        description: "Recuperación de piezas dentales fijas con tecnología guiada sin dolor.",
        badge: "Titanio",
    },
    {
        value: "Endodoncia",
        label: "Endodoncia (Tratamiento de Conducto)",
        description: "Alivio del dolor agudo y salvación de la pieza dental con tecnología rotatoria.",
        badge: "Sin Dolor",
    },
    {
        value: "Limpieza y Profilaxis",
        label: "Limpieza y Profilaxis Ultrasónica",
        description: "Remoción profunda de sarro y manchas con ultrasonido y pulido.",
        badge: "Preventiva",
    },
    {
        value: "Urgencia Dental",
        label: "Urgencia Dental por Dolor / Infección",
        description: "Atención prioritaria inmediata el mismo día.",
        badge: "Urgente",
    },
];

const formData = ref({
    nombre_completo: "",
    dni: "",
    telefono: "",
    correo: "",
    especialidad: "Valoración Inicial Completa",
    motivo_consulta: "",
    fecha_preferida: "",
    hora_preferida: "", // "" (cualquiera), "09:00:00" (mañana), "15:00:00" (tarde)
});

watch(
    () => props.preselectedSpecialty,
    (newVal) => {
        if (newVal) {
            formData.value.especialidad = newVal;
        }
    },
);

const isLoading = ref(false);
const showSuccessModal = ref(false);
const errorMessage = ref("");
const fieldErrors = ref<Record<string, string>>({});

// Fecha mínima permitida (Hoy)
const todayStr = new Date().toISOString().split("T")[0];
const minDate = todayStr;

// Opciones de turno visuales
const turnos = [
    {
        id: "",
        title: "Cualquier Turno",
        horario: "Más próximo",
        icon: Clock,
    },
    {
        id: "09:00:00",
        title: "Mañana",
        horario: "08:00 AM - 01:00 PM",
        icon: Sun,
    },
    {
        id: "15:00:00",
        title: "Tarde",
        horario: "02:00 PM - 08:00 PM",
        icon: Sunset,
    },
];

// Handlers estrictos para evitar letras en Teléfono y DNI
function handlePhoneInput(e: Event) {
    const target = e.target as HTMLInputElement;
    const clean = target.value.replace(/\D/g, "").slice(0, 9);
    formData.value.telefono = clean;
    target.value = clean;
    if (fieldErrors.value.telefono) {
        delete fieldErrors.value.telefono;
    }
}

function handleDniInput(e: Event) {
    const target = e.target as HTMLInputElement;
    const clean = target.value.replace(/\D/g, "").slice(0, 8);
    formData.value.dni = clean;
    target.value = clean;
    if (fieldErrors.value.dni) {
        delete fieldErrors.value.dni;
    }
}

// Helpers de fecha rápida
function setQuickDate(offsetDays: number) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    formData.value.fecha_preferida = d.toISOString().split("T")[0];
}

// Validaciones reactivas para feedback visual instantáneo
const isPhoneValid = computed(() => {
    if (!formData.value.telefono) return false;
    return formData.value.telefono.length === 9 && formData.value.telefono.startsWith("9");
});

const isDniValid = computed(() => {
    if (!formData.value.dni) return true; // es opcional
    return formData.value.dni.length === 8;
});

const isEmailValid = computed(() => {
    if (!formData.value.correo) return true; // es opcional
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(formData.value.correo);
});

async function submitAppointment() {
    errorMessage.value = "";
    fieldErrors.value = {};

    // 1. Validaciones de frontend antes del envío
    if (formData.value.nombre_completo.trim().length < 3) {
        fieldErrors.value.nombre_completo = "Ingresa tu nombre completo (mínimo 3 letras).";
    }

    if (!isPhoneValid.value) {
        fieldErrors.value.telefono = "Ingresa un número de celular válido de Perú (9 dígitos, comenzando con 9).";
    }

    if (formData.value.dni && !isDniValid.value) {
        fieldErrors.value.dni = "El DNI debe contener exactamente 8 dígitos numéricos.";
    }

    if (formData.value.correo && !isEmailValid.value) {
        fieldErrors.value.correo = "Ingresa un correo electrónico válido.";
    }

    if (Object.keys(fieldErrors.value).length > 0) {
        errorMessage.value = "Por favor verifica los campos marcados en rojo antes de enviar.";
        return;
    }

    isLoading.value = true;

    try {
        const payload = {
            nombre_completo: formData.value.nombre_completo.trim(),
            telefono: formData.value.telefono.trim(),
            dni: formData.value.dni.trim() || null,
            correo: formData.value.correo.trim() || null,
            especialidad: formData.value.especialidad,
            fecha_preferida: formData.value.fecha_preferida || null,
            hora_preferida: formData.value.hora_preferida || null,
            motivo_consulta: formData.value.motivo_consulta.trim() || null,
        };

        const apiEndpoint = `${config.public.apiBaseUrl}/solicitud-citas`;
        const response = await axios.post(apiEndpoint, payload);

        if (response.status === 201 || response.data?.success) {
            showSuccessModal.value = true;
            // Reset form
            formData.value = {
                nombre_completo: "",
                dni: "",
                telefono: "",
                correo: "",
                especialidad: "Valoración Inicial Completa",
                motivo_consulta: "",
                fecha_preferida: "",
                hora_preferida: "",
            };
        }
    } catch (error: any) {
        if (error.response?.data?.errors) {
            const backendErrors = error.response.data.errors;
            const firstKey = Object.keys(backendErrors)[0];
            errorMessage.value = backendErrors[firstKey][0] || "Error en los datos ingresados.";
        } else {
            errorMessage.value =
                error.response?.data?.message ||
                "Ocurrió un error al enviar tu solicitud. Intenta nuevamente o contáctanos directamente por WhatsApp.";
        }
    } finally {
        isLoading.value = false;
    }
}

function closeSuccessModal() {
    showSuccessModal.value = false;
}
</script>

<template>
    <section
        id="agendar"
        class="py-20 bg-gradient-to-b from-slate-50 via-sky-50/30 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-t border-slate-200/80 dark:border-slate-800 transition-colors"
    >
        <ToothLoader :is-visible="isLoading" />

        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-10 space-y-3">
                <span
                    class="inline-flex items-center gap-1.5 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-widest bg-white dark:bg-slate-900 px-3.5 py-1.5 rounded-full border border-sky-100 dark:border-sky-900 shadow-sm"
                >
                    <Calendar class="w-3.5 h-3.5" />
                    Reserva Inmediata
                </span>
                <h2
                    class="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight"
                >
                    Solicitud de Cita Médica
                </h2>
                <p
                    class="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-lg mx-auto"
                >
                    Completa tus datos y nuestro equipo de recepción coordinará tu turno de atención en menos de 15 minutos vía WhatsApp.
                </p>
            </div>

            <!-- 3-Step Process Indicator -->
            <div
                class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 mb-8"
            >
                <div
                    class="grid grid-cols-1 md:grid-cols-3 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800"
                >
                    <div class="flex items-start gap-3.5 pt-2 md:pt-0">
                        <div
                            class="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center font-extrabold text-xs shrink-0 shadow-md shadow-sky-500/20"
                        >
                            1
                        </div>
                        <div>
                            <h4
                                class="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider"
                            >
                                Solicitud Digital
                            </h4>
                            <p
                                class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed"
                            >
                                Ingresa tus datos y tratamiento de interés.
                            </p>
                        </div>
                    </div>

                    <div class="flex items-start gap-3.5 pt-3 md:pt-0 md:pl-5">
                        <div
                            class="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center font-extrabold text-xs shrink-0"
                        >
                            2
                        </div>
                        <div>
                            <h4
                                class="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider"
                            >
                                Asignación Médica
                            </h4>
                            <p
                                class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed"
                            >
                                El consultorio asigna al especialista indicado.
                            </p>
                        </div>
                    </div>

                    <div class="flex items-start gap-3.5 pt-3 md:pt-0 md:pl-5">
                        <div
                            class="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center font-extrabold text-xs shrink-0"
                        >
                            3
                        </div>
                        <div>
                            <h4
                                class="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider"
                            >
                                Confirmación Rápida
                            </h4>
                            <p
                                class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed"
                            >
                                Te contactamos por WhatsApp para confirmar tu hora.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Form Container -->
            <div
                class="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 relative overflow-hidden"
            >
                <div
                    class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600"
                />

                <form @submit.prevent="submitAppointment" class="space-y-5">
                    <!-- Global Error Alert -->
                    <div
                        v-if="errorMessage"
                        class="p-4 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-3 animate-in fade-in"
                    >
                        <AlertCircle class="w-4 h-4 shrink-0 text-red-500" />
                        <span>{{ errorMessage }}</span>
                    </div>

                    <!-- Row 1: Nombre Completo & Teléfono / WhatsApp -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <!-- Nombre Completo -->
                        <div>
                            <label
                                class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
                            >
                                Nombre y Apellidos *
                            </label>
                            <div class="relative">
                                <span
                                    class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400"
                                >
                                    <User class="w-4 h-4" />
                                </span>
                                <input
                                    v-model="formData.nombre_completo"
                                    type="text"
                                    required
                                    placeholder="Ej. Segundo Miguel Silva"
                                    class="w-full pl-10 pr-3.5 py-3 bg-slate-50 dark:bg-slate-950 border rounded-xl text-xs text-slate-900 dark:text-white transition focus:bg-white dark:focus:bg-slate-900 focus:ring-2 outline-none"
                                    :class="[
                                        fieldErrors.nombre_completo
                                            ? 'border-red-400 focus:ring-red-400'
                                            : 'border-slate-200 dark:border-slate-800 focus:ring-sky-500'
                                    ]"
                                />
                            </div>
                            <p
                                v-if="fieldErrors.nombre_completo"
                                class="text-[10px] text-red-500 mt-1 font-medium"
                            >
                                {{ fieldErrors.nombre_completo }}
                            </p>
                        </div>

                        <!-- Teléfono / WhatsApp -->
                        <div>
                            <div class="flex items-center justify-between mb-1.5">
                                <label
                                    class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
                                >
                                    Teléfono / WhatsApp *
                                </label>
                                <span class="text-[10px] text-slate-400 font-medium">
                                    {{ formData.telefono.length }}/9 dígitos
                                </span>
                            </div>
                            <div class="relative">
                                <span
                                    class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400"
                                >
                                    <Phone class="w-4 h-4" />
                                </span>
                                <input
                                    :value="formData.telefono"
                                    @input="handlePhoneInput"
                                    type="tel"
                                    inputmode="numeric"
                                    required
                                    maxlength="9"
                                    placeholder="987654321 (9 dígitos)"
                                    class="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-950 border rounded-xl text-xs text-slate-900 dark:text-white font-mono transition focus:bg-white dark:focus:bg-slate-900 focus:ring-2 outline-none"
                                    :class="[
                                        fieldErrors.telefono
                                            ? 'border-red-400 focus:ring-red-400'
                                            : isPhoneValid
                                                ? 'border-emerald-500 focus:ring-emerald-500'
                                                : 'border-slate-200 dark:border-slate-800 focus:ring-sky-500'
                                    ]"
                                />
                                <span
                                    v-if="isPhoneValid"
                                    class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-emerald-500"
                                >
                                    <Check class="w-4 h-4" />
                                </span>
                            </div>
                            <p
                                v-if="fieldErrors.telefono"
                                class="text-[10px] text-red-500 mt-1 font-medium"
                            >
                                {{ fieldErrors.telefono }}
                            </p>
                            <p
                                v-else-if="formData.telefono && !isPhoneValid"
                                class="text-[10px] text-amber-500 mt-1 font-medium"
                            >
                                Debe comenzar con 9 y tener 9 dígitos numéricos exactos.
                            </p>
                        </div>
                    </div>

                    <!-- Row 2: Documento de Identidad & Correo Electrónico -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <!-- DNI -->
                        <div>
                            <div class="flex items-center justify-between mb-1.5">
                                <label
                                    class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
                                >
                                    Documento DNI <span class="text-slate-400 font-normal">(Opcional)</span>
                                </label>
                                <span v-if="formData.dni" class="text-[10px] text-slate-400 font-medium">
                                    {{ formData.dni.length }}/8 dígitos
                                </span>
                            </div>
                            <div class="relative">
                                <span
                                    class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400"
                                >
                                    <IdCard class="w-4 h-4" />
                                </span>
                                <input
                                    :value="formData.dni"
                                    @input="handleDniInput"
                                    type="text"
                                    inputmode="numeric"
                                    maxlength="8"
                                    placeholder="8 dígitos numéricos"
                                    class="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-950 border rounded-xl text-xs text-slate-900 dark:text-white font-mono transition focus:bg-white dark:focus:bg-slate-900 focus:ring-2 outline-none"
                                    :class="[
                                        fieldErrors.dni
                                            ? 'border-red-400 focus:ring-red-400'
                                            : formData.dni && isDniValid
                                                ? 'border-emerald-500 focus:ring-emerald-500'
                                                : 'border-slate-200 dark:border-slate-800 focus:ring-sky-500'
                                    ]"
                                />
                                <span
                                    v-if="formData.dni && isDniValid"
                                    class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-emerald-500"
                                >
                                    <Check class="w-4 h-4" />
                                </span>
                            </div>
                            <p
                                v-if="fieldErrors.dni"
                                class="text-[10px] text-red-500 mt-1 font-medium"
                            >
                                {{ fieldErrors.dni }}
                            </p>
                            <p
                                v-else-if="formData.dni && !isDniValid"
                                class="text-[10px] text-amber-500 mt-1 font-medium"
                            >
                                El DNI debe ser exactamente de 8 números.
                            </p>
                        </div>

                        <!-- Correo Electrónico -->
                        <div>
                            <label
                                class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
                            >
                                Correo Electrónico <span class="text-slate-400 font-normal">(Opcional)</span>
                            </label>
                            <div class="relative">
                                <span
                                    class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400"
                                >
                                    <Mail class="w-4 h-4" />
                                </span>
                                <input
                                    v-model="formData.correo"
                                    type="email"
                                    placeholder="paciente@correo.com"
                                    class="w-full pl-10 pr-3.5 py-3 bg-slate-50 dark:bg-slate-950 border rounded-xl text-xs text-slate-900 dark:text-white transition focus:bg-white dark:focus:bg-slate-900 focus:ring-2 outline-none"
                                    :class="[
                                        fieldErrors.correo
                                            ? 'border-red-400 focus:ring-red-400'
                                            : 'border-slate-200 dark:border-slate-800 focus:ring-sky-500'
                                    ]"
                                />
                            </div>
                            <p
                                v-if="fieldErrors.correo"
                                class="text-[10px] text-red-500 mt-1 font-medium"
                            >
                                {{ fieldErrors.correo }}
                            </p>
                        </div>
                    </div>

                    <!-- Row 3: Especialidad Requerida (Custom Modern Shadcn Select) -->
                    <div>
                        <label
                            class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
                        >
                            Tratamiento o Especialidad Requerida *
                        </label>
                        <CustomSelect
                            v-model="formData.especialidad"
                            :options="specialtyOptions"
                            placeholder="Selecciona la especialidad o tratamiento..."
                            :has-error="!!fieldErrors.especialidad"
                        />
                    </div>

                    <!-- Row 4: Fecha Preferida & Selector Moderno de Turno -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                        <!-- Fecha Preferida con Custom DatePicker tipo Shadcn -->
                        <div>
                            <label
                                class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
                            >
                                Fecha Estimada <span class="text-slate-400 font-normal">(Opcional)</span>
                            </label>
                            <CustomDatePicker
                                v-model="formData.fecha_preferida"
                                placeholder="Seleccionar fecha en calendario..."
                            />
                        </div>

                        <!-- Turno Preferido: Selector Moderno en Tarjetas (Shadcn-like) -->
                        <div>
                            <label
                                class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
                            >
                                Turno Preferido <span class="text-slate-400 font-normal">(Opcional)</span>
                            </label>
                            <div class="grid grid-cols-3 gap-2">
                                <button
                                    v-for="turno in turnos"
                                    :key="turno.id"
                                    type="button"
                                    @click="formData.hora_preferida = turno.id"
                                    class="p-2 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer group"
                                    :class="[
                                        formData.hora_preferida === turno.id
                                            ? 'border-sky-500 bg-sky-500/10 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 shadow-sm ring-1 ring-sky-500'
                                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                                    ]"
                                >
                                    <div class="flex items-center justify-between w-full mb-1">
                                        <component
                                            :is="turno.icon"
                                            class="w-3.5 h-3.5 text-sky-500"
                                        />
                                        <span
                                            v-if="formData.hora_preferida === turno.id"
                                            class="w-1.5 h-1.5 rounded-full bg-sky-500"
                                        />
                                    </div>
                                    <span class="text-[11px] font-bold block truncate">
                                        {{ turno.title }}
                                    </span>
                                    <span class="text-[9px] text-slate-400 block truncate leading-tight">
                                        {{ turno.horario }}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Row 5: Motivo o Síntomas -->
                    <div>
                        <div class="flex items-center justify-between mb-1.5">
                            <label
                                class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
                            >
                                Motivo de Consulta o Molestia <span class="text-slate-400 font-normal">(Opcional)</span>
                            </label>
                            <span class="text-[10px] text-slate-400">
                                {{ formData.motivo_consulta.length }}/500
                            </span>
                        </div>
                        <div class="relative">
                            <textarea
                                v-model="formData.motivo_consulta"
                                rows="3"
                                maxlength="500"
                                placeholder="Cuéntanos brevemente qué tratamiento buscas o si presentas algún dolor o molestia para preparar tu cita..."
                                class="w-full p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white transition focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-sky-500 outline-none resize-none"
                            />
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="pt-2">
                        <button
                            type="submit"
                            :disabled="isLoading"
                            class="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white py-4 px-8 rounded-2xl font-extrabold transition-all text-sm shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 hover:scale-[1.005] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                        >
                            <Send class="w-4 h-4" />
                            <span>Enviar Solicitud de Cita</span>
                        </button>
                        <p
                            class="text-center text-[11px] text-slate-400 mt-3 flex items-center justify-center gap-1.5"
                        >
                            <ShieldCheck class="w-3.5 h-3.5 text-emerald-500" />
                            <span>Tus datos están protegidos bajo estricta confidencialidad médica.</span>
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
            <div
                class="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-8 text-center shadow-2xl border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-200"
            >
                <!-- Animated Tooth Icon -->
                <div
                    class="relative w-20 h-20 mx-auto mb-5 flex items-center justify-center"
                >
                    <div
                        class="absolute inset-0 bg-sky-400/20 rounded-full animate-ping"
                    />
                    <div
                        class="relative w-16 h-16 bg-gradient-to-tr from-sky-500 to-sky-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-500/40"
                    >
                        <svg
                            class="w-9 h-9"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path
                                d="M8.5 2C5.5 2 3 4.5 3 7.5C3 11 5 14 7 17.5C7.8 19 8.5 21.5 9.5 22C10.5 22.5 11 20.5 11.5 18.5C11.8 17 12.2 17 12.5 18.5C13 20.5 13.5 22.5 14.5 22C15.5 21.5 16.2 19 17 17.5C19 14 21 11 21 7.5C21 4.5 18.5 2 15.5 2C13.8 2 12.6 3 12 3.8C11.4 3 10.2 2 8.5 2Z"
                            />
                        </svg>
                    </div>
                </div>

                <h3
                    class="text-xl font-black text-slate-900 dark:text-white mb-2"
                >
                    ¡Solicitud Recibida!
                </h3>
                <p
                    class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6"
                >
                    Hemos registrado tus datos exitosamente. Un asesor clínico de la <strong>Clínica Dental</strong> te contactará en breve vía WhatsApp al número registrado para confirmar tu turno.
                </p>

                <button
                    @click="closeSuccessModal"
                    class="w-full bg-slate-900 dark:bg-sky-500 hover:bg-sky-600 text-white py-3.5 rounded-xl font-extrabold text-xs transition shadow-md cursor-pointer"
                >
                    Entendido, Gracias
                </button>
            </div>
        </div>
    </section>
</template>
