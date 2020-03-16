<template>
  <div id="testimonials-section" class="experience-container py-6 pb-super">
    <div class="container mx-auto px-4">
      <div class="activities py-6 position-relative">
        <h3 class="text-5xl font-light mb-6 pb-super">Opiniones</h3>
        <div class="flex flex-wrap mt-6" style="position:relative">
          <div class="w-full pr-6">
            <div v-swiper:mySwiper="swiperOption" class="testimonials-slider">
              <div class="testimonials-slider__arrows">
                <el-button @click="prevSlide()" type="primary" icon="el-icon-back" square class="px-3"></el-button>
                <el-button @click="nextSlide()" type="primary" icon="el-icon-right" square class="px-3"></el-button>
              </div>
              <div class="swiper-wrapper">
                <div v-for="n in 6" :key="n" class="testimonial-item swiper-slide">
                  <div class="testimonial-item__content">
                    <span class="text-4xl leading-tight">Professionals in their craft! All services were super great with strong attention to details in the travel {{n}}"</span>
                    <a href="#" class="flex items-center py-6 my-6">
                      <i class="el-icon-collection-tag text-base mr-2"></i> Read more testimonials on 
                    </a>
                    <div class="flex flex-col">
                      <span class="text-base">Polina Kuzina</span>
                      <small class="text-sm tracking-widest">Ukrane</small>
                    </div>
                  </div>
                  <img src="~/assets/images/testimonial.jpg" alt="">
                </div>
              </div>
              <div class="swiper-pagination swiper-pagination-bullets"></div>
            </div>
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
        slidesPerView: 'auto'
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

  .testimonial-item {
    display: flex;
    width: 75%;
    margin-right: 4rem;

    &__content {
      padding-right: 3rem;
    }
  }

  .swiper-container {
    overflow: visible;
  }

  // .swiper-slide {
  //   width: 100%;
  // }
</style>
