<script setup lang="ts">
import {
    CalendarCheck,
    PhoneCall,
    Sparkles,
    Award,
    ShieldCheck,
    CheckCircle2,
} from "@lucide/vue";
import { useSmoothScroll } from "../composables/useSmoothScroll";
import ImageSkeleton from "./ImageSkeleton.vue";

const { scrollToSection } = useSmoothScroll();
</script>

<template>
    <section
        id="inicio"
        class="relative bg-slate-950 text-white overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32"
    >
        <!-- Ambient Glow Effects -->
        <div
            class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-500/15 dark:bg-sky-500/20 rounded-full blur-3xl pointer-events-none"
        />
        <div
            class="absolute bottom-10 right-10 w-[350px] h-[350px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none"
        />

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <!-- Left Hero Content (7 cols) -->
                <div class="lg:col-span-7 space-y-6">
                    <!-- Badge -->
                    <div
                        class="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-400/30 text-sky-300 px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md"
                    >
                        <Sparkles class="w-3.5 h-3.5 text-sky-400" />
                        Odontología Estética & Digital 3D
                    </div>

                    <!-- Main Headline -->
                    <h1
                        class="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white"
                    >
                        Tu Sonrisa Ideal con <br class="hidden sm:inline" />
                        <span
                            class="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-cyan-400"
                        >
                            Tecnología Sin Dolor
                        </span>
                    </h1>

                    <!-- Subtitle -->
                    <p
                        class="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-normal"
                    >
                        Diagnósticos computarizados en alta definición,
                        especialistas colegiados COP y tratamientos
                        personalizados diseñados para devolverte la seguridad al
                        sonreír.
                    </p>

                    <!-- Dual CTAs -->
                    <div
                        class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
                    >
                        <button
                            @click="scrollToSection('agendar')"
                            class="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-extrabold px-8 py-4 rounded-2xl transition-all shadow-xl shadow-sky-500/30 flex items-center justify-center gap-2 text-sm hover:scale-[1.02]"
                        >
                            <CalendarCheck class="w-4 h-4" />
                            Agendar Evaluación Inicial
                        </button>
                        <button
                            @click="scrollToSection('tratamientos')"
                            class="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-4 rounded-2xl transition-colors border border-white/15 backdrop-blur-md flex items-center justify-center gap-2 text-sm"
                        >
                            Ver Tratamientos
                        </button>
                    </div>

                    <!-- Trust Badges & Metrics Grid -->
                    <div
                        class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 mt-6 border-t border-slate-800/80"
                    >
                        <div>
                            <p
                                class="text-2xl sm:text-3xl font-black text-white"
                            >
                                +5,000
                            </p>
                            <p class="text-[11px] text-slate-400 font-medium">
                                Pacientes Atendidos
                            </p>
                        </div>
                        <div>
                            <p
                                class="text-2xl sm:text-3xl font-black text-sky-400"
                            >
                                99.4%
                            </p>
                            <p class="text-[11px] text-slate-400 font-medium">
                                Satisfacción Clínica
                            </p>
                        </div>
                        <div>
                            <p
                                class="text-2xl sm:text-3xl font-black text-white"
                            >
                                15+
                            </p>
                            <p class="text-[11px] text-slate-400 font-medium">
                                Años de Trayectoria
                            </p>
                        </div>
                        <div>
                            <p
                                class="text-2xl sm:text-3xl font-black text-teal-400"
                            >
                                100%
                            </p>
                            <p class="text-[11px] text-slate-400 font-medium">
                                Protocolo Digital
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Right Hero Visual Card (5 cols) -->
                <div class="lg:col-span-5 relative">
                    <div
                        class="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900/90 backdrop-blur-xl p-3 sm:p-4"
                    >
                        <!-- Hero Clinic Image -->
                        <div
                            class="h-64 sm:h-80 rounded-2xl overflow-hidden relative"
                        >
                            <ImageSkeleton
                                src="/images/hero/clinic-3d-office.jpg"
                                alt="Consultorio odontológico moderno con equipamiento 3D"
                                skeleton-description="Consultorio digital con sillón ergonómico y escáner intraoral 3D (800x600 px)"
                                class-name="w-full h-full object-cover"
                            />
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"
                            />

                            <!-- Floating Doctor Verification Tag -->
                            <div
                                class="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-xl border border-white/10 flex items-center justify-between"
                            >
                                <div class="flex items-center gap-3">
                                    <div
                                        class="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-md"
                                    >
                                        <Award class="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4
                                            class="text-xs font-bold text-white"
                                        >
                                            Centro Odontológico Certificado
                                        </h4>
                                        <p
                                            class="text-[10px] text-sky-400 font-semibold"
                                        >
                                            Registro Sanitario & Auditoría MINSA
                                        </p>
                                    </div>
                                </div>
                                <CheckCircle2
                                    class="w-5 h-5 text-emerald-400 shrink-0"
                                />
                            </div>
                        </div>

                        <!-- Bullet Features below image -->
                        <div
                            class="mt-4 grid grid-cols-2 gap-2 text-[11px] text-slate-300"
                        >
                            <div
                                class="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center gap-2"
                            >
                                <span
                                    class="w-2 h-2 rounded-full bg-sky-400 shrink-0"
                                />
                                <span class="truncate"
                                    >Alineadores Invisibles 3D</span
                                >
                            </div>
                            <div
                                class="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center gap-2"
                            >
                                <span
                                    class="w-2 h-2 rounded-full bg-teal-400 shrink-0"
                                />
                                <span class="truncate">Implantes Guiados</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
