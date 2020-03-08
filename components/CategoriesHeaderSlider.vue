<template>
  <div class="page-header">
    <div class="categories-slider__arrows container">
      <el-button @click="prevSlide()" class="text-white hover:text-white bg-transparent hover:bg-primary" icon="el-icon-back" circle></el-button>
      <el-button @click="nextSlide()" class="text-white hover:text-white bg-transparent hover:bg-primary" icon="el-icon-right" circle></el-button>
    </div>
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div
          v-for="(cat, n) in categories"
          :key="cat.value"
          :style="{ backgroundImage: `url(${n % 2 ? adventureBg : natureBg})` }"
          :data-cat-value="cat.value"
          class="swiper-slide">
          <div class="container m-auto px-4">
            <h1 class="page-header__title">{{ cat.label }}</h1>
          </div>
        </div>
      </div>
    </div>

    <div class="categories-carousel">
      <div
        v-for="(cat, n) in categories"
        :key="'carousel_' + cat.value"
        :data-cat-name="cat.label"
        :class="{ current : currentCat === cat.value }"
        @click="updateCurrentCat(n)"
        class="categories-carousel-item">
        <img
          v-if="currentCat === cat.value"
          class="categories-carousel-item__arrow categories-carousel-item__arrow--current"
          src="~/assets/images/current-cat-arrow.svg">
        <img
          v-else
          class="categories-carousel-item__arrow"
          src="~/assets/images/white-arrow-next.svg">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import adventureBg from '~/assets/images/adventure-bg.jpg'
import natureBg from '~/assets/images/nature-bg.jpg'

export default {
  data() {
    return {
      adventureBg,
      natureBg,
      swiperOption: {
        speed: 500,
        slidesPerView: 'auto',
        loop: false,
        allowTouchMove: false,
        effect: 'fade',
        // fadeEffect: {
        //   crossFade: true
        // },
        on: {
          slideChange: (that) => {
            this.updateCurrentCat(this.mySwiper.activeIndex)
          }
        }
      },
      currentCat: 'adv'
    }
  },

  computed: {
    ...mapState(['categories'])
  },

  methods: {
    updateCurrentCat(index) {
      this.currentCat = this.categories[index].value
      this.mySwiper.slideTo(index)
    },

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
  .page-header {
    display: flex;
    height: 640px;
    position: relative;

    &__title {
      font-weight: 300;
      font-size: 65px;
      color: #fff;
    }
  }

  .categories-slider {
    &__arrows {
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translateX(-50%);
      padding-right: 1rem;
      text-align: right;
      z-index: 9;
    }
  }

  .swiper-slide {
    padding-top: 10rem;
  }

  .categories-carousel {
    display: flex;
    border-bottom: 1px solid rgba(#fff, .5);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5rem;
    z-index: 9;
  }

  .categories-carousel-item {
    height: 14px;
    margin-bottom: -7px;
    position: relative;
    flex: 1;
    padding: 0 1rem;
    cursor: pointer;
    transition: all 0.3s;

    &.current {
      flex: 2;
    }

    &:not(.current)::before {
      content: attr(data-cat-name);
      font-size: 14px;
      position: absolute;
      display: block;
      top: -1.5rem;
      padding-bottom: 1.5rem;
      color: #fff;
      transition: all .15s;
    }

    &:hover::before {
      top: -2rem;
      padding-bottom: 2rem;
    }

    &__arrow {
      height: 14px;

      &--current {
        height: 40px;
        position: absolute;
        bottom: 2px;
      }
    }
  }
</style>
