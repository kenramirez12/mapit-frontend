<template>
  <div class="trusted-by">
    <span class="md:text-2xl light-gray font-light block mb-10 sm:mb-5">{{ $lang.translate(translations, 'trust_us') }}</span>
    <el-button @click="prevSlide()" class="trusted-by__arrow-prev text-gray-500" size="mini" icon="el-icon-back" circle plain></el-button>
    <el-button @click="nextSlide()" class="trusted-by__arrow-next text-gray-500" size="mini" icon="el-icon-right" circle plain></el-button>
    <div v-swiper:mySwiper="swiperOption" class="trusted-by-slider">
      <div class="swiper-wrapper">
        <div
          v-for="(logo, n) in trusted"
          :key="'logo_' + n"
          class="swiper-slide">
          <div class="client-logo">
            <img :src="logo">
          </div>
        </div>
      </div>
    </div>
 </div>
</template>

<script>
export default {
  props: {
    translations: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      trusted: [
        '/images/corporativos/nestle.png',
        '/images/corporativos/cisco.png',
        '/images/corporativos/belcorp.png',
        '/images/corporativos/loreal.png',
        '/images/corporativos/hochschild.png',
        '/images/corporativos/wsp.png'
      ],
      swiperOption: {
        loop: true,
        slidesPerView: 4,
        spaceBetween: 20,
        breakpoints: {
          460: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40
          }
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
  .trusted-by {
    background-color: #fff;
    box-shadow: -10px 20px 75px rgba(0, 0, 0, 0.25);
    width: calc(100% - 2rem);
    max-width: 1000px;
    padding: 2rem 4rem 3rem;
    margin: 3rem 0 0;
    position: relative;

    @media screen and (min-width: 640px) {
      box-shadow: -20px 40px 150px rgba(0, 0, 0, 0.35);
      padding: 3rem 4rem;
      margin: 7rem 0;
    }

    &:hover {
      .client-logo {
        filter: grayscale(0);
        opacity: 1;
      }
    }
  }

  .trusted-by__arrow-prev {
    position: absolute;
    top: 62%;
    left: 1rem;
    transform: translateY(-50%);
  }

  .trusted-by__arrow-next {
    position: absolute;
    top: 62%;
    right: 1rem;
    transform: translateY(-50%);
  }
  .light-gray {
    color: "#9F9F9F";
  }

  .client-logo {
    display: flex;
    margin: 0 auto;
    max-width: 170px;
    height: 120px;
    width: 100%;
    filter: grayscale(1);
    opacity: .5;
    transition: all 0.3s;

    img {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      margin: auto;
    }
  }
</style>
