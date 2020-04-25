<template>
  <div id="social-impact" class="flex flex-wrap py-16 mb-10">
    <div class="w-4/12 pr-14">
      <h2 class="text-5xl font-light mb-12">
        {{ $lang.translate(translations, 'title') }}
      </h2>
      <div class="social-impact__content">
        <div class="social-impact__icon">
          <img src="/images/social-points-icon.svg" width="65">
        </div>
        <span class="social-impact__copy">
          {{ $lang.translate(translations, 'copy_1') }}
        </span>
      </div>
      <span class="block text-3xl font-light my-6">
        {{ $lang.translate(translations, 'value') }}
      </span>
      <p class="font-light">
        {{ $lang.translate(translations, 'copy_2') }}
      </p>
      <div class="flex justify-between mt-6 pt-6 pr-6">
        <img src="~/assets/images/social-three-icon-primary.svg" alt="" style="width:80px">
        <img src="~/assets/images/social-book-icon-primary.svg" alt="" style="width:80px">
        <img src="~/assets/images/social-house-icon-primary.svg" alt="" style="width:80px">
      </div>
    </div>
    <div class="w-5/12 ml-auto mr-10">
      <div class="social-impact-slider">
        <div v-swiper:SocialImpactSwiper="swiperOption" class="h-full">
          <div class="swiper-wrapper">
            <div
              v-for="(feature, n) in features"
              :key="'social_slide_' + n"
              class="swiper-slide"
            >
              <div class="social-impact-item">
                <div class="social-impact-item__col-1">
                  <img class="social-impact-item__human -mb-6" src="/images/about/social-human-01.svg">
                </div>
                <div class="social-impact-item__col-2">
                  <p class="text-lg font-light mt-12">
                    {{ $lang.translate(feature.translations, 'description' )}}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="social-swiper-pagination"></div>
          <div class="social-swiper-button-prev">
            <img src="~/assets/images/arrow-left.svg">
          </div>
          <div class="social-swiper-button-next">
            <img src="~/assets/images/arrow-right.svg">
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
      features: [
        {
          translations: {
            es_ES: {
              description: 'Las comunidades rurales son nuestros embajadores de la cultura, quienes comparten sus tradiciones con el mundo. Con MAP IT, los viajeros no solo participan de experiencias auténticas, sino que también contribuyen a la preservación de la cultura y a la forma de vida local.'
            },
            en_EN: {
              description: 'Rural communities are our cultural ambassadors, who, through our experiences, share their traditions with the world. With MAP IT, travelers not only engage in authentic experiences but also contribute to preserve their culture and local traditions. '
            }
          }
        },
        {
          translations: {
            es_ES: {
              description: 'Nos basamos en el comercio justo, siendo una fuente de ingreso complementaria para las comunidades y sus guías. Al viajar con nosotros, estás colaborando directamente a la economía local, mejora de la calidad de vida, al desarrollo sostenible y generación de trabajos.'
            },
            en_EN: {
              description: 'We support fair trade, by becoming a complementary source of income for the communities and hosts. By traveling with us, you are contributing directly to the local economy, improvement of quality of life, sustainable development, and job opportunities generation.'
            }
          }
        },
        {
          translations: {
            es_ES: {
              description: 'Trabajamos de la mano con asociaciones rurales, las cuales promueven el emprendimiento y turismo sostenible en comunidades. Estas tienen como objetivo desarrollarlas y  reinvertir un porcentaje de sus ingresos en capacitaciones y mejora de su calidad de vida.'
            },
            en_EN: {
              description: 'We work together with rural associations that promote travel activities and sustainable tourism in communities. Their goal is to develop them and reinvest a percentage of their incomes in training and improving livelihoods of locals.'
            }
          }
        },    
        {
          translations: {
            es_ES: {
              description: 'Promovemos el empoderamiento e inclusión de la mujer, pues 7 de cada 10 de las experiencias MAP IT son guiadas por ellas. Buscamos que tengan un rol de liderazgo en la industria turística, brindándoles una oportunidad laboral y de desarrollo.'
            },
            en_EN: {
              description: 'We promote women empowerment and inclusion. 7 out of 10 MAP IT experiences are guided by women. We give them leadership roles in the tourism industry, while providing job and development opportunities.'
            }
          }
        },
        {
          translations: {
            es_ES: {
              description: 'Por último, apoyamos al cuidado del medio ambiente a través de una cultura de reciclaje, y de experiencias que promueven el turismo sostenible.'
            },
            en_EN: {
              description: 'Lastly, we care about our environment  by adopting a recycling and green culture, and through experiences that promote sustainable tourism.'
            }
          }
        }
      ],
      translations: {
        es_ES: {
          title: 'Impacto Social',
          copy_1: 'Al reservar con nosotros, estás acumulando puntos sociales:',
          copy_2: 'Promovemos el empoderamiento e inclusión de la mujer, pues 6 de cada 10 de las experiencias MAP IT son guiadas por ellas. Buscamos que tengan un rol de liderazgo en la industria turística, brindándoles una oportunidad laboral y de desarrollo.',
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
      },
      swiperOption: {
        slidesPerView: 'auto',
        loop: false,
        pagination: {
          el: '.social-swiper-pagination',
          type: 'fraction',
        },
        navigation: {
          nextEl: '.social-swiper-button-next',
          prevEl: '.social-swiper-button-prev',
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .social-swiper-pagination {
    bottom: 20px;
    position: absolute;
    color: #fff;
    text-align: center;
    font-size: 90%;
  }
  .social-swiper-button-prev,
  .social-swiper-button-next {
    position: absolute;
    bottom: 24px;
    z-index: 2;

    img {
      height: 14px;
    }
  }
  .social-swiper-button-prev {
    left: calc(50% - 25px - 50px);
  }
  .social-swiper-button-next {
    right: calc(50% - 25px - 50px);
  }
  .social-impact-item {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0 2.5rem;

    &__col-1, &__col-2 {
      position: relative;
      flex: 1;
    }

    &__col-2 {
      text-align: center;
    }

    &__human {
      max-width: 200px;
      width: 50%;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .social-impact-slider {
    width: 100%;
    max-width: 455px;
    height: 700px;
    background: linear-gradient(to bottom, #F6F6F6 50%, #37d7d7 50%);
    border-radius: 2rem;
    margin-left: auto;
  }

  .social-impact {
    &__content {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
    }

    &__icon {
      width: 70px;
      margin-right: 2rem;

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