<template>
  <div id="overview-section" class="container mx-auto px-4 pt-6 pb-super">
    <div class="overview py-6">
      <div class="flex flex-wrap my-10 py-10">
        <div class="w-5/12 pr-6">
          <p class="dark-gray text-3xl ">{{ $lang.apiTranslate(experience.translations, 'description') }}</p>
          <p
            v-if="'host' in experience && experience.host.constructor === Object"
            class="flex items-center my-6 py-6 font-light text-xl">
            <img
              v-if="'path' in experience.host.avatar"
              class="wiser-avatar mr-3"
              :src="$imagePath(experience.host.avatar.path)" />
            <span>Wiser: {{ $lang.apiTranslate(experience.host.translations, 'fullname') }}</span>
          </p>
          <div v-else class="my-6 py-6" />
          <ul
            v-for="(feature, n) in translations.features"
            :key="'feature_' + n"
            class="checkbox-list">
            <li class="checkbox-list__item mb-4 text-base">
              <img src="~/assets/images/checkbox-icon.svg" class="checkbox-list__icon">
              {{ feature }}
            </li>
          </ul>
        </div>
        <div class="w-6/12 ml-auto">
          <div class="">
            <div class="flex items-center mb-3">
              <img src="~/assets/images/include-icon.svg" style="height:64px" class="ml-0 ">
              <span class="dark-gray text-2xl font-light ml-8">{{ $lang.translate(pageTranslations, 'included') }}</span>
              
            </div>
            <p class="dark-gray mb-5 ml-24 text-base leading-6">
              {{ $lang.apiTranslate(experience.translations, 'includes') }}
            </p>
          </div>
          <div>
          <el-carousel
            trigger="click"
            arrow="always"
            class="overview-slider shadow-xl mt-16"
            :style="`-sliderLength:'${experience.slider_images > 9 ? experience.slider_images : '0' + experience.slider_images}'`"
            >
            <el-carousel-item
              v-for="(slide, n) in experience.slider_images"
              :key="'slide_' + n"
            >
              <img
                :src="$imagePath(slide.path)"
                alt="">
            </el-carousel-item>
          </el-carousel>
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
.wiser-avatar {
  width: 38px;
  height: 38px;
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
  box-shadow: 0px 0px 100px rgba(0, 0, 0, 0.33);
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