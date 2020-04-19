<template>
  <div v-swiper:mySwiper="swiperOption" class="testimonials-slider mt-20">
    <div class="testimonials-slider__arrows">
      <el-button @click="prevSlide()" type="primary" icon="el-icon-back" square class="px-3"></el-button>
      <el-button @click="nextSlide()" type="primary" icon="el-icon-right" square class="px-3"></el-button>
    </div>
    <div class="swiper-wrapper">
      <TestimonialItem
        v-for="(testimonial, n) in testimonials"
        :key="testimonial.id"
        :testimonial-number="n + 1"
        :testimonial="testimonial"
        class="swiper-slide" />
    </div>
    <div class="swiper-pagination swiper-pagination-bullets"></div>
  </div>
</template>

<script>
import TestimonialItem from '~/components/TestimonialItem'

export default {
  components: { TestimonialItem },
  props: {
    testimonials: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      swiperOption: {
        loop: false,
        slidesPerView: 'auto',
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        }
      }
    }
  },
  methods: {
    prevSlide() {
      this.mySwiper.slidePrev()
    },
    nextSlide() {
      this.mySwiper.slideNext()
    }
  }
}
</script>

<style lang="scss" scoped>
  .testimonials-slider {
    position: relative;
    margin-bottom: 5rem;

    @media screen and (min-width: 768px) {
      margin-bottom: 0;
    }

    &__arrows {
      position: absolute;
      left: 0;
      z-index: 2;
      bottom: -5rem;

      @media screen and (min-width: 768px) {
        bottom: 0;
      }
    }
  }

  .swiper-container {
    overflow: visible;
  }

  .swiper-slide {
    width: 100%;
  }
</style>