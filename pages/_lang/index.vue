<template>
  <div>
    <AppHero :translations="translations" />
    <main>
      <div class="container mx-auto py-8 px-16 inline-block">
        <div class="w-full flex items-center mb-8 mt-6 ml-2">
          <div>
            <h3 class="text-4xl font-light mb-6">{{ $lang.translate(translations, 'experiences') }}</h3>
            <p class="mb-0">{{ $lang.translate(translations, 'experiences_label') }}</p>
          </div>
          <div class="flex ml-auto">
            <el-button @click="expSliderPrev += 1" circle plain type="primary" icon="el-icon-back" class="flex"></el-button>
            <el-button @click="expSliderNext += 1" circle plain type="primary" icon="el-icon-right" class="flex"></el-button>
          </div>
        </div> 
        <div class="w-100">
          <ExperiencesSlider :prev="expSliderPrev" :next="expSliderNext" />
        </div>
        <div class="w-full flex items-center mb-6 mt-12 ml-2">
          <div>
            <h3 class="text-4xl font-light mb-4">{{ $lang.translate(translations, 'destinations') }}</h3>
            <p class="mb-0">{{ $lang.translate(translations, 'destinations_label') }}</p>
          </div>
          <div class="flex ml-auto">
            <el-button @click="destSliderPrev += 1" circle plain type="primary" icon="el-icon-back" class="flex"></el-button>
            <el-button @click="destSliderNext += 1" circle plain type="primary" icon="el-icon-right" class="flex"></el-button>
          </div>
        </div>
        <div class="w-100">
          <DestinationsSlider :prev="destSliderPrev" :next="destSliderNext" />
        </div>
      </div>

      <WhySection :translations="translations" />

      <TrustedBySlider :translations="translations" />

      <div class="container mx-auto py-6 my-6 px-4">
        <div class="ml-auto py-6 my-6 w-3/4">
          <TestimonialsSlider />
        </div>
      </div>

      <StartExploreSection :translations="translations" />
    </main>
  </div>
</template>

<script>
import AppHero from '~/components/AppHero'
import ExperiencesSlider from '~/components/home/ExperiencesSlider'
import DestinationsSlider from '~/components/home/DestinationsSlider'
import WhySection from '~/components/home/WhySection'
import TrustedBySlider from '~/components/home/TrustedBySlider'
import TestimonialsSlider from '~/components/home/TestimonialsSlider'
import StartExploreSection from '~/components/home/StartExploreSection'

export default {
    head () {
    return {
      title: this.translations[this.lang].pageTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.translations[this.lang].pageDescription },
        { hid: 'og:description', name: 'og:description', content: this.translations[this.lang].pageDescription },
      ]
    }
  },
  components: {
    AppHero,
    ExperiencesSlider,
    DestinationsSlider,
    WhySection,
    TrustedBySlider,
    TestimonialsSlider,
    StartExploreSection
  },

  data() {
    return {
      expSliderNext: 0,
      expSliderPrev: 0,
      destSliderNext: 0,
      destSliderPrev: 0,
      translations: {
        'es_ES': {
          hero_title: 'Lorem ipsum dorem lorum',
          search: 'Buscar',
          experiences: 'Experiencias',
          experiences_label: 'Encuentra qué hacer en Perú: tours gastronómicos, talleres de arte, experiencias con comunidades, cosas para hacer de noche, y mucho más.',
          destinations: 'Destinos',
          destinations_label: 'Reserva experiencias auténticas en Cusco, Lima, Puno, Arequipa y más.',
          why_mapit: '¿Por qué MAP IT?',
          why_mapit_1: 'Experiencias únicas',
          why_mapit_2: 'Vive como un local',
          why_mapit_3: 'Impacto social',
          why_mapit_4: 'Experiencias seguras',
          trust_us: 'Confían en nosotros',
          start_explore: 'Comienza a explorar',
          pageTitle: 'MAP IT - Turismo sostenible en Perú',
          pageDescription: 'Encuentra qué hacer en Perú: tours gastronómicos, talleres de arte, experiencias con comunidades, cosas para hacer de noche, y mucho más.'
        },
        'en_EN': {
          hero_title: 'Lorem ipsum dorem lorum',
          search: 'Search',
          experiences: 'Experiences',
          experiences_label: 'Find things to do in Peru: food tours, art tours, experiences with local communities, what to do at night, and much more.',
          destinations: 'Destinations',
          destinations_label: 'Book authentic experiences in Cusco, Lima, Puno, Arequipa and beyond.',
          why_mapit: 'Why MAP IT?',
          why_mapit_1: 'Unique experiences',
          why_mapit_2: 'Connect with locals',
          why_mapit_3: 'Social impact',
          why_mapit_4: 'Safe experiences',
          trust_us: 'Trusted by',
          start_explore: 'Go to experiences',
          pageTitle: 'MAP IT - Responsible travel in Peru',
          pageDescription: 'Find things to do in Peru: food tours, art tours, experiences with local communities, what to do at night, and much more.'
        }
      }
    }
  },

  computed: {
    lang () {
      return this.$lang.current().iso_lang
    }
  }
}
</script>
