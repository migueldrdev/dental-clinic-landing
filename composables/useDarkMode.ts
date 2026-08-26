import { ref, onMounted } from 'vue'

const isDark = ref(false)

export function useDarkMode() {
  function toggleDarkMode() {
    isDark.value = !isDark.value
    if (import.meta.client) {
      if (isDark.value) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    }
  }

  function initTheme() {
    if (import.meta.client) {
      const savedTheme = localStorage.getItem('theme')
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

      if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
        isDark.value = true
        document.documentElement.classList.add('dark')
      } else {
        isDark.value = false
        document.documentElement.classList.remove('dark')
      }
    }
  }

  onMounted(() => {
    initTheme()
  })

  return {
    isDark,
    toggleDarkMode,
    initTheme,
  }
}
