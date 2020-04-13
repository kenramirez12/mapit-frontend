<template>
  <div>
    <AppHero :translations="translations" />
    <main class="flex flex-col">
      <div class="container mx-auto pt-8 inline-block">
        <div class="w-full flex items-center mb-4 md:mb-8 mt-6 pl-2 md:pl-0">
          <div class="pr-6 md:pr-0">
            <h3 class="text-4xl font-light mb-6">{{ $lang.translate(translations, 'experiences') }}</h3>
            <p class="mb-0">{{ $lang.translate(translations, 'experiences_label') }}</p>
          </div>
          <div class="hidden md:flex ml-auto">
            <el-button @click="expSliderPrev += 1" circle plain type="primary" icon="el-icon-back" class="flex"></el-button>
            <el-button @click="expSliderNext += 1" circle plain type="primary" icon="el-icon-right" class="flex"></el-button>
          </div>
        </div>
      </div>
      <div class="sliders-container">
        <ExperiencesSlider :prev="expSliderPrev" :next="expSliderNext" />
      </div>
      <div class="container mx-auto pt-8 inline-block">
        <div class="w-full flex items-center mb-4 md:mb-8 mt-6 pl-2 md:pl-0">
          <div class="pr-6 md:pr-0">
            <h3 class="text-4xl font-light mb-4">{{ $lang.translate(translations, 'destinations') }}</h3>
            <p class="mb-0">{{ $lang.translate(translations, 'destinations_label') }}</p>
          </div>
          <div class="hidden md:flex ml-auto">
            <el-button @click="destSliderPrev += 1" circle plain type="primary" icon="el-icon-back" class="flex"></el-button>
            <el-button @click="destSliderNext += 1" circle plain type="primary" icon="el-icon-right" class="flex"></el-button>
          </div>
        </div>
      </div>
      <div class="sliders-container">
        <DestinationsSlider :prev="destSliderPrev" :next="destSliderNext" />
      </div>
      <WhySection :translations="translations" />

      <TrustedBySlider :translations="translations" />

      <div class="container mx-auto py-6 my-6 px-4">
        <div class="ml-auto py-6 my-6 md:w-11/12 lg:w-3/4">
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
      yourNumber: '',
      expSliderNext: 0,
      expSliderPrev: 0,
      destSliderNext: 0,
      destSliderPrev: 0,
      translations: {
        'es_ES': {
          hero_title: 'Descubre el Perú como un local',
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
          hero_title: 'Experience it, live it',
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
  },

  // mounted() {
  //   const whySection = document.getElementById('why-us')

  //   window.addEventListener('scroll', () => {
  //     const currentScrollTop = document.documentElement.scrollTop
  //     const whySectionInit = whySection.offsetTop
  //     const whySectionEnd = whySectionInit + whySection.clientHeight 
  //     const currentWindowHeight = document.documentElement.clientHeight
  //     this.getBgColor(whySectionInit, whySectionEnd, currentWindowHeight, currentScrollTop)

  //     // if(currentScrollTop >= whySectionEnd) {
  //       // document.body.style.backgroundColor = `rgba(${primary[0]}, ${primary[1]}, ${primary[2]})`
  //       // console.log('ya deberia empezar a cambiarse')
  //     // } else if(currentScrollTop >= (whySectionInit - currentWindowHeight/2)) {
  //       // document.body.style.backgroundColor = 'rgba(255, 255 ,255)'
  //       // console.log('se deberia haber pintado media pantalla atras')
  //     // }
  //   })
  // },

  // methods: {
  //   getBgColor (init, end, windowHeight, scrollPosition) {
  //     const windowPosStart = windowHeight / 2
  //     const changeInitStart = init - windowPosStart
  //     const changeInitEnd = init
  //     const changeEndStart = end
  //     const changeEndEnd = end - windowPosStart

  //     if(scrollPosition >= changeInitStart && scrollPosition <= changeEndEnd) {
  //       document.body.classList.add('primary')
  //       // return document.body.style.backgroundColor = 'rgba(55, 215, 215)'
  //     } else {
  //       document.body.classList.remove('primary')
  //       // return document.body.style.backgroundColor = 'rgba(255, 255, 255)'
  //     }

  //     // if(scrollPosition < changeInitStart || scrollPosition > changeEndEnd) {
  //     //   console.log('primera validacion')
  //     //   return document.body.style.backgroundColor = 'rgba(255, 255, 255)'
  //     // }

  //     // const white = { r: 255, g: 255, b: 255 }
  //     // const primary = { r: 55, g: 215, b: 215 }

  //     // const valuePerPixel = {
  //     //   r: (white.r - primary.r) / windowPosStart,
  //     //   g: (white.g - primary.g) / windowPosStart,
  //     //   b: (white.b - primary.b) / windowPosStart
  //     // }

  //     // if(scrollPosition > changeInitStart) {
  //     //   const difference = scrollPosition - changeInitStart
  //     //   if(difference >= windowPosStart) return
  //     //   // console.log('entramos difference', difference)
  //     //   document.body.style.backgroundColor = `
  //     //     rgba(
  //     //       ${white.r - (valuePerPixel.r * difference)},
  //     //       ${white.g - (valuePerPixel.g * difference)},
  //     //       ${white.b - (valuePerPixel.b * difference)})
  //     //     `
  //     // }
  //   }
  // }
}
</script>
