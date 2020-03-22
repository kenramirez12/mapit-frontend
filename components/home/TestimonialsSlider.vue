<template>
  <div v-swiper:mySwiper="swiperOption" class="testimonials-slider mt-20">
    <div class="testimonials-slider__arrows">
      <el-button @click="prevSlide()" type="primary" icon="el-icon-back" square class="px-3"></el-button>
      <el-button @click="nextSlide()" type="primary" icon="el-icon-right" square class="px-3"></el-button>
    </div>
    <div class="swiper-wrapper">
      <TestimonialItem
        v-for="n in 6"
        :key="n"
        :testimonial-number="n"
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
  data() {
    return {
      swiperOption: {
        loop: true,
        slidesPerView: 'auto',
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        }
      },
      testimonial: {
        review: 'Professionals in their craft! All services were super great with strong attention to details in the travel',
        fullname: 'Polina Kuzina',
        country: 'Ukrane'
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

    &__arrows {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 2;
    }
  }

  .swiper-container {
    overflow: visible;
  }

  .swiper-slide {
    width: 100%;
  }
</style>