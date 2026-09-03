<script setup lang="ts">
import { ref, computed } from "vue";
import {
    Sparkles,
    ArrowRight,
    Clock,
    ShieldCheck,
    ChevronLeft,
    ChevronRight,
} from "@lucide/vue";
import { useSmoothScroll } from "../composables/useSmoothScroll";
import ImageSkeleton from "./ImageSkeleton.vue";

const emit = defineEmits<{
    (e: "select-specialty", specialty: string): void;
}>();

const { scrollToSection } = useSmoothScroll();

const activeCategory = ref("todos");

const categories = [
    { id: "todos", label: "Todos" },
    { id: "ortodoncia", label: "Ortodoncia" },
    { id: "estetica", label: "Estética & Diseño" },
    { id: "implantes", label: "Implantes" },
    { id: "salud", label: "Salud Integral" },
];

const treatments = [
    {
        id: 1,
        title: "Ortodoncia Invisible",
        category: "ortodoncia",
        specialtyName: "Ortodoncia Invisible",
        description:
            "Alineación dental discreta con férulas transparentes personalizadas mediante escaneo 3D. Cómodas, estéticas y removibles.",
        image: "/images/treatments/invisible-orthodontics.jpg",
        skeletonDescription:
            "Alineador dental transparente termoformado en modelo anatómico 3D (600x400 px)",
        duration: "6 a 14 meses",
        warranty: "Garantía de alineación",
        badge: "Más Solicitado",
    },
    {
        id: 2,
        title: "Diseño de Sonrisa & Carillas",
        category: "estetica",
        specialtyName: "Diseño de Sonrisa",
        description:
            "Carillas de porcelana ultra finas y resistentes que corrigen color, tamaño y forma dental con simulación digital previa.",
        image: "/images/treatments/smile-design-veneers.jpg",
        skeletonDescription:
            "Paciente sonriendo mostrando carillas estéticas de porcelana de alta luminosidad (600x400 px)",
        duration: "2 a 3 sesiones",
        warranty: "Porcelana E-Max",
        badge: "Estética Premium",
    },
    {
        id: 3,
        title: "Implantes Dentales Guiados",
        category: "implantes",
        specialtyName: "Implantes Dentales",
        description:
            "Recupera piezas perdidas con fijaciones de titanio biocompatible grado médico y coronas de circonio de aspecto 100% natural.",
        image: "/images/treatments/dental-implants.jpg",
        skeletonDescription:
            "Implante dental de titanio con corona estética en modelo didáctico (600x400 px)",
        duration: "Cirugía guiada en 1 cita",
        warranty: "Titanio Grado Médico",
        badge: "Cirugía Digital",
    },
    {
        id: 4,
        title: "Endodoncia Mecanizada",
        category: "salud",
        specialtyName: "Endodoncia",
        description:
            "Salva tu diente natural con tecnología rotatoria de máxima precisión. Tratamiento de conducto en una sola sesión indolora.",
        image: "/images/treatments/endodontics.jpg",
        skeletonDescription:
            "Microscopio operatorio odontológico y pieza rotatoria de endodoncia (600x400 px)",
        duration: "1 sesión (60 min)",
        warranty: "Microscopía Clínica",
        badge: "Sin Dolor",
    },
    {
        id: 5,
        title: "Profilaxis & Limpieza Ultrasónica",
        category: "salud",
        specialtyName: "Limpieza y Profilaxis",
        description:
            "Eliminación completa de sarro, placa bacteriana y manchas con tecnología de ultrasonido y pulido con aeropulidor de bicarbonato.",
        image: "/images/treatments/ultrasonic-cleaning.jpg",
        skeletonDescription:
            "Procedimiento de profilaxis dental ultrasónica con barrera de aislamiento (600x400 px)",
        duration: "45 minutos",
        warranty: "Prevención Total",
        badge: "Recomendado",
    },
    {
        id: 6,
        title: "Blanqueamiento Dental Láser LED",
        category: "estetica",
        specialtyName: "Diseño de Sonrisa",
        description:
            "Aclara hasta 4 tonos en una sola sesión en clínica sin dañar el esmalte ni provocar sensibilidad dental prolongada.",
        image: "/images/treatments/laser-whitening.jpg",
        skeletonDescription:
            "Lámpara de fotopolimerización LED azul para blanqueamiento dental en clínica (600x400 px)",
        duration: "1 sesión (50 min)",
        warranty: "Gel Neutro Seguro",
        badge: "Resultados Inmediatos",
    },
];

const filteredTreatments = computed(() => {
    if (activeCategory.value === "todos") {
        return treatments;
    }
    return treatments.filter((t) => t.category === activeCategory.value);
});

function bookTreatment(specialty: string) {
    emit("select-specialty", specialty);
    scrollToSection("agendar");
}
</script>

<template>
    <section
        id="tratamientos"
        class="py-20 bg-slate-50 dark:bg-slate-950 transition-colors"
    >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div
                class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
            >
                <div class="space-y-3">
                    <span
                        class="inline-flex items-center gap-1.5 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-widest bg-sky-50 dark:bg-sky-950/60 px-3.5 py-1.5 rounded-full border border-sky-100 dark:border-sky-900"
                    >
                        <Sparkles class="w-3.5 h-3.5" />
                        Catálogo Odontológico
                    </span>
                    <h2
                        class="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight"
                    >
                        Tratamientos Especializados
                    </h2>
                    <p
                        class="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-xl"
                    >
                        Soluciones integrales de salud y estética bucal
                        desarrolladas con tecnología médica de alta precisión.
                    </p>
                </div>

                <!-- Category Filters -->
                <div
                    class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2"
                >
                    <button
                        v-for="cat in categories"
                        :key="cat.id"
                        @click="activeCategory = cat.id"
                        class="px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap"
                        :class="[
                            activeCategory === cat.id
                                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-sky-400',
                        ]"
                    >
                        {{ cat.label }}
                    </button>
                </div>
            </div>

            <!-- Treatments Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                    v-for="item in filteredTreatments"
                    :key="item.id"
                    class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
                >
                    <!-- Image Container with Skeleton -->
                    <div class="h-48 overflow-hidden relative">
                        <ImageSkeleton
                            :src="item.image"
                            :alt="item.title"
                            :skeleton-description="item.skeletonDescription"
                            class-name="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div
                            class="absolute top-3 right-3 bg-slate-900/80 dark:bg-black/80 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full border border-white/20"
                        >
                            {{ item.badge }}
                        </div>
                    </div>

                    <!-- Card Body -->
                    <div
                        class="p-6 flex flex-col justify-between flex-grow space-y-4"
                    >
                        <div>
                            <h3
                                class="font-black text-slate-900 dark:text-white text-lg mb-2"
                            >
                                {{ item.title }}
                            </h3>
                            <p
                                class="text-slate-500 dark:text-slate-400 text-xs leading-relaxed"
                            >
                                {{ item.description }}
                            </p>
                        </div>

                        <!-- Features Pills -->
                        <div
                            class="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400"
                        >
                            <div class="flex items-center justify-between">
                                <span class="flex items-center gap-1.5">
                                    <Clock class="w-3.5 h-3.5 text-sky-500" />
                                    {{ item.duration }}
                                </span>
                                <span
                                    class="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400"
                                >
                                    <ShieldCheck class="w-3.5 h-3.5" />
                                    {{ item.warranty }}
                                </span>
                            </div>

                            <button
                                @click="bookTreatment(item.specialtyName)"
                                class="w-full py-3 bg-sky-50 dark:bg-slate-800 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 text-sky-600 dark:text-sky-400 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                            >
                                <span>Agendar este Tratamiento</span>
                                <ArrowRight class="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
