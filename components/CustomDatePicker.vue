<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X, Sparkles } from "@lucide/vue";

interface Props {
    modelValue: string; // Format: 'YYYY-MM-DD'
    placeholder?: string;
    hasError?: boolean;
}

interface Emits {
    (e: "update:modelValue", value: string): void;
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: "Selecciona una fecha...",
    hasError: false,
});

const emit = defineEmits<Emits>();

const isOpen = ref(false);
const containerRef = ref<HTMLElement | null>(null);

// Parse or initialize viewing date
const today = new Date();
today.setHours(0, 0, 0, 0);

const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());

// Sync month/year when modelValue changes
watch(
    () => props.modelValue,
    (val) => {
        if (val) {
            const [y, m] = val.split("-").map(Number);
            if (y && m) {
                currentYear.value = y;
                currentMonth.value = m - 1;
            }
        }
    },
    { immediate: true },
);

const monthsNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const daysOfWeek = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];

const formattedViewingMonth = computed(() => {
    return `${monthsNames[currentMonth.value]} ${currentYear.value}`;
});

// Generate days grid for current viewing month
interface DayCell {
    dateStr: string;
    dayNumber: number;
    isCurrentMonth: boolean;
    isPast: boolean;
    isToday: boolean;
    isSelected: boolean;
    isSunday: boolean;
}

const calendarDays = computed<DayCell[]>(() => {
    const year = currentYear.value;
    const month = currentMonth.value;

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Convert Sunday (0) to 7 so Monday is 1
    let startDayOfWeek = firstDayOfMonth.getDay();
    if (startDayOfWeek === 0) startDayOfWeek = 7;

    const days: DayCell[] = [];

    // Days from previous month to fill the first row
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i > 0; i--) {
        const d = new Date(year, month - 1, prevMonthLastDay - i + 1);
        d.setHours(0, 0, 0, 0);
        const dateStr = d.toISOString().split("T")[0];
        days.push({
            dateStr,
            dayNumber: prevMonthLastDay - i + 1,
            isCurrentMonth: false,
            isPast: d.getTime() < today.getTime(),
            isToday: d.getTime() === today.getTime(),
            isSelected: dateStr === props.modelValue,
            isSunday: d.getDay() === 0,
        });
    }

    // Days of current month
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
        const d = new Date(year, month, day);
        d.setHours(0, 0, 0, 0);
        const dateStr = d.toISOString().split("T")[0];
        days.push({
            dateStr,
            dayNumber: day,
            isCurrentMonth: true,
            isPast: d.getTime() < today.getTime(),
            isToday: d.getTime() === today.getTime(),
            isSelected: dateStr === props.modelValue,
            isSunday: d.getDay() === 0,
        });
    }

    // Days from next month to complete the grid (multiples of 7)
    const remaining = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
        const d = new Date(year, month + 1, i);
        d.setHours(0, 0, 0, 0);
        const dateStr = d.toISOString().split("T")[0];
        days.push({
            dateStr,
            dayNumber: i,
            isCurrentMonth: false,
            isPast: d.getTime() < today.getTime(),
            isToday: d.getTime() === today.getTime(),
            isSelected: dateStr === props.modelValue,
            isSunday: d.getDay() === 0,
        });
    }

    return days;
});

// Human friendly date format for trigger button
const displaySelectedDate = computed(() => {
    if (!props.modelValue) return "";
    const [y, m, d] = props.modelValue.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    dateObj.setHours(0, 0, 0, 0);

    const isToday = dateObj.getTime() === today.getTime();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const isTomorrow = dateObj.getTime() === tomorrow.getTime();

    const weekdayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const weekday = weekdayNames[dateObj.getDay()];
    const month = monthsNames[dateObj.getMonth()];

    if (isToday) return `Hoy (${d} de ${month})`;
    if (isTomorrow) return `Mañana (${d} de ${month})`;

    return `${weekday}, ${d} de ${month} de ${y}`;
});

function prevMonth() {
    if (currentMonth.value === 0) {
        currentMonth.value = 11;
        currentYear.value--;
    } else {
        currentMonth.value--;
    }
}

function nextMonth() {
    if (currentMonth.value === 11) {
        currentMonth.value = 0;
        currentYear.value++;
    } else {
        currentMonth.value++;
    }
}

function selectDate(cell: DayCell) {
    if (cell.isPast) return;
    emit("update:modelValue", cell.dateStr);
    isOpen.value = false;
}

function clearDate(e?: Event) {
    if (e) e.stopPropagation();
    emit("update:modelValue", "");
}

function selectQuickDays(daysOffset: number) {
    const d = new Date(today);
    d.setDate(d.getDate() + daysOffset);
    emit("update:modelValue", d.toISOString().split("T")[0]);
    isOpen.value = false;
}

function toggleCalendar() {
    isOpen.value = !isOpen.value;
}

function handleClickOutside(event: MouseEvent) {
    if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
        isOpen.value = false;
    }
}

function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
        isOpen.value = false;
    }
}

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
    document.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
    <div ref="containerRef" class="relative w-full select-none">
        <!-- Trigger Button Styled like Shadcn Popover Trigger -->
        <button
            type="button"
            @click="toggleCalendar"
            class="w-full pl-10 pr-9 py-3 bg-slate-50 dark:bg-slate-950 border rounded-xl text-left text-xs transition flex items-center justify-between cursor-pointer outline-none focus:ring-2"
            :class="[
                isOpen
                    ? 'border-sky-500 ring-2 ring-sky-500/20 bg-white dark:bg-slate-900 shadow-sm'
                    : hasError
                        ? 'border-red-400 focus:ring-red-400'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 focus:ring-sky-500 focus:bg-white dark:focus:bg-slate-900',
            ]"
            :aria-expanded="isOpen"
        >
            <!-- Left Calendar Icon -->
            <span
                class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-sky-500"
            >
                <CalendarIcon class="w-4 h-4" />
            </span>

            <!-- Formatted Date Label -->
            <div class="truncate pr-2">
                <span
                    v-if="modelValue"
                    class="font-bold text-slate-900 dark:text-white block truncate"
                >
                    {{ displaySelectedDate }}
                </span>
                <span v-else class="text-slate-400 font-normal">
                    {{ placeholder }}
                </span>
            </div>

            <!-- Clear Action or Calendar Indicator -->
            <button
                v-if="modelValue"
                type="button"
                @click="clearDate"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                title="Quitar fecha"
            >
                <X class="w-3.5 h-3.5" />
            </button>
            <span
                v-else
                class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400"
            >
                <CalendarIcon class="w-3.5 h-3.5" />
            </span>
        </button>

        <!-- Floating Modern Calendar Popover (Shadcn style) -->
        <transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="transform scale-95 opacity-0 -translate-y-1"
            enter-to-class="transform scale-100 opacity-100 translate-y-0"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="transform scale-100 opacity-100 translate-y-0"
            leave-to-class="transform scale-95 opacity-0 -translate-y-1"
        >
            <div
                v-if="isOpen"
                class="absolute left-0 sm:left-auto right-0 sm:right-auto z-50 mt-1.5 w-72 sm:w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-4 backdrop-blur-md"
            >
                <!-- Quick Date Selection Badges -->
                <div class="flex items-center gap-1.5 pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
                    <button
                        type="button"
                        @click="selectQuickDays(0)"
                        class="flex-1 py-1 px-2 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-sky-700 dark:bg-slate-800 dark:hover:bg-sky-950/60 dark:text-slate-300 dark:hover:text-sky-300 transition text-center"
                    >
                        Hoy
                    </button>
                    <button
                        type="button"
                        @click="selectQuickDays(1)"
                        class="flex-1 py-1 px-2 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-sky-700 dark:bg-slate-800 dark:hover:bg-sky-950/60 dark:text-slate-300 dark:hover:text-sky-300 transition text-center"
                    >
                        Mañana
                    </button>
                    <button
                        type="button"
                        @click="selectQuickDays(3)"
                        class="flex-1 py-1 px-2 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-sky-700 dark:bg-slate-800 dark:hover:bg-sky-950/60 dark:text-slate-300 dark:hover:text-sky-300 transition text-center"
                    >
                        En 3 días
                    </button>
                </div>

                <!-- Calendar Month Header & Navigation -->
                <div class="flex items-center justify-between mb-3 px-1">
                    <button
                        type="button"
                        @click="prevMonth"
                        class="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
                        title="Mes anterior"
                    >
                        <ChevronLeft class="w-4 h-4" />
                    </button>

                    <h4 class="text-xs font-bold text-slate-900 dark:text-white capitalize tracking-tight">
                        {{ formattedViewingMonth }}
                    </h4>

                    <button
                        type="button"
                        @click="nextMonth"
                        class="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
                        title="Mes siguiente"
                    >
                        <ChevronRight class="w-4 h-4" />
                    </button>
                </div>

                <!-- Weekday Headers -->
                <div class="grid grid-cols-7 gap-1 text-center mb-1">
                    <span
                        v-for="d in daysOfWeek"
                        :key="d"
                        class="text-[10px] font-bold text-slate-400 uppercase py-1"
                    >
                        {{ d }}
                    </span>
                </div>

                <!-- Days Matrix -->
                <div class="grid grid-cols-7 gap-1">
                    <button
                        v-for="cell in calendarDays"
                        :key="cell.dateStr"
                        type="button"
                        :disabled="cell.isPast"
                        @click="selectDate(cell)"
                        class="h-8 rounded-xl text-xs font-medium flex items-center justify-center transition relative cursor-pointer"
                        :class="[
                            cell.isSelected
                                ? 'bg-sky-500 text-white font-extrabold shadow-md shadow-sky-500/30 ring-1 ring-sky-400'
                                : cell.isPast
                                    ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-40'
                                    : cell.isCurrentMonth
                                        ? 'text-slate-800 dark:text-slate-200 hover:bg-sky-100 dark:hover:bg-sky-950/60 hover:text-sky-600'
                                        : 'text-slate-400 dark:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800',
                        ]"
                    >
                        <span>{{ cell.dayNumber }}</span>

                        <!-- Today Dot Indicator -->
                        <span
                            v-if="cell.isToday && !cell.isSelected"
                            class="absolute bottom-1 w-1 h-1 rounded-full bg-sky-500"
                        />
                    </button>
                </div>

                <!-- Footer Hint -->
                <div class="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                    <span class="flex items-center gap-1">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Disponibilidad inmediata
                    </span>
                    <button
                        v-if="modelValue"
                        type="button"
                        @click="clearDate"
                        class="text-sky-500 hover:underline font-semibold"
                    >
                        Borrar
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>
