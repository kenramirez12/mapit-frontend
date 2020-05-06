<template>
  <div id="overview-section" class="container mx-auto px-6 md:px-4 md:pt-6 pb-super">
    <div class="overview pb-6 md:pt-6">
      <div class="flex flex-wrap mt-10 md:pb-10 pt-10 md:pb-10">
        <div class="w-full md:w-6/12 xl:w-5/12 pr-6">
          <p class="dark-gray text-xl md:text-2xl xl:text-3xl font-light">
            {{ $lang.apiTranslate(experience.translations, 'description') }}
          </p>
          <p
            v-if="'host' in experience && experience.host.constructor === Object"
            class="flex items-center my-6 py-6 font-light text-lg md:text-xl">
            <img
              v-if="'path' in experience.host.avatar"
              class="wiser-avatar mr-3"
              :src="$imagePath(experience.host.avatar.path)" />
            <span>Wiser: {{ $lang.apiTranslate(experience.host.translations, 'fullname') }}</span>
          </p>
          <div v-else class="md:my-6 py-6" />
          <ul class="checkbox-list mb-10 md:mb-0">
            <li
              v-for="(feature, n) in translations.features"
              :key="'feature_' + n"
              class="checkbox-list__item mb-4 text-sm md:text-base font-light">
              <img src="~/assets/images/checkbox-icon.svg" class="checkbox-list__icon">
              {{ feature }}
            </li>
          </ul>
        </div>
        <div class="w-full md:w-6/12 ml-auto">
          <div class="">
            <div class="flex items-center mb-5 md:mb-3">
              <img src="~/assets/images/include-icon.svg" style="height:32px" class="md:hidden ml-0">
              <img src="~/assets/images/include-icon.svg" style="height:64px" class="hidden md:block ml-0">
              <span class="dark-gray text-xl sm:text-2xl font-light ml-4 md:ml-8">
                {{ $lang.translate(pageTranslations, 'included') }}
              </span>
            </div>
            <p class="dark-gray mb-5 md:ml-24 text-sm sm:text-base leading-6">
              {{ $lang.apiTranslate(experience.translations, 'includes') }}
            </p>
          </div>
          <div class="mt-12 md:mt-16">
            <div v-swiper:mySwiper="swiperOption" class="overview-slider__container">
              <div class="swiper-wrapper overview-slider">
                <div
                  v-for="(slide, n) in experience.slider_images"
                  :key="'slide_' + n"
                  class="swiper-slide"
                >
                  <img
                    :src="$imagePath(slide.path)"
                    class="w-full">
                </div>
              </div>
              <div class="swiper-pagination" />
              <div class="swiper-button-prev">
                <img src="~/assets/images/arrow-left.svg">
              </div>
              <div class="swiper-button-next">
                <img src="~/assets/images/arrow-right.svg">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    experience: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        loop: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      },
      pageTranslations: {
        'es_ES': {
          included: 'Qué incluye'
        },
        'en_EN': {
          included: 'What\'s included'
        }
      }
    }
  },
  computed: {
    translations () {
      const translations = this.experience.translations.find(item => {
        return item.iso_lang === this.$store.getters.currentLang.iso_lang
      })

      return translations
    }
  }
}
</script>

<style lang="scss">
.swiper-pagination {
  bottom: 20px!important;
}

.swiper-button-prev,
.swiper-button-next {
  top: auto;
  bottom: 0;
  background-image: none;
  color: #fff;
  font-size: 2rem;
  line-height: 1;
  height: 37px!important;
}
.swiper-button-prev {
  left: 5%;
  @media screen and (min-width: 768px) {
    left: 15%;
  }
}
.swiper-button-next {
  right: 5%;
  @media screen and (min-width: 768px) {
    right: 15%;
  }
}
.swiper-pagination-bullet {
  width: 20px;
  height: 3px;
  border-radius: 0!important;
  background: #fff;
  opacity: .8;
  margin: 0 2px!important;

  &:hover {
    opacity: 1;
  }
}

.swiper-pagination-bullet-active,
.swiper-pagination-bullet-active:hover {
  background: var(--primary);
}

.swiper-button-prev,
.swiper-button-next {
  height: 20px;
}

.wiser-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
}

.dark-gray{
   color: #484848;
}

.el-carousel__button {
  opacity: 1;
}

.overview-slider {
  // box-shadow: 0px 0px 100px rgba(0, 0, 0, 0.33);
  &__container {
    box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.15);
    width: calc(100% + 3rem);
    margin-left: -1.5rem;

    @media screen and (min-width: 560px) {
      box-shadow: 0px 0px 100px rgba(0, 0, 0, 0.33);
      width: 100%;
      margin-left: 0;
    }
  }
}

.el-carousel__indicators {
  &::before,
  &::after {
    position: absolute;
    display: block;
    color: #fff;
    line-height: 1;
    top: .4rem;
  }

  &::before {
    // content: '01';
    left: -1.7rem;
  }

  &::after {
    content: var(--sliderLength);
    right: -2rem;
  }
}

.el-carousel__indicator--horizontal {
  padding-right: 0;
  padding-left: 0;
}

.el-carousel__indicator.is-active {
  .el-carousel__button {
    background-color: var(--primary);
  }
}
</style>