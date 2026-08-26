<script setup lang="ts">
import { ref } from 'vue'
import LandingNavbar from './components/LandingNavbar.vue'
import HeroSection from './components/HeroSection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import TreatmentsSection from './components/TreatmentsSection.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import FaqSection from './components/FaqSection.vue'
import BranchesSection from './components/BranchesSection.vue'
import AppointmentForm from './components/AppointmentForm.vue'
import FloatingCtas from './components/FloatingCtas.vue'
import LandingFooter from './components/LandingFooter.vue'

const preselectedSpecialty = ref('Valoración Inicial Completa')

function handleSpecialtySelection(specialty: string) {
  preselectedSpecialty.value = specialty
}

// SEO & Schema.org Structured Data
useHead({
  title: 'Clínica Dental | Especialistas en Odontología Digital 3D',
  meta: [
    { name: 'description', content: 'Centro odontológico de alta precisión. Ortodoncia invisible 3D, implantes dentales guiados, diseño de sonrisa y atención sin dolor. Reserva tu cita online.' },
    { property: 'og:title', content: 'Clínica Dental | Especialistas en Odontología Digital 3D' },
    { property: 'og:description', content: 'Diseño de sonrisa computarizado, implantes guiados y atención odontológica con especialistas certificados.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Dentist',
        name: 'Clínica Dental Especializada',
        description: 'Centro odontológico con tecnología 3D, ortodoncia invisible e implantología oral.',
        telephone: '+51-987-654-321',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Av. Javier Prado Este 2450',
          addressLocality: 'San Isidro',
          addressRegion: 'Lima',
          addressCountry: 'PE',
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '20:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday'],
            opens: '08:30',
            closes: '18:00',
          },
        ],
        priceRange: '$$',
      }),
    },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 selection:bg-sky-500 selection:text-white transition-colors duration-300">
    <LandingNavbar />
    
    <main>
      <HeroSection />
      <FeaturesSection />
      <TreatmentsSection @select-specialty="handleSpecialtySelection" />
      <TestimonialsSection />
      <FaqSection />
      <BranchesSection />
      <AppointmentForm :preselected-specialty="preselectedSpecialty" />
    </main>

    <FloatingCtas />
    <LandingFooter />
  </div>
</template>
