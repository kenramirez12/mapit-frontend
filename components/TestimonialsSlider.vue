<template>
  <div v-swiper:mySwiper="swiperOption" class="testimonials-slider mt-20">
    <div class="testimonials-slider__arrows">
      <el-button @click="prevSlide()" type="primary" icon="el-icon-back" square class="px-3"></el-button>
      <el-button @click="nextSlide()" type="primary" icon="el-icon-right" square class="px-3"></el-button>
    </div>
    <div class="swiper-wrapper">
      <div v-for="n in 6" :key="n" class="testimonial-item swiper-slide">
        <span class="testimonial-item__number">0{{ n }}</span>
        <div class="testimonial-item__content" style="background-color:#fff">
          <span class="text-4xl leading-tight">Professionals in their craft! All services were super great with strong attention to details in the travel {{n}}"</span>
          <a href="#" class="flex items-center py-6 my-6">
            <i class="el-icon-collection-tag text-2xl mr-2"></i> Read more testimonials on 
          </a>
          <div class="flex flex-col">
            <span>Polina Kuzina</span>
            <small>Ukrane</small>
          </div>
        </div>
        <img src="~/assets/images/testimonial.jpg" alt="">
      </div>
    </div>
    <div class="swiper-pagination swiper-pagination-bullets"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        loop: true,
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

    &__arrows {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 2;
    }
  }

  .testimonial-item:not(.swiper-slide-active) {
    .testimonial-item__number {
      opacity: 0;
    }
  }

  .testimonial-item__number {
    position: absolute;
    left: -45%;
    line-height: 1;
    font-size: 20rem;
    font-weight: 200;
    color: #D8D8D8;
    transition: opacity .3s;
  }

  .swiper-container {
    overflow: visible;
  }

  .swiper-slide {
    width: 100%;
  }
</style>