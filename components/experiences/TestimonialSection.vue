<template>
  <div id="testimonials-section" class="experience-container py-6 pb-super">
    <div class="container mx-auto">
      <h3 class="text-3xl md:text-5xl font-light pb-4 mb-6">
        {{ $lang.translate(pageTranslations, 'reviews') }}
      </h3>
    </div>
    <div class="testimonials-slider">
      <div v-swiper:mySwiper="swiperOption">
        <div class="testimonials-slider__arrows">
          <el-button @click="prevSlide()" type="primary" icon="el-icon-back" square class="px-3"></el-button>
          <el-button @click="nextSlide()" type="primary" icon="el-icon-right" square class="px-3"></el-button>
        </div>
        <div class="swiper-wrapper">
          <TestimonialItem
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            :testimonial="testimonial"
            class="swiper-slide"
          />
        </div>
        <div class="swiper-pagination swiper-pagination-bullets"></div>
      </div>
    </div>
  </div>
</template>

<script>
import TestimonialItem from '~/components/TestimonialItem'

export default {
  components: {
    TestimonialItem
  },
  props: {
    testimonials: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      testimonial: {
        review: 'Professionals in their craft! All services were super great with strong attention to details in the travel',
        fullname: 'Polina Kuzina',
        country: 'Ukranie'
      },
      swiperOption: {
        slidesPerView: 'auto'
      },
      pageTranslations: {
        'es_ES': {
          reviews: 'Opiniones',
          read_more: 'Leer más testimonios en'
        },
        'en_EN': {
          reviews: 'Reviews',
          read_more: 'Read more reviews on'
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
    width: 100%;
    padding-left: 2rem;

    &__arrows {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 2;
    }
  }

  .swiper-container {
    width: 100%;
  }

  .testimonial-item {
    display: flex;
    width: 75%;
    margin-right: 4rem;

    &__content {
      padding-right: 3rem;
    }
  }

  // .swiper-slide {
  //   width: 100%;
  // }
</style>
