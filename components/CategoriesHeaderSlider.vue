<template>
  <div class="page-header">
    <div class="categories-slider__arrows container">
      <el-button @click="prevSlide()" class="text-white hover:text-white bg-transparent hover:bg-primary" icon="el-icon-back" circle />
      <el-button @click="nextSlide()" class="text-white hover:text-white bg-transparent hover:bg-primary" icon="el-icon-right" circle />
    </div>
    <div
      v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div
          v-for="category in sanitizedCategories"
          :key="category.id"
          :style="{
            backgroundImage: `url(${category.id === '' ? category.image : $imagePath(category.image.path)})`,
            backgroundPosition: category.id === '' ? 'right center' : 'center'
          }"
          :data-cat-value="category.id"
          class="swiper-slide">
          <div class="container m-auto px-4">
            <h1
              v-if="category.id === ''"
              class="page-header__title"
              v-html="$lang.translate(translations, 'copy')" />
            <h1 v-else class="page-header__title">
              {{ $lang.apiTranslate(category.translations, 'name') }}
              <i v-if="isLoading" class="el-icon-loading ml-4" />
            </h1>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="categories && sanitizedCategories.length > 0"
      class="categories-carousel">
      <div
        v-for="(category, n) in sanitizedCategories"
        :key="'carousel_' + category.id"
        :data-cat-name="category.id === '' ? category.name : $lang.apiTranslate(category.translations, 'name')"
        :class="{ current : currentCategory === category.id }"
        @click="updateCurrentCat(n)"
        class="categories-carousel-item">
        <img
          v-if="currentCategory === category.id"
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
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    selected: {
      type: [Number, String],
      required: true,
      default: () => ''
    },
    translations: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      swiperOption: {
        speed: 500,
        slidesPerView: 'auto',
        loop: false,
        allowTouchMove: false,
        effect: 'fade',
        on: {
          slideChange: (that) => {
            this.updateCurrentCat(this.mySwiper.activeIndex)
          }
        }
      },
      currentCat: '',
      isLoading: false
    }
  },

  computed: {
    ...mapGetters({
      categories: 'categories/categories',
      currentCategory: 'categories/currentCategory'
    }),
    sanitizedCategories () {
      if(this.categories) {
        const generalCategory = {
          id: '',
          name: 'General',
          image: '/images/general-cat-bg.jpg'
        }

        const sanitizedCategories = JSON.parse(JSON.stringify(this.categories))
        sanitizedCategories.unshift(generalCategory)
        return sanitizedCategories
      }
    }
  },

  watch: {
    currentCategory (value) {
      if(value === '') {
        return this.mySwiper.slideTo(0)
      }

      const mainHeader = document.querySelector('.header').clientHeight
      const pageHeader = document.querySelector('.page-header').clientHeight

      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        return window.scrollTo({ top: mainHeader + pageHeader, behavior: 'smooth' })
      }, 500)
    }
  },

  methods: {
    ...mapMutations({
      setCurrentCategory: 'categories/SET_CURRENT_CATEGORY'
    }),
    updateCurrentCat(index) {
      this.setCurrentCategory(this.sanitizedCategories[index].id)
      this.mySwiper.slideTo(index)
      this.$emit('handlerCategory', this.sanitizedCategories[index].id)
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
      font-size: 60px;
      line-height: 1.2;
      max-width: 60rem;
      color: #fff;
      display: flex;
      align-items: center;
    }
  }

  .categories-slider {
    &__arrows {
      position: absolute;
      top: 10rem;
      left: 50%;
      transform: translateX(-50%);
      padding-right: 1rem;
      text-align: right;
      z-index: 9;
    }
  }

  .swiper-slide {
    padding-top: 8rem;
    background-size: cover;
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
