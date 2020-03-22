<template>
  <div class="experiences-slider -ml-3">
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper py-5 pl-3">
        <div v-for="n in 10" :key="n" class="swiper-slide">
          <DestinationCard />
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-bullets"></div>
    </div>
  </div>
</template>

<script>
import DestinationCard from '~/components/DestinationCard'

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
    DestinationCard
  },

  data () {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 30,
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
