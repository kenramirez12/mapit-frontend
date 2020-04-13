<template>
  <div>
    <p
      v-if="Array.isArray(lastExperiences) && lastExperiences.length === 0"
      class="pl-5 font-light">
      No se encontraron experiencias.
    </p>
    <div
      v-else
      class="experiences-slider">
      <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper py-5">
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
              class="swiper-slide"
              style="height:auto"
            >
              <ExperienceCard :experience="experience" />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
      experiencesOptions: {
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
  async mounted () {
    const experiences = await this.getExperiences(this.experiencesOptions)
    this.lastExperiences = experiences ? experiences.data : []
  },
  methods: {
    ...mapActions({
      getExperiences: 'experiences/getExperiences'
    })
  }
}
</script>

<style lang="scss" scoped>
  .experiences-slider {
    width: 100%;
    height: 550px;
    padding-left: 1.5rem;
  }

  .swiper-container {
    padding-left: .5rem;
    width: calc(100% - .5rem);
  }

  .swiper-slide {
    width:100%;
    max-width: 17rem;

    @media screen and (min-width: 768px) {
      max-width: 18rem;
    }
  }
</style>
