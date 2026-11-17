<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { ChevronDown, Check, Stethoscope } from "@lucide/vue";

interface Option {
    value: string;
    label: string;
    description?: string;
    badge?: string;
}

interface Props {
    modelValue: string;
    options: Option[];
    placeholder?: string;
    hasError?: boolean;
}

interface Emits {
    (e: "update:modelValue", value: string): void;
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: "Selecciona una opción...",
    hasError: false,
});

const emit = defineEmits<Emits>();

const isOpen = ref(false);
const containerRef = ref<HTMLElement | null>(null);

const selectedOption = computed(() => {
    return props.options.find((opt) => opt.value === props.modelValue);
});

function toggleDropdown() {
    isOpen.value = !isOpen.value;
}

function selectOption(option: Option) {
    emit("update:modelValue", option.value);
    isOpen.value = false;
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
        <!-- Custom Select Trigger (Shadcn style) -->
        <button
            type="button"
            @click="toggleDropdown"
            class="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-950 border rounded-xl text-left text-xs transition flex items-center justify-between cursor-pointer outline-none focus:ring-2"
            :class="[
                isOpen
                    ? 'border-sky-500 ring-2 ring-sky-500/20 bg-white dark:bg-slate-900 shadow-sm'
                    : hasError
                        ? 'border-red-400 focus:ring-red-400'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 focus:ring-sky-500 focus:bg-white dark:focus:bg-slate-900',
            ]"
            :aria-expanded="isOpen"
        >
            <!-- Left Icon -->
            <span
                class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-sky-500"
            >
                <Stethoscope class="w-4 h-4" />
            </span>

            <!-- Label & Subtitle -->
            <div class="truncate pr-2">
                <span
                    v-if="selectedOption"
                    class="font-bold text-slate-900 dark:text-white block truncate"
                >
                    {{ selectedOption.label }}
                </span>
                <span v-else class="text-slate-400">
                    {{ placeholder }}
                </span>
            </div>

            <!-- Right Chevron -->
            <span
                class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400 transition-transform duration-200"
                :class="{ 'rotate-180 text-sky-500': isOpen }"
            >
                <ChevronDown class="w-4 h-4" />
            </span>
        </button>

        <!-- Floating Popover Menu (Shadcn style with dark mode & smooth shadows) -->
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
                class="absolute left-0 right-0 z-50 mt-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-1.5 max-h-64 overflow-y-auto space-y-1 backdrop-blur-md"
            >
                <div
                    v-for="option in options"
                    :key="option.value"
                    @click="selectOption(option)"
                    class="p-2.5 rounded-xl cursor-pointer transition flex items-center justify-between text-xs group"
                    :class="[
                        option.value === modelValue
                            ? 'bg-sky-500/10 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 font-bold'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white',
                    ]"
                >
                    <div class="pr-3 min-w-0">
                        <div class="flex items-center gap-2">
                            <span class="block truncate font-semibold">
                                {{ option.label }}
                            </span>
                            <span
                                v-if="option.badge"
                                class="px-1.5 py-0.2 text-[9px] font-bold rounded-md uppercase tracking-wider bg-sky-100 dark:bg-sky-900/60 text-sky-600 dark:text-sky-300"
                            >
                                {{ option.badge }}
                            </span>
                        </div>
                        <p
                            v-if="option.description"
                            class="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 truncate group-hover:text-slate-500 dark:group-hover:text-slate-400 font-normal"
                        >
                            {{ option.description }}
                        </p>
                    </div>

                    <div class="shrink-0 pl-2">
                        <span
                            v-if="option.value === modelValue"
                            class="w-5 h-5 rounded-lg bg-sky-500 text-white flex items-center justify-center shadow-sm"
                        >
                            <Check class="w-3.5 h-3.5" />
                        </span>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
