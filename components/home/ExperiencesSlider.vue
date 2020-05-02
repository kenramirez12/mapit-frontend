<template>
  <div>
    <div
      v-if="experiences && experiences.length === 0"
      class="flex">
      <div class="container px6 sm:px-4 mx-auto pb-4 inline-block">
        <el-alert
          class="pt-4 pb-6"
          type="error"
          :closable="false">
          <h4 class="text-xl md:text-3xl text-black">
            ¡Whoops!
          </h4>
          <p class="text-sm md:text-base font-light text-black">
            {{ $lang.translate(translations, 'noResultsCopy') }}
          </p>
        </el-alert>
      </div>
    </div>
    <div
      v-else
      class="container-left-margin">
      <div v-swiper:experienceSwiper="swiperOption">
        <div class="swiper-wrapper py-5">
          <template v-if="experiences === null">
            <div
              v-for="n in 4"
              :key="n"
              class="swiper-slide">
              <ExperienceCard :loading="true" />
            </div>
          </template>
          <template v-else>
            <div
              v-for="experience in experiences"
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
import ExperienceCard from '~/components/shared/ExperienceCard'

export default {
  props: {
    experiences: {
      required: true
    },
    prev: {
      type: Number,
      required: false
    },
    next: {
      type: Number,
      required: false
    },
    translations: {
      type: Object,
      required: true
    }
  },
  components: {
    ExperienceCard
  },
  data () {
    return {
      hasEnd: false,
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 20,
        // loop: true,
        on: {
          reachEnd: () => {
            this.hasEnd = true
          }
        }
      }
    }
  },
  watch: {
    prev() {
      this.experienceSwiper.slidePrev()
    },
    next() {
      if(this.hasEnd) {
        this.hasEnd = false
        this.experienceSwiper.slideTo(1)
      } else {
        this.experienceSwiper.slideNext()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .experiences-slider {
    width: 100%;
    height: 480px;
  }

  .swiper-container {
    padding-left: 24px;
    width: 100%;

    @media screen and (min-width: 640px) {
      padding-left: 1rem;
    }
  }

  .swiper-slide {
    width:100%;
    max-width: 17rem;

    @media screen and (min-width: 768px) {
      max-width: 19rem;
    }
  }
</style>
