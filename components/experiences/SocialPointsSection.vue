<template>
  <div id="social-points-section" class="experience-container pt-6 pb-super">
    <div class="container mx-auto px-6 md:px-4 md:px-0">
      <div class="activities py-6 position-relative">
        <h3 class="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-light mb-6 pb-6">
          {{ $lang.translate(pageTranslations, 'social_points') }}
        </h3>
        <div class="flex flex-wrap">
          <div class="w-full md:w-5/12 lg:pl-6 pb-6">
            <p class="mb-6 font-light text-sm md:text-base">{{ translations.social_impact }}</p>
          </div>
        </div>
        <div class="flex flex-wrap mt-6" style="position:relative">
          <img
            src="~/assets/images/sitting-05.svg"
            class="hidden md:block"
            style="position:absolute;top:0;left:-6rem;height:18rem">
          <div class="w-full pr-6 md:hidden">
            <img src="~/assets/images/brujula-icon.svg" class="mb-4" style="width:60px" alt="">
            <p class="mb-6">{{ $lang.translate(pageTranslations, 'social_copy') }}</p>
            <p class="text-2xl">{{ $lang.translate(pageTranslations, 'social_values') }}</p>
          </div>
          <div class="w-4/12 xl:w-3/12 pr-6 hidden md:block" style="margin-left:10rem">
            <img src="~/assets/images/brujula-icon.svg" class="mb-4" style="width:60px" alt="">
            <p class="mb-6 font-light">{{ $lang.translate(pageTranslations, 'social_copy') }}</p>
            <p class="text-2xl">{{ $lang.translate(pageTranslations, 'social_values') }}</p>
          </div>
          <div class="w-5/12 xl:w-4/12 ml-auto pl-4 xl:pl-0 xl:pr-6 hidden md:block">
            <p class="font-light">{{ $lang.translate(pageTranslations, 'social_copy_2') }}</p>
            <div class="flex justify-between mt-6 pt-6 pr-6">
              <img src="~/assets/images/social-three-icon.svg" alt="" style="width:70px">
              <img src="~/assets/images/social-book-icon.svg" alt="" style="width:70px">
              <img src="~/assets/images/social-house-icon.svg" alt="" style="width:70px">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full bg-primary md:hidden mt-12 pb-16">
      <div class="container mx-auto px-6">
        <img
          src="~/assets/images/sitting-05.svg"
          style="height:12rem;transform: translate(-30px, -30px)">
        <p class="mt-4 sm:mt-8 font-light">{{ $lang.translate(pageTranslations, 'social_copy_2') }}</p>
        <div class="flex justify-between mt-6 pt-6 pb-10 pr-6">
          <img src="~/assets/images/social-three-icon.svg" alt="" style="width:80px">
          <img src="~/assets/images/social-book-icon.svg" alt="" style="width:80px">
          <img src="~/assets/images/social-house-icon.svg" alt="" style="width:80px">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    experience: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      pageTranslations: {
        'es_ES': {
          social_points: 'Puntos Sociales',
          social_copy: 'Al reservar con nosotros, estás acumulando puntos sociales:',
          social_copy_2: 'Con tu aporte, podemos llevar a cabo proyectos sociales en comunidades a lo largo del país: Capacitaciones, mejora de infraestructuras, reforestación, programas de educación, y muchos más. Ayúdanos a hacerlos realidad, ¡sumáte a la causa!',
          social_values: '1USD = 1 Punto Social'
        },
        'en_EN': {
          social_points: 'Social Points',
          social_copy: 'For every experience you book with us, you are earning social points:',
          social_copy_2: 'With your contribution, we can support  social projects in communities throughout the country such as trainings, infrastructure improvement, reforestation, education programs, and many others. Join our cause and help us turn our projects into reality!',
          social_values: '1USD = 1 Social Point'
        }
      }
    }
  },
  computed: {
    translations () {
      const translations = this.experience.translations.find(item => {
        return item.iso_lang === this.$store.getters.currentLang.iso_lang
      })
  
      return translations
    }
  }
}
</script>

<style>

</style>