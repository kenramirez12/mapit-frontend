<template>
  <div class="page-header mt-10 md:mt-0">
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
          <div class="container m-auto px-5 md:px-4">
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
      isLoading: false
    }
  },

  computed: {
    ...mapGetters({
      categories: 'categories/categories'
    }),
    currentCategory() {
      return this.$store.state.experiences.filters.category
    },
    sanitizedCategories () {
      if(this.categories) {
        const generalCategory = {
          id: '',
          name: 'General',
          image: '/images/default-category-bg.jpg'
        }

        const sanitizedCategories = JSON.parse(JSON.stringify(this.categories))
        sanitizedCategories.unshift(generalCategory)
        return sanitizedCategories
      }
    }
  },

  watch: {
    categories (value) {
      if(value) {
        if('category' in this.$route.query) {
          this.updateCurrentSlide(this.$route.query.category)
        }
      }
    },
    currentCategory (value) {
      if(value === '') {
        return this.mySwiper.slideTo(0)
      } else {
        const currentIndex = this.sanitizedCategories.findIndex(item => {
          return item.id === value
        })

        if(currentIndex > -1) {
          this.mySwiper.slideTo(currentIndex)
        }
      }

      const mainHeader = document.querySelector('.header').clientHeight
      const pageHeader = document.querySelector('.page-header').clientHeight

      this.isLoading = false
      // setTimeout(() => {
      //   this.isLoading = false
      //   return window.scrollTo({ top: mainHeader + pageHeader, behavior: 'smooth' })
      // }, 500)
    }
  },

  created() {
    this.setFilter('category', '')
  },

  mounted() {
    if(Object.keys(this.$route.query).length > 0 &&
      'category' in this.$route.query &&
      this.categories) {
      this.updateCurrentSlide(this.$route.query.category)
    }
  },

  methods: {
    ...mapMutations({
      setFilter: 'experiences/SET_FILTER'
    }),

    updateCurrentSlide(catId) {
      const catIndex = this.sanitizedCategories.findIndex(item => {
        return item.id === parseInt(catId)
      })
      
      if(catIndex > -1) {
        this.mySwiper.slideTo(catIndex)
      }
    },

    updateCurrentCat(index) {
      this.setFilter({ prop: 'category', value: this.sanitizedCategories[index].id })
      this.setFilter({ prop: 'page', value: 1 })
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
    position: relative;
    height: 440px;

    @media screen and (min-width: 768px) {
      height: 640px;
    }

    &__title {
      font-weight: 300;
      font-size: 40px;
      line-height: 1.2;
      max-width: 60rem;
      color: #fff;
      display: flex;
      align-items: center;

      @media screen and (min-width: 768px) {
        font-size: 60px;
      }
    }
  }

  .categories-slider {
    &__arrows {
      position: absolute;
      top: 9rem;
      left: 50%;
      transform: translateX(-50%);
      padding-right: 1rem;
      text-align: right;
      z-index: 9;
      display: none;

      @media screen and (min-width: 768px) {
        display: block;
      }
    }
  }

  .swiper-slide {
    padding-top: 8rem;
    background-size: cover;
  }

  .categories-carousel {
    display: none;
    border-bottom: 1px solid rgba(#fff, .5);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5rem;
    z-index: 9;

    @media screen and (min-width: 768px) {
      display: flex;
    }
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
      line-height: 1.2;
      position: absolute;
      bottom: 1rem;
      display: block;
      padding-right: .5rem;
      padding-bottom: 1rem;
      color: #fff;
      transition: all .15s;
    }

    &:hover::before {
      padding-bottom: 1.5rem;
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
