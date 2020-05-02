<template>
  <div id="program-section" class="experience-container py-6 pb-super overflow-hidden">
    <div class="container mx-auto px-6 md:px-4 md:px-0">
      <div class="activities md:pt-6 pb-6 position-relative">
        <h3 class="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-light mb-6 pb-6">
          {{ $lang.translate(pageTranslations, 'program') }}
        </h3>
        <div class="flex flex-wrap">
          <div class="w-full md:w-5/12">
            <div class="program mb-6 pb-6">
              <span class="text-lg md:text-2xl uppercase">
                {{ $lang.translate(pageTranslations, 'departures') }}
                <el-tooltip v-if="isOnline" effect="dark" content="GMT -5" placement="right">
                  <i class="el-icon-info ml-2" />
                </el-tooltip>
              </span>
              <div class="bg-primary rounded-lg py-2 px-4 mt-3 shadow-lg schedule-table">
                <div class="schedule-table-overlay">
                  <div class="schedule-table-overlay__content">
                    <span>{{ $lang.translate(pageTranslations, 'rotate') }}</span>
                    <img
                      src="/images/mobile-phone.png"
                      class="ml-3"
                      style="margin-top:-8px;width:2rem;height:2rem">
                  </div>
                </div>
                <div class="flex flex-wrap w-full py-3 px-2 text-sm">
                  <div class="flex-1 text-center"><span>{{ $lang.translate(pageTranslations, 'monday') }}</span></div>
                  <div class="flex-1 text-center"><span>{{ $lang.translate(pageTranslations, 'tuesday') }}</span></div>
                  <div class="flex-1 text-center"><span>{{ $lang.translate(pageTranslations, 'wednesday') }}</span></div>
                  <div class="flex-1 text-center"><span>{{ $lang.translate(pageTranslations, 'thursday') }}</span></div>
                  <div class="flex-1 text-center"><span>{{ $lang.translate(pageTranslations, 'friday') }}</span></div>
                  <div class="flex-1 text-center"><span>{{ $lang.translate(pageTranslations, 'saturday') }}</span></div>
                  <div class="flex-1 text-center"><span>{{ $lang.translate(pageTranslations, 'sunday') }}</span></div>
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
          <div class="w-full md:w-6/12">
            <div class="itinerary pr-4">
              <span class="text-lg md:text-2xl uppercase">{{ $lang.translate(pageTranslations, 'itinerary') }}</span>
              <el-tabs
                v-model="activeDay"
                class="mt-4"
                >
                <el-tab-pane
                  v-for="(day, n) in itinerary"
                  :key="'day_' + n"
                  :label="`${$lang.translate(pageTranslations, 'day')} ${n}`"
                  :name="'day_' + n">
                  <div
                    v-for="(activity, x) in day"
                    :key="'activity_' + x"
                    :class="{ 'mt-5' : n === 1 }"
                    class="flex flex-wrap mb-5 text-sm md:text-base">
                    <div class="w-3/12 md:w-2/12 pr-3">{{ activity.time }}</div>
                    <div class="w-9/12 md:w-10/12">{{ activity.description }}</div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <div class="w-6/12 hidden md:flex">
            <img :src="$imagePath(experience.itinerary_image.path)" class="my-auto xl:mt-0">
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
      onlineCategoryId: process.env.onlineId,
      activeDay: 'day_1',
      pageTranslations: {
        'es_ES': {
          program: 'Programa',
          departures: 'Horarios de inicio',
          itinerary: 'Itinerario',
          rotate: 'Gire la pantalla para ver',
          day: 'Día',
          monday: 'Lun',
          tuesday: 'Mar',
          wednesday: 'Mié',
          thursday: 'Jue',
          friday: 'Vie',
          saturday: 'Sáb',
          sunday: 'Dom'
        },
        'en_EN': {
          program: 'Program',
          departures: 'Departures',
          itinerary: 'Itinerary',
          rotate: 'Rotate the screen to see',
          day: 'Day',
          monday: 'Mon',
          tuesday: 'Tue',
          wednesday: 'Wed',
          thursday: 'Thu',
          friday: 'Fri',
          saturday: 'Sat',
          sunday: 'Sun'
        },
      }
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
    },
    isOnline () {
      if(!this.experience || this.experience.categories.length === 0) return false

      let isOnline = false
      this.experience.categories.forEach(item => {
        if(item.id === parseInt(this.onlineCategoryId)) {
          isOnline = true
        }
      })

      return isOnline
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
  .schedule-table {
    width: 450px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
    position: relative;
  }

  .schedule-table-overlay {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 0.5rem;

    @media screen and (min-width: 490px) {
      display: none;
    }

    &__content {
      color: #fff;
      position: absolute;
      top: 0;
      bottom: 0;
      text-align: center;
      display: flex;
      align-items: center;
      padding-left: 1rem;
    }
  }

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