export function useSmoothScroll() {
  function scrollToSection(sectionId: string) {
    if (import.meta.client) {
      const element = document.getElementById(sectionId.replace('#', ''))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.history.replaceState(null, '', `#${sectionId.replace('#', '')}`)
      }
    }
  }

  return {
    scrollToSection,
  }
}
