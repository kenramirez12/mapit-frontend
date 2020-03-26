<template>
  <div class="experiences-slider -ml-3">
    <p
      v-if="Array.isArray(lastExperiences) && lastExperiences.length === 0"
      class="pl-5 font-light">
      No se encontraron experiencias.
    </p>
    <div
      v-else
      v-swiper:mySwiper="swiperOption"
      class="w-full">
      <div class="swiper-wrapper py-5 pl-3">
        <template v-if="lastExperiences === null">
          <div
            v-for="n in 4"
            :key="n"
            class="swiper-slide">
            <ExperienceCard :loading="true" />
          </div>
        </template>
        <template v-else>
          <div
            v-for="experience in lastExperiences"
            :key="experience.id"
            class="swiper-slide">
            <ExperienceCard :experience="experience" />
          </div>
        </template>
      </div>
      <div class="swiper-pagination swiper-pagination-bullets"></div>
    </div>
  </div>
</template>

<script>
import ExperienceCard from '~/components/ExperienceCard'

export default {
  props: {
    prev: {
      type: Number,
      required: true
    },
    next: {
      type: Number,
      required: true
    },
  },
  components: {
    ExperienceCard
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 30,
        loop: false
      },
      lastExperiences: null,
      lastExperiencesOptions: {
        per_page: 10
      }
    }
  },
  watch: {
    prev() {
      this.mySwiper.slidePrev()
    },
    next() {
      this.mySwiper.slideNext()
    }
  },
  mounted () {
    this.getExperiences(this.lastExperiencesOptions)
  },
  methods: {
    async getExperiences (params) {
      try {
        const resp = await this.$axios.$get('/experiences', { params })
        this.lastExperiences = resp.data.data
        console.log(resp)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
  .experiences-slider {
    height: 550px;
  }

  .swiper-container {
    position: absolute;
  }

  .swiper-slide {
    width:100%;
    max-width: 20rem;
  }
</style>
