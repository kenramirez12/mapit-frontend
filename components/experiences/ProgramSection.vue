<template>
  <div id="program-section" class="experience-container py-6 pb-super">
    <div class="container mx-auto px-4">
      <div class="activities py-6 position-relative">
        <h3 class="text-6xl font-light mb-6 pb-6">Programa</h3>
        <div class="flex flex-wrap">
          <div class="w-5/12">
            <div class="program mb-6 pb-6">
              <span class="text-2xl">HORARIOS DE INICIO</span>
              <div class="bg-primary rounded-lg py-2 px-4 mt-3">
                <div class="flex flex-wrap w-full py-3 px-2 text-sm">
                  <div class="flex-1 text-center"><span>Lunes</span></div>
                  <div class="flex-1 text-center"><span>Martes</span></div>
                  <div class="flex-1 text-center"><span>Miércoles</span></div>
                  <div class="flex-1 text-center"><span>Jueves</span></div>
                  <div class="flex-1 text-center"><span>Viernes</span></div>
                  <div class="flex-1 text-center"><span>Sábado</span></div>
                  <div class="flex-1 text-center"><span>Domingo</span></div>
                </div>
                <div
                  v-for="(schedule, n) in experience.schedules"
                  :key="'schedule_' + n"
                  class="flex flex-wrap w-full bg-white py-1 px-2 rounded-lg shadow mb-3 text-gray-600 font-light text-sm">
                  <div
                    v-for="n in 7"
                    :key="'day_' + n"
                    class="flex-1 text-center">
                    <span v-if="schedule.days.includes(n)">{{ schedule.start_time }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap">
          <div class="w-6/12">
            <div class="itinerary pr-4">
              <span class="text-lg">ITINERARIO</span>
              <el-tabs
                v-model="activeDay"
                class="mt-4"
                >
                <el-tab-pane
                  v-for="(day, n) in itinerary"
                  :key="'day_' + n"
                  :label="'Día ' + n"
                  :name="'day_' + n">
                  <div
                    v-for="(activity, x) in day"
                    :key="'activity_' + x"
                    :class="{ 'mt-5' : n === 1 }"
                    class="flex flex-wrap mb-5">
                    <div class="w-2/12">{{ activity.time }}</div>
                    <div class="w-10/12">{{ activity.description }}</div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <div class="w-6/12">
            <img :src="$imagePath(experience.itinerary_image.path)" class="s" alt="">
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
  data() {
    return {
      activeDay: 'day_1'
    }
  },
  computed: {
    itinerary () {
      return this.groupBy(this.translations.itinerary, 'day')
    },
    translations () {
      const translations = this.experience.translations.find(item => {
        return item.iso_lang === this.$store.getters.currentLang.iso_lang
      })

      return translations
    }
  },
  methods: {
    groupBy (array, key) {
      const result = {}
      array.forEach(item => {
        if (!result[item[key]]){
          result[item[key]] = []
        }
        result[item[key]].push(item)
      })
      return result
    }
  }
}
</script>

<style lang="scss">
  .el-tabs__item {
    border: 1px solid var(--primary);
    border-radius: .3rem;
    padding-left: .5rem !important;
    padding-right: .5rem !important;
    height: 46px;
    line-height: 46px;
    color: #000;
    transition: all 0.3s;

    &:not(:last-child) {
      margin-right: 1rem;
    }

    &.is-active {
      background-color: var(--primary);
      color: #fff;
    }
  }

  .el-tabs__nav-wrap::after,
  .el-tabs__active-bar {
    display: none;
  }
</style>