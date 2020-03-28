 <template>
   <div id="activities-section" class="experience-container py-6 pb-super">
    <div class="container mx-auto px-4">
      <div class="activities py-6 position-relative">
        <h3 class="text-6xl font-light mb-6 pb-24">Actividades</h3>
        <div class="flex flex-wrap">
          <div class="w-6/12 pr-6">
            <div class="flex flex-wrap pb-12">
              <div v-if="duration !== ''" class="flex-1 pr-4">
                <img src="~/assets/images/features/clock-icon.svg" style="height:20px">
                <div class="block text-xl font-normal mt-6 mb-4">Duración</div>
                <p class="text-base">{{ duration }}</p>
              </div>
              <div v-if="location !== ''" class="flex-1 pr-4">
                <img src="~/assets/images/features/map-icon.svg" style="height:20px">
                <div class="block text-xl font-normal mt-6 mb-4">Ubicación</div>
                <p class="text-base">{{ location }}</p>
              </div>
              <div v-if="altitude !== ''" class="flex-1 pr-4">
                <img src="~/assets/images/features/trip-icon.svg" style="height:20px">
                <div class="block text-xl font-normal mt-6 mb-4">Altitud</div>
                <p class="text-base">{{ altitude }}</p>
              </div>
              <div class="flex-1 pr-4">
                <img src="~/assets/images/features/group-icon.svg" style="height:20px">
                <div class="block text-xl font-normal mt-6 mb-4">Capacidad</div>
                <p class="text-base">{{experience.min_quota}}-{{ experience.max_quota }} personas</p>
              </div>
              <div v-if="languages !== ''" class="flex-1 pr-4">
                <img src="~/assets/images/features/thumb-icon.svg" style="height:20px">
                <div class="block text-xl font-normal mt-6 mb-4">Idioma</div>
                <p class="text-base">{{ languages }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap py-6 my-6 .text-base">
          <div class="w-5/12">
            <ul
              v-for="(consideration, n) in translations.considerations"
              :key="'consideration_' + n"
              class="checkbox-list">
              <li class="checkbox-list__item mb-4">
                <img src="~/assets/images/checkbox-icon.svg" class="checkbox-list__icon">
                {{ consideration }}
              </li>
            </ul>
          </div>
          <div class="w-6/12 ml-auto">
            <img :src="$imagePath(experience.activity_image.path)" class="activity-img">
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
    },
    duration () {
      return this.$lang.apiTranslate(this.experience.translations, 'duration')
    },
    location () {
      return this.$lang.apiTranslate(this.experience.translations, 'location')
    },
    altitude () {
      return this.$lang.apiTranslate(this.experience.translations, 'altitude')
    },
    languages () {
      return this.$lang.apiTranslate(this.experience.translations, 'languages')
    }
  }
 }
 </script>
 
 <style>
 .activity-img {
   box-shadow: 0px 0px 100px rgba(0, 0, 0, 0.33);
 }
 </style>