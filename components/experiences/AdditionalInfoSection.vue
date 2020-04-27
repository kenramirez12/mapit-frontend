<template>
  <div id="additional-info-section" class="experience-container py-6 pb-super overflow-hidden">
    <div class="container mx-auto px-6 md:px-4 md:px-0">
      <div class="activities py-6 position-relative">
        <h3 class="text-4xl md:text-5xl xl:text-6xl font-light mb-6 pb-6">
          {{ $lang.translate(pageTranslations, 'additional_info') }}
        </h3>
        <div class="flex flex-wrap">
          <div class="w-full md:w-5/12 pr-6">
            <div class="py-6">
              <img src="~/assets/images/map-marker-lg.svg" class="mb-3" alt="">
              <span class="text-base">{{ $lang.translate(pageTranslations, 'meeting_point') }}</span>
              <span class="block text-2xl">{{ translations.meeting_place }}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap">
          <div class="w-full md:w-5/12">
            <ul class="checkbox-list my-6 py-6 text-base">
              <li
                v-for="(additional, n) in translations.additional_info"
                :key="'additional_' + n"
                class="checkbox-list__item mb-4">
                <img src="~/assets/images/checkbox-icon.svg" class="checkbox-list__icon">
                {{ additional }}
              </li>
            </ul>
            <img src="~/assets/images/danger-icon.svg" class="mb-3" alt="">
            <p class="font-light">{{ translations.legal_info }}</p>
          </div>
          <div class="w-5/12 hidden md:block ml-auto">
            <div class="flex items-center">
              <h3 class="text-4xl font-light">{{ $lang.translate(pageTranslations, 'bring') }}</h3>
              <img src="~/assets/images/sitting-01.svg" class="ml-auto" style="width:15rem;margin-right:-7rem">
            </div>
            <ul class="pr-6">
              <li
                v-for="(carry, n) in translations.carry"
                :key="'carry_' + n"
                class="flex mb-3">
                <img src="~/assets/images/dark-arrow-sm.svg" class="mr-5"> 
                {{ carry }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-primary md:hidden pt-4 pb-12 overflow-hidden">
      <div class="container px-6 mx-auto">
        <div class="flex items-center">
          <h3 class="text-4xl font-light">{{ $lang.translate(pageTranslations, 'bring') }}</h3>
          <img src="~/assets/images/sitting-01.svg" class="ml-auto" style="width:180px;margin-right:-80px;translateX(5rem)">
        </div>
        <ul class="pr-6">
          <li
            v-for="(carry, n) in translations.carry"
            :key="'carry_' + n"
            class="flex mb-3">
            <img src="~/assets/images/dark-arrow-sm.svg" class="mr-5"> 
            {{ carry }}
          </li>
        </ul>
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
          additional_info: 'Información Adicional',
          meeting_point: 'Punto de encuentro',
          bring: 'Qué llevar'
        },
        'en_EN': {
          additional_info: 'Additional Information',
          meeting_point: 'Meeting Point',
          bring: 'What to bring'
        },
      },
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
/* . {
  color: #9F9F9F;
} */
</style>