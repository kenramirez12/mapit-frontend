<template>
  <div id="social-impact" class="flex flex-wrap pb-16 md:pt-16 md:mb-10">
    <div class="w-full lg:hidden">
      <h2 class="text-2xl md:text-4xl font-light mb-8">
        {{ $lang.translate(translations, 'title') }}
      </h2>
    </div>
    <div class="w-full lg:w-5/12 ml-auto lg:mr-10 mb-6 lg:mb-0 lg:order-2">
      <SocialImpactSlider />
    </div>
    <div class="mx-auto w-full md:w-5/6 lg:w-4/12 pr-14 lg:order-1">
      <h2 class="text-5xl font-light mb-12 hidden lg:block">
        {{ $lang.translate(translations, 'title') }}
      </h2>
      <div class="social-impact__content mt-6 md:mt-0">
        <div class="social-impact__icon">
          <img src="/images/social-points-icon.svg">
        </div>
        <span class="text-xs md:text-base social-impact__copy">
          {{ $lang.translate(translations, 'copy_1') }}
        </span>
      </div>
      <span class="block text-xl md:text-3xl font-light my-6">
        {{ $lang.translate(translations, 'value') }}
      </span>
      <p class="text-sm md:text-base font-light">
        {{ $lang.translate(translations, 'copy_2') }}
      </p>
      <div class="flex justify-between mt-6 pt-6 md:pr-6 mx-auto">
        <img src="~/assets/images/social-three-icon-primary.svg" class="social-icons">
        <img src="~/assets/images/social-book-icon-primary.svg" class="social-icons">
        <img src="~/assets/images/social-house-icon-primary.svg" class="social-icons">
      </div>
    </div>
  </div>
</template>

<script>
import SocialImpactSlider from '@/components/about/SocialImpactSlider'

export default {
  components: {
    SocialImpactSlider
  },
  data() {
    return {
      translations: {
        es_ES: {
          title: 'Impacto Social',
          copy_1: 'Al reservar con nosotros, estás acumulando puntos sociales:',
          copy_2: 'Con tu aporte, podemos llevar a cabo proyectos sociales en comunidades a lo largo del país:  Capacitaciones, mejora de infraestructuras, reforestación, programas de educación, y muchos más. Ayúdanos a hacerlos realidad, ¡sumáte a la causa!',
          value: '1USD = 1 Punto Social',
          feature: 'Las comunidades rurales son nuestros embajadores de la cultura, quienes comparten sus tradiciones con el mundo. Con MAPIT, los viajeros no solo participan de experiencias auténticas, sino que también contribuyen a la preservación de la cultura y a la forma de vida local.'
        },
        en_EN: {
          title: 'Social Impact',
          copy_1: 'For every experience you book with us, you are earning social points:',
          copy_2: 'With your contribution, we can support social projects in communities throughout the country such as trainings, infrastructure improvement, reforestation, education programs, and many others. Join our cause and help us turn our projects into reality!',
          value: '1USD = 1 Social Point',
          feature: 'Rural communities are our cultural ambassadors, who, through our experiences, share their traditions with the world. With MAP IT, travelers not only engage in authentic experiences, but also contribute to preserve their culture and local traditions.'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .social-icons {
    width:60px;

    @media screen and (min-width: 768px) {
      width:80px;
    }
  }

  .social-impact {
    &__content {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
    }

    &__icon {
      width: 50px;
      margin-right: 1rem;

      @media screen and (min-width: 768px) {
        width: 70px;
        margin-right: 2rem;
      }

      img {
        width: 100%;
        height: auto;
      }
    }

    &__copy {
      width: calc(100% - 70px - 2rem);
      font-weight: 300;
    }
  }
</style>