<template>
  <div>
    <div
      v-if="experiences && experiences.length === 0"
      class="flex">
      <div class="container mx-auto pb-4 inline-block">
        <el-alert
          class="pt-4 pb-6"
          type="error"
          :closable="false">
          <h4 class="text-3xl text-black">
            ¡Whoops!
          </h4>
          <p class="text-base font-light text-black">
            {{ $lang.translate(translations, 'noResultsCopy') }}
          </p>
        </el-alert>
      </div>
    </div>
    <div
      v-else
      class="experiences-slider">
      <div v-swiper:mySwiper="swiperOption">
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
import ExperienceCard from '~/components/ExperienceCard'

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
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 20,
        loop: false
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
  }
}
</script>

<style lang="scss" scoped>
  .experiences-slider {
    width: 100%;
    height: 480px;
    padding-left: .5rem;

    @media screen and (min-width: 768px) {
      padding-left: 1.5rem;
    }
  }

  .swiper-container {
    padding-left: .75rem;
    width: calc(100% - .75rem);
  }

  .swiper-slide {
    width:100%;
    max-width: 17rem;

    @media screen and (min-width: 768px) {
      max-width: 19rem;
    }
  }
</style>
