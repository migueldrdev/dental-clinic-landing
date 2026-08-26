<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  src: string
  alt: string
  width?: string | number
  height?: string | number
  className?: string
  skeletonDescription?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '100%',
  className: 'w-full h-full object-cover',
  skeletonDescription: 'Imagen de procedimiento odontológico',
})

const isLoaded = ref(false)
const hasError = ref(false)

function onImageLoad() {
  isLoaded.value = true
}

function onImageError() {
  hasError.value = true
  isLoaded.value = true
}
</script>

<template>
  <div class="relative overflow-hidden bg-slate-200 dark:bg-slate-800 rounded-2xl w-full h-full min-h-[160px] flex items-center justify-center">
    <!-- Skeleton loader placeholder animation -->
    <div
      v-if="!isLoaded"
      class="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-pulse flex flex-col items-center justify-center p-4 text-center"
    >
      <div class="w-8 h-8 rounded-full bg-sky-500/20 text-sky-500 flex items-center justify-center mb-2 animate-bounce">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.5 2C5.5 2 3 4.5 3 7.5C3 11 5 14 7 17.5C7.8 19 8.5 21.5 9.5 22C10.5 22.5 11 20.5 11.5 18.5C11.8 17 12.2 17 12.5 18.5C13 20.5 13.5 22.5 14.5 22C15.5 21.5 16.2 19 17 17.5C19 14 21 11 21 7.5C21 4.5 18.5 2 15.5 2C13.8 2 12.6 3 12 3.8C11.4 3 10.2 2 8.5 2Z" />
        </svg>
      </div>
      <span class="text-[11px] font-medium text-slate-400 dark:text-slate-500 line-clamp-2">
        {{ skeletonDescription }}
      </span>
    </div>

    <!-- Actual Image -->
    <img
      v-if="!hasError"
      :src="src"
      :alt="alt"
      :class="[className, isLoaded ? 'opacity-100' : 'opacity-0', 'transition-opacity duration-500']"
      loading="lazy"
      decoding="async"
      @load="onImageLoad"
      @error="onImageError"
    />

    <!-- Fallback Graphic if Image is Blocked / Offline -->
    <div
      v-else
      class="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex flex-col items-center justify-center p-4 text-center"
    >
      <div class="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-md mb-2">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.5 2C5.5 2 3 4.5 3 7.5C3 11 5 14 7 17.5C7.8 19 8.5 21.5 9.5 22C10.5 22.5 11 20.5 11.5 18.5C11.8 17 12.2 17 12.5 18.5C13 20.5 13.5 22.5 14.5 22C15.5 21.5 16.2 19 17 17.5C19 14 21 11 21 7.5C21 4.5 18.5 2 15.5 2C13.8 2 12.6 3 12 3.8C11.4 3 10.2 2 8.5 2Z" />
        </svg>
      </div>
      <p class="text-xs font-bold text-slate-700 dark:text-slate-200">{{ alt }}</p>
      <p class="text-[10px] text-slate-400 mt-0.5">{{ skeletonDescription }}</p>
    </div>
  </div>
</template>
