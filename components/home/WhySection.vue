<template>
  <div id="why-us" class="why-us-section py-6">
    <div class="container mx-auto my-6 py-6 px-6 sm:px-4">
      <h2 class="text-2xl md:text-4xl font-light text-center text-white mb-6 pb-6">
        {{ $lang.translate(translations, 'why_mapit') }}
      </h2>
      <div class="why-container--responsive pt-6">
        <div class="relative">
          <div v-swiper:WhySwiper="swiperOption" class="pb-6">
            <div class="swiper-wrapper">
              <div
                v-for="(feature, n) in features"
                :key="'feature_' + n"
                class="swiper-slide">
                <div class="w-100 why-item__icon">
                  <img :src="`/images/home/${feature.icon}`" class="mx-auto">
                </div>
                <div class="d-block mt-4 why-item__label">
                  {{ $lang.translate(translations, feature.label) }}
                </div>
              </div>
            </div>
            <div class="why-swiper-button-prev">
              <img src="/images/home/left-arrow-white.svg">
            </div>
            <div class="why-swiper-button-next">
              <img src="/images/home/right-arrow-white.svg">
            </div>
          </div>
        </div>
      </div>
      <div class="why-container pt-6">
        <div
          v-for="(feature, n) in features"
          :key="'features_' + n"
          class="flex-1 pt-6 why-item">
          <div class="w-100 why-item__icon">
            <img :src="`/images/home/${feature.icon}`" class="mx-auto" style="width:90%">
          </div>
          <div class="d-block mt-4 why-item__label">
            {{ $lang.translate(translations, feature.label) }}
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
      features: [
        {
          icon: 'why-01.svg',
          label: 'why_mapit_1'
        },
        {
          icon: 'why-02.svg',
          label: 'why_mapit_2'
        },
        {
          icon: 'why-03.svg',
          label: 'why_mapit_3'
        },
        {
          icon: 'why-04.svg',
          label: 'why_mapit_4'
        },
      ],
      swiperOption: {
        loop: true,
        slidesPerView: 'auto',
        navigation: {
          nextEl: '.why-swiper-button-next',
          prevEl: '.why-swiper-button-prev',
        }
      }
    }
  },
  created() {
    if(process.client) {
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  destroyed() {
    if(process.client) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  },
  mounted() {
    // if(currentScrollTop >= whySectionEnd) {
      // document.body.style.backgroundColor = `rgba(${primary[0]}, ${primary[1]}, ${primary[2]})`
      // console.log('ya deberia empezar a cambiarse')
    // } else if(currentScrollTop >= (whySectionInit - currentWindowHeight/2)) {
      // document.body.style.backgroundColor = 'rgba(255, 255 ,255)'
      // console.log('se deberia haber pintado media pantalla atras')
    // }
  },
  methods: {
    handleScroll() {
      const whySection = document.getElementById('why-us')
      const currentScrollTop = document.documentElement.scrollTop
      const whySectionInit = whySection.offsetTop 
      const whySectionEnd = whySectionInit + whySection.clientHeight 
      const currentWindowHeight = document.documentElement.clientHeight
      this.getBgColor(whySectionInit, whySectionEnd, currentWindowHeight, currentScrollTop)
    },
    getBgColor (init, end, windowHeight, scrollPosition) {
      const windowPosStart = windowHeight / 2
      const changeInitStart = init - windowPosStart
      const changeInitEnd = init
      const changeEndStart = end
      const changeEndEnd = end - windowPosStart

      if(scrollPosition >= changeInitStart && scrollPosition <= changeEndEnd) {
        document.body.classList.add('primary')
        // return document.body.style.backgroundColor = 'rgba(55, 215, 215)'
      } else {
        document.body.classList.remove('primary')
        // return document.body.style.backgroundColor = 'rgba(255, 255, 255)'
      }

      // if(scrollPosition < changeInitStart || scrollPosition > changeEndEnd) {
      //   console.log('primera validacion')
      //   return document.body.style.backgroundColor = 'rgba(255, 255, 255)'
      // }

      // const white = { r: 255, g: 255, b: 255 }
      // const primary = { r: 55, g: 215, b: 215 }

      // const valuePerPixel = {
      //   r: (white.r - primary.r) / windowPosStart,
      //   g: (white.g - primary.g) / windowPosStart,
      //   b: (white.b - primary.b) / windowPosStart
      // }

      // if(scrollPosition > changeInitStart) {
      //   const difference = scrollPosition - changeInitStart
      //   if(difference >= windowPosStart) return
      //   // console.log('entramos difference', difference)
      //   document.body.style.backgroundColor = `
      //     rgba(
      //       ${white.r - (valuePerPixel.r * difference)},
      //       ${white.g - (valuePerPixel.g * difference)},
      //       ${white.b - (valuePerPixel.b * difference)})
      //     `
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
  .why-us-section {
    height: 768px;
    display: flex;
    align-items: center;
  }
  .why-swiper-button-prev,
  .why-swiper-button-next {
    position: absolute;
    bottom: 1.2rem;
    z-index: 2;

    @media screen and (min-width: 590px) {
        width: 1rem;
      }

    img {
      width: 30px;

      @media screen and (min-width: 590px) {
        width: 36px;
      }
    }
  }
  .why-swiper-button-prev {
    left: 0;

    @media screen and (min-width: 590px) {
      left: calc(50% - 150px);
    }
  }
  .why-swiper-button-next {
    right: 0;

    @media screen and (min-width: 590px) {
      right: calc(50% - 150px);
    }
  }

  .why-container,
  .why-container--responsive {
    flex-wrap: wrap;
    width: 100%;
    max-width: 1280px;
    margin-right: auto;
    margin-left: auto;

    @media screen and (min-width: 768px) {
      width: calc(100% - 4rem);
    }
  }

  .why-container {
    display: none;

    @media screen and (min-width: 700px) {
      display: flex;
    }
  }

  .why-container--responsive {
    @media screen and (min-width: 700px) {
      display: none;
    }
  }

  .why-item {
    transition: all 0.25s;

    &__label {
      font-size: 1rem;
      color: #fff;
      line-height: 1.2;
      font-weight: 300;
      text-align: center;
      padding: 0 1rem;

      @media screen and (min-width: 590px) {
        font-size: 1.1rem;
      }

      @media screen and (min-width: 768px) {
        font-size: 1.25rem;
      }
    }

    &:hover {
      transform: scale(1.1);
    }
  }
  .why-item__icon {
    margin-bottom: 3rem;
    transition: all 0.3s cubic-bezier(.17,1.01,.69,1.19);

    @media screen and (min-width: 700px) {
      transform: scale(.1);
    }

    img {
      width: 60%;
      max-width: 230px;

      @media screen and (min-width: 700px) {
        width: 90%;
        max-width: unset;
      }
    }
  }

  body.primary {
    .why-item {
      .why-item__icon {
        transform: scale(1);
      }

      &:nth-child(2) {
        .why-item__icon {
          transition-delay: .15s;
        }
      }

      &:nth-child(3) {
        .why-item__icon {
          transition-delay: .25s;
        }
      }

      &:nth-child(4) {
        .why-item__icon {
          transition-delay: .35s;
        }
      }
    }
  }
</style>

<style>
  body {
    transition: all 0.3s;
  }

  body.primary {
    background-color: rgba(55, 215, 215)!important;
  }
</style>
