<script setup lang="ts">
import { ref } from "vue";
import { Star, Sparkles, ChevronLeft, ChevronRight } from "@lucide/vue";
import ImageSkeleton from "./ImageSkeleton.vue";

const scrollContainer = ref<HTMLElement | null>(null);

const cases = [
    {
        id: 1,
        patientName: "María Delgado",
        treatment: "Diseño de Sonrisa & Carillas",
        rating: 5,
        quote: "El cambio ha sido increíble. Tenía miedo al dolor y fue una experiencia 100% tranquila. Las carillas quedaron súper naturales y mi confianza al hablar mejoró muchísimo.",
        beforeImage: "/images/testimonials/before-veneers.jpg",
        beforeSkeleton:
            "Dientes anteriores con desgaste y manchas previas al tratamiento (400x300 px)",
        afterImage: "/images/testimonials/after-veneers.jpg",
        afterSkeleton:
            "Sonrisa final alineada con carillas de porcelana de alta estética (400x300 px)",
        avatar: "/images/testimonials/avatar-maria.jpg",
    },
    {
        id: 2,
        patientName: "Carlos Mendoza",
        treatment: "Ortodoncia Invisible 3D",
        rating: 5,
        quote: "Los alineadores invisibles fueron la mejor decisión. Nadie notaba que los llevaba puestos en el trabajo y en solo 8 meses logré la mordida y alineación perfecta.",
        beforeImage: "/images/testimonials/before-ortho.jpg",
        beforeSkeleton:
            "Apiñamiento moderado en arcada superior e inferior (400x300 px)",
        afterImage: "/images/testimonials/after-ortho.jpg",
        afterSkeleton:
            "Arco dental perfectamente nivelado con férulas 3D (400x300 px)",
        avatar: "/images/testimonials/avatar-carlos.png",
    },
    {
        id: 3,
        patientName: "Andrea Ríos",
        treatment: "Implante Dental Guiado",
        rating: 5,
        quote: "Perder una pieza molar me causaba mucha inseguridad al comer. El implante guiado quedó idéntico a mis otros dientes naturales y la recuperación fue rapidísima.",
        beforeImage: "/images/testimonials/before-implants.jpg",
        beforeSkeleton:
            "Espacio edéntulo posterior antes de la colocación del implante (400x300 px)",
        afterImage: "/images/testimonials/after-implants.jpg",
        afterSkeleton:
            "Corona de circonio sobre implante integrada armónicamente (400x300 px)",
        avatar: "/images/testimonials/avatar-andrea.jpg",
    },
];

function scroll(direction: number) {
    if (scrollContainer.value) {
        const scrollAmount = 380 * direction;
        scrollContainer.value.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
        });
    }
}
</script>

<template>
    <section
        id="casos"
        class="py-20 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800 transition-colors"
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
                        Casos Clínicos Reales
                    </span>
                    <h2
                        class="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight"
                    >
                        Resultados que Transforman Vidas
                    </h2>
                    <p
                        class="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-xl"
                    >
                        Descubre las transformaciones logradas por nuestro
                        equipo médico con fotografías clínicas de antes y
                        después.
                    </p>
                </div>

                <!-- Carousel Buttons -->
                <div class="flex items-center gap-2">
                    <button
                        @click="scroll(-1)"
                        class="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 transition-colors flex items-center justify-center shadow-sm"
                        aria-label="Anterior testimonio"
                    >
                        <ChevronLeft class="w-4 h-4" />
                    </button>
                    <button
                        @click="scroll(1)"
                        class="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 transition-colors flex items-center justify-center shadow-sm"
                        aria-label="Siguiente testimonio"
                    >
                        <ChevronRight class="w-4 h-4" />
                    </button>
                </div>
            </div>

            <!-- Testimonial Cards Carousel -->
            <div
                ref="scrollContainer"
                class="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory py-2"
            >
                <div
                    v-for="item in cases"
                    :key="item.id"
                    class="snap-start shrink-0 w-[88vw] sm:w-[360px] md:w-[380px] bg-slate-50 dark:bg-slate-950 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
                >
                    <div class="space-y-4">
                        <!-- Before / After Visual Comparison -->
                        <div class="grid grid-cols-2 gap-2">
                            <!-- Before -->
                            <div
                                class="relative h-28 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
                            >
                                <ImageSkeleton
                                    :src="item.beforeImage"
                                    alt="Caso Clínico Antes"
                                    :skeleton-description="item.beforeSkeleton"
                                    class-name="w-full h-full object-cover grayscale opacity-80"
                                />
                                <span
                                    class="absolute top-1.5 left-1.5 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md"
                                >
                                    ANTES
                                </span>
                            </div>

                            <!-- After -->
                            <div
                                class="relative h-28 rounded-2xl overflow-hidden border border-sky-300 dark:border-sky-700"
                            >
                                <ImageSkeleton
                                    :src="item.afterImage"
                                    alt="Caso Clínico Después"
                                    :skeleton-description="item.afterSkeleton"
                                    class-name="w-full h-full object-cover"
                                />
                                <span
                                    class="absolute top-1.5 left-1.5 bg-sky-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm"
                                >
                                    DESPUÉS
                                </span>
                            </div>
                        </div>

                        <!-- Stars -->
                        <div class="flex items-center gap-1 text-amber-400">
                            <Star
                                v-for="n in item.rating"
                                :key="n"
                                class="w-4 h-4 fill-amber-400 text-amber-400"
                            />
                        </div>

                        <!-- Quote Text -->
                        <p
                            class="text-slate-600 dark:text-slate-300 text-xs leading-relaxed italic"
                        >
                            "{{ item.quote }}"
                        </p>
                    </div>

                    <!-- Patient Footer -->
                    <div
                        class="flex items-center gap-3 pt-4 mt-4 border-t border-slate-200/80 dark:border-slate-800"
                    >
                        <div
                            class="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700"
                        >
                            <img
                                :src="item.avatar"
                                :alt="item.patientName"
                                class="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h4
                                class="text-xs font-bold text-slate-900 dark:text-white"
                            >
                                {{ item.patientName }}
                            </h4>
                            <p
                                class="text-[10px] text-sky-600 dark:text-sky-400 font-semibold"
                            >
                                {{ item.treatment }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
