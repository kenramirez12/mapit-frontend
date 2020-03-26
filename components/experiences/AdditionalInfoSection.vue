<template>
  <div id="additional-info-section" class="experience-container py-6 pb-super">
    <div class="container mx-auto px-4">
      <div class="activities py-6 position-relative">
        <h3 class="text-6xl font-light mb-6 pb-6">Información Adicional</h3>
        <div class="flex flex-wrap">
          <div class="w-5/12 pr-6">
            <div class="text-light py-6">
              <img src="~/assets/images/map-marker-lg.svg" class="mb-3" alt="">
              <span class="text-light text-base">Punto de encuentro</span>
              <span class="block text-2xl text-light">{{ translations.meeting_place }}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap">
          <div class="w-5/12">
            <ul class="checkbox-list my-6 py-6 text-base">
              <li
                v-for="(additional, n) in translations.additional_info"
                :key="'additional_' + n"
                class="checkbox-list__item mb-4 text-light">
                <img src="~/assets/images/checkbox-icon.svg" class="checkbox-list__icon">
                {{ additional }}
              </li>
            </ul>
            <img src="~/assets/images/danger-icon.svg" class="mb-3" alt="">
            <p>{{ translations.legal_info }}</p>
          </div>

          <div class="w-5/12 ml-auto">
            <div class="flex items-center">
              <h3 class="text-4xl">Qué llevar</h3>
              <img src="~/assets/images/sitting-01.svg" class="ml-auto" alt="">
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
.text-light {
  color: #9F9F9F;
}
</style>