<template>
 <div class="flex justify-center  m-20">
  <div class="trusted-by">
    <span class="text-xl text-gray-500 font-light block mb-5">Trusted by</span>
    <el-button @click="prevSlide()" class="trusted-by__arrow-prev text-gray-500" size="mini" icon="el-icon-back" circle plain></el-button>
    <el-button @click="nextSlide()" class="trusted-by__arrow-next text-gray-500" size="mini" icon="el-icon-right" circle plain></el-button>
    <div v-swiper:mySwiper="swiperOption" class="trusted-by-slider">
      <div class="swiper-wrapper">
        <div v-for="n in 6" :key="n" class="swiper-slide">
          <img src="~/assets/images/startup-peru.png" alt="">
        </div>
      </div>
    </div>
  </div>
 </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        loop: true,
        slidesPerView: 4,
        spaceBetween: 40
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
    background-color: #fafafa;
    box-shadow: -20px 60px 220px rgba(0, 0, 0, 0.44);
    width: 70%;
    padding: 3rem 4rem;
    margin: 7rem 0;
    position: relative;
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
</style>