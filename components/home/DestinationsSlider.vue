<template>
  <div class="experiences-slider">
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper py-5">
        <template v-if="destinations === null">
          <div v-for="n in 5" :key="n" class="swiper-slide">
            <DestinationCard :is-loading="true" />
          </div>
        </template>
        <template v-else>
          <div
            v-for="destination in destinations"
            :key="destination.id"
            class="swiper-slide">
            <DestinationCard :destination="destination"  />
          </div>
        </template>
      </div>
      <div class="swiper-pagination swiper-pagination-bullets"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
        spaceBetween: 20,
        loop: false
      }
    }
  },

  computed: {
    ...mapGetters({
      destinations: 'destinations/destinations'
    })
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
