<template>
  <div>
    <AppHero />
    <main class="flex flex-col">
      <div class="container mx-auto pt-8 px-6 sm:px-4 inline-block">
        <div class="w-full flex items-center mb-4 md:mb-8 mt-6">
          <div class="pr-6">
            <h3 class="text-2xl md:text-4xl font-light mb-6 leading-tight">{{ $lang.translate(translations, 'online') }}</h3>
            <p class="text-sm md:text-base mb-0 font-light">{{ $lang.translate(translations, 'online_label') }}</p>
          </div>
          <div class="hidden md:flex ml-auto">
            <el-button @click="onlineSliderPrev += 1" circle plain type="primary" icon="el-icon-back" class="flex" />
            <el-button @click="onlineSliderNext += 1" circle plain type="primary" icon="el-icon-right" class="flex" />
          </div>
        </div>
      </div>
      <div>
        <ExperiencesSlider
          :prev="onlineSliderPrev"
          :next="onlineSliderNext"
          :experiences="onlineExperiences"
          :translations="experiencesTranslations" />
      </div>
      <div class="container mx-auto pt-8 px-6 sm:px-4 inline-block">
        <div class="w-full flex items-center mb-4 md:mb-8 mt-6">
          <div class="pr-6">
            <h3 class="text-2xl md:text-4xl font-light mb-6">{{ $lang.translate(translations, 'experiences') }}</h3>
            <p class="text-sm md:text-base mb-0 font-light">{{ $lang.translate(translations, 'experiences_label') }}</p>
          </div>
          <div class="hidden md:flex ml-auto">
            <el-button @click="expSliderPrev += 1" circle plain type="primary" icon="el-icon-back" class="flex" />
            <el-button @click="expSliderNext += 1" circle plain type="primary" icon="el-icon-right" class="flex" />
          </div>
        </div>
      </div>
      <div>
        <ExperiencesSlider
          :prev="expSliderPrev"
          :next="expSliderNext"
          :experiences="lastExperiences"
          :translations="experiencesTranslations" />
      </div>
      <div class="container mx-auto pt-8 px-6 sm:px-4 inline-block">
        <div class="w-full flex items-center mb-4 md:mb-8 mt-6">
          <div class="pr-6">
            <h3 class="text-2xl md:text-4xl font-light mb-4">{{ $lang.translate(translations, 'destinations') }}</h3>
            <p class="text-sm md:text-base mb-0 font-light">{{ $lang.translate(translations, 'destinations_label') }}</p>
          </div>
          <div class="hidden md:flex ml-auto">
            <el-button @click="destSliderPrev += 1" circle plain type="primary" icon="el-icon-back" class="flex" />
            <el-button @click="destSliderNext += 1" circle plain type="primary" icon="el-icon-right" class="flex" />
          </div>
        </div>
      </div>
      <div class="container-left-margin">
        <DestinationsSlider :prev="destSliderPrev" :next="destSliderNext" />
      </div>
      <WhySection :translations="translations" />

      <TrustedBySlider :translations="translations" />

      <div
        v-if="testimonials && testimonials.length > 0"
        class="overflow-hidden">
        <div class="container mx-auto py-6 my-6 px-5 md:px-4">
          <div class="ml-auto py-6 my-6 w-full lg:w-10/12 xl:w-3/4">
            <TestimonialsSlider :testimonials="testimonials" />
          </div>
        </div>
      </div>

      <StartExploreSection :translations="translations" />
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AppHero from '~/components/home/AppHero'
import ExperiencesSlider from '~/components/home/ExperiencesSlider'
import DestinationsSlider from '~/components/home/DestinationsSlider'
import WhySection from '~/components/home/WhySection'
import TrustedBySlider from '~/components/home/TrustedBySlider'
import TestimonialsSlider from '~/components/home/TestimonialsSlider'
import StartExploreSection from '~/components/home/StartExploreSection'

export default {
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
      onlineId: process.env.onlineId,
      onlineExperiences: null,
      lastExperiences: null,
      testimonials: null,
      experiencesTranslations: {
        es_ES: {
          noResultsCopy: 'No encontramos lo que buscas'
        },
        en_EN: {
          noResultsCopy: 'We couldn’t find what you’re searching for'
        }
      },
      yourNumber: '',
      onlineSliderNext: 0,
      onlineSliderPrev: 0,
      expSliderNext: 0,
      expSliderPrev: 0,
      destSliderNext: 0,
      destSliderPrev: 0,
      translations: {
        'es_ES': {
          hero_title: 'Descubre el Perú como un local',
          search: 'Buscar',
          online: 'Experiencias online',
          online_label: 'Aunque hoy estemos separados, ¡podemos seguir conectados! Reserva y disfruta una de nuestras auténticas experiencias en línea con una persona local, desde la comodidad de tu hogar.',
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
          start_explore: 'Comienza a explorar'
        },
        'en_EN': {
          hero_title: 'Experience it, live it',
          search: 'Search',
          online: 'Online experiences',
          online_label: 'Although today we might be apart, we want to stay connected! Take one of our one of a kind online experiences with a local from Peru from the comfort of your home.',
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
          start_explore: 'Go to experiences'
        }
      }
    }
  },

  computed: {
    lang () {
      return this.$lang.current().iso_lang
    }
  },

  mounted () {
    this.getFeaturedTestimonials()
    this.getOnlineExperiences()
    this.getLatestExperiences()
  },

  methods: {
    ...mapActions({
      getExperiences: 'experiences/getExperiences'
    }),
    async getOnlineExperiences() {
      try {
        const onlineResp = await this.getExperiences({
          category_id: this.onlineId,
          per_page: 10
        })
        this.onlineExperiences = onlineResp ? onlineResp.data : []
      } catch (error) {
        this.$log.error('getOnlineExperiences', error.response)
      }
    },
    async getLatestExperiences() {
      try {
        const expResp = await this.getExperiences({
          category_not_in: this.onlineId,
          per_page: 10
        })
        this.lastExperiences = expResp ? expResp.data : []
      } catch (error) {
        this.$log.error('getFeaturedTestimonials', error.response)
      }
    },
    async getFeaturedTestimonials() {
      try {
        const resp = await this.$axios.get('/testimonials/featured')
        this.testimonials = resp.data.testimonials
      } catch (error) {
        this.$log.error('getFeaturedTestimonials', error.response)
      }
    }
  }
}
</script>
