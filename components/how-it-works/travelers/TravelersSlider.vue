<template>
  <div class="flex flex-wrap">
    <div class="container m-auto pb-8 md:pt-6 md:pb-6">
      <div class="flex flex-wrap items-center px-6 lg:px-4 mb-4 md:mb-8 travelers-slider-container">
        <p class="text-sm md:text-xl lg:text-2xl font-light my-6 lg:my-0 leading-tight">
          {{ $lang.translate(translations, 'for_travelers') }}
        </p>
        <div class="flex items-center ml-auto">
          <div class="travelers-swiper-pagination pr-5 font-light text-sm md:text-base lg:text-lg" />
          <div class="flex items-center md:hidden">
            <el-button @click="prev" circle size="mini" type="primary" icon="el-icon-back" class="flex" />
            <el-button @click="next" circle size="mini" type="primary" icon="el-icon-right" class="flex" />
          </div>
          <div class="hidden items-center md:flex">
            <el-button @click="prev" circle plain type="primary" icon="el-icon-back" class="flex" />
            <el-button @click="next" circle plain type="primary" icon="el-icon-right" class="flex" />
          </div>
        </div>
      </div>
      <div v-swiper:mySwiper="swiperOption" class="h-full overflow-visible">
        <div class="swiper-wrapper">
          <div
            v-for="(step, n) in steps"
            :key="'step_' + n"
            class="swiper-slide px-6 lg:px-4">
            <div class="flex flex-wrap">
              <div class="w-full mb-5 md:mb-3">
                <div class="step-icon">
                  <img :src="`/images/how-it-works/travelers/steps/${step.icon}`">
                </div>
              </div>
              <div class="w-full md:w-5/12 lg:w-6/12">
                <h2 class="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-tight mb-4 md:mb-8 lg:mb-12 slider-title">
                  {{ $lang.translate(step.translations, 'title') }}
                </h2>
                <img
                  :src="`/images/how-it-works/travelers/${step.image}`"
                  class="image-shadow md:hidden mb-6">
                <p
                  :class="`w-full lg:${step.description_width} font-light lg:pr-6 text-sm`"
                  v-html="$lang.translate(step.translations, 'description')" />
              </div>
              <div class="md:w-6/12 ll:w-5/12 ml-auto hidden md:block">
                <img
                  :src="`/images/how-it-works/travelers/${step.image}`"
                  class="image-shadow">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppFooter from '@/layouts/components/AppFooter'

export default {
  components: {
    AppFooter
  },
  data() {
    return {
      steps: [
        {
          icon: 'find-us-icon.svg',
          image: 'step-1.jpg',
          description_width: 'w-7/12',
          translations: {
            es_ES: {
              title: 'Encuentra la mejor experiencia para ti',
              description: 'Navega por nuestra plataforma y encuentra la experiencia que más te guste dependiendo del destino o la categoría.'
            },
            en_EN: {
              title: 'Find the best experience for you',
              description: 'Browse through our platform and find the experience you like the most, based on your destination or its category.'
            }
          }
        },
        {
          icon: 'reserve-icon.svg',
          image: 'step-2.jpg',
          description_width: 'w-9/12',
          translations: {
            es_ES: {
              title: 'Reserva y paga de manera segura en línea',
              description: 'Usa nuestra plataforma para reservar la experiencia y realizar el pago de forma segura. Una vez que hayas hecho la reserva, te llegará un correo automático confirmando la solicitud de reserva y el pago realizado.'
              },
            en_EN: {
              title: 'Book it and pay for it safely online',
              description: 'Use our platform to book your experience and pay for it through our secure payment system. After you make the booking, you will receive an automated mail confirming your request and payment.'
            }
          }
        },
        {
          icon: 'confirm-icon.svg',
          image: 'step-3.jpg',
          description_width: 'w-10/12',
          translations: {
            es_ES: {
              title: 'Confirmación e itinerario',
              description: 'Nuestro equipo confirmará la reserva en un máximo de 24 horas enviándote un correo electrónico con la confirmación y  detalles de la actividad.  En el caso que nuestro wiser no esté disponible para la fecha reservada, la reserva será cancelada y el reembolso procesado automáticamente.'
            },
            en_EN: {
              title: 'Confirmation and itinerary',
              description: 'Our team will confirm your booking within the following 24 hrs, by sending you a mail with the booking confirmation and the activity details. In case our wiser is not available for the selected date the booking will be canceled and we will automatically issue a refund.'
            }
          }
        },
        {
          icon: 'enjoy-icon.svg',
          image: 'step-4.jpg',
          description_width: 'w-10/12',
          translations: {
            es_ES: {
              title: 'Disfruta de la experiencia',
              description: '<p class="mb-3">El día de tu experiencia te estaremos esperando en el punto de encuentro a la hora indicada. ¡Prepárate para descubrir nuestra cultura desde una perspectiva diferente!</p><p>Cuando reservas con nosotros, estás optando por más que un simple tour: tendrás un real intercambio cultural con una persona experta local, creando recuerdos y anéctodas que te acompañarán para toda la vida.</p>'
            },
            en_EN: {
              title: 'Enjoy your experience',
              description: `<p class="mb-3">Con the experience day, we will be waiting for you at the scheluded time on the meeting point. Get ready to discover our culture from a local perspective!</p><p>When booking with us, you are choosing more than just a tour, you are getting a unique cultural exchange experience, creating lifetime memories.</p>`
            }
          }
        },
      ],
      translations: {
        es_ES: {
          for_travelers: 'Para viajeros'
        },
        en_EN: {
          for_travelers: 'For travelers'
        }
      },
      swiperOption: {
        slidesPerView: 'auto',
        loop: false,
        pagination: {
          el: '.travelers-swiper-pagination',
          type: 'fraction',
        }
      }
    }
  },
  methods: {
    prev() {
      this.mySwiper.slidePrev()
    },
    next() {
      this.mySwiper.slideNext()
    }
  }
}
</script>

<style lang="scss" scoped>
  .slider-title {
    height: 50px;
    
    @media screen and (min-width: 768px) {
      height: auto;
    }
  }

  .travelers-slider-container {
    // transform: translateY(calc(-80px + 1.5rem));

    // @media screen and (min-width: 768px) {
    //   transform: translateY(0);
    // }
  }

  .image-shadow {
    box-shadow: -10px 10px 60px rgba(0, 0, 0, 0.15);
    width: 100%;

    @media screen and (min-width: 1024px) {
      box-shadow: -20px 60px 220px rgba(0, 0, 0, 0.33);
    }
  }

  .step-icon {
    width: 55px;
    height: 55px;

    @media screen and (min-width: 1024px) {
      width: 65px;
      height: 65px;
    }
    
    img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
    }
  }
</style>