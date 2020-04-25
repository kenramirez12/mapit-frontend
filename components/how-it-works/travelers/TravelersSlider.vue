<template>
  <div class="container mx-auto h-full">
    <div class="flex flex-wrap items-center pt-10 px-4 mb-8">
      <p class="text-2xl font-light my-6 leading-tight">
        Para viajeros
      </p>
      <div class="hidden md:flex items-center ml-auto">
        <div class="travelers-swiper-pagination pr-5 font-light text-lg" />
        <el-button @click="prev" circle plain type="primary" icon="el-icon-back" class="flex" />
        <el-button @click="next" circle plain type="primary" icon="el-icon-right" class="flex" />
      </div>
    </div>
    <div v-swiper:mySwiper="swiperOption" class="h-full overflow-visible">
      <div class="swiper-wrapper">
        <div class="swiper-slide px-4">
          <div class="flex flex-wrap">
            <div class="w-full mb-3">
              <div class="step-icon">
                <img src="/images/how-it-works/travelers/steps/find-us-icon.svg">
              </div>
            </div>
            <div class="w-6/12">
              <h2 class="text-5xl font-light leading-tight mb-12">Encuentra la mejor experiencia para ti</h2>
              <p class="font-light pr-6 text-sm w-7/12">Navega por nuestra plataforma y encuentra la experiencia que más te guste dependiendo del destino o la categoría.</p>
            </div>
            <div class="w-5/12 ml-auto">
              <img src="/images/how-it-works/travelers/step-1.jpg" class="w-full image-shadow" alt="">
            </div>
          </div>
        </div>
        <div class="swiper-slide px-4">
          <div class="flex flex-wrap">
            <div class="w-full mb-3">
              <div class="step-icon">
                <img src="/images/how-it-works/travelers/steps/reserve-icon.svg">
              </div>
            </div>
            <div class="w-6/12">
              <h2 class="text-5xl font-light leading-tight mb-12">Reserva y paga de manera segura en línea</h2>
              <p class="font-light pr-6 text-sm w-9/12">Usa nuestra plataforma para reservar la experiencia y realizar el pago de forma segura. Una vez que hayas hecho la reserva, te llegará un correo automático confirmando la solicitud de reserva y el pago realizado.</p>
            </div>
            <div class="w-5/12 ml-auto">
              <img src="/images/how-it-works/travelers/step-2.jpg" class="w-full image-shadow" alt="">
            </div>
          </div>
        </div>
        <div class="swiper-slide px-4">
          <div class="flex flex-wrap">
            <div class="w-full mb-3">
              <div class="step-icon p-2">
                <img src="/images/how-it-works/travelers/steps/confirm-icon.svg">
              </div>
            </div>
            <div class="w-6/12">
              <h2 class="text-5xl font-light leading-tight mb-12">Confirmación e itinerario</h2>
              <p class="font-light pr-6 text-sm w-10/12"> Nuestro equipo confirmará la reserva en un máximo de 24 horas enviándote un correo electrónico con la confirmación y  detalles de la actividad.  En el caso que nuestro wiser no esté disponible para la fecha reservada, la reserva será cancelada y el reembolso procesado automáticamente.</p>
            </div>
            <div class="w-5/12 ml-auto">
              <img src="/images/how-it-works/travelers/step-3.jpg" class="w-full image-shadow" alt="">
            </div>
          </div>
        </div>
        <div class="swiper-slide px-4">
          <div class="flex flex-wrap">
            <div class="w-full mb-3">
              <div class="step-icon">
                <img src="/images/how-it-works/travelers/steps/enjoy-icon.svg">
              </div>
            </div>
            <div class="w-6/12">
              <h2 class="text-5xl font-light leading-tight mb-12">Disfruta de la experiencia</h2>
              <div class="font-light pr-6 text-sm w-10/12">
                <p>El día de tu experiencia te estaremos esperando en el punto de encuentro a la hora indicada. ¡Prepárate para descubrir nuestra cultura desde una perspectiva diferente!</p>
                <p>Cuando reservas con nosotros, estás optando por más que un simple tour: tendrás un real intercambio cultural con una persona experta local, creando recuerdos y anéctodas que te acompañarán para toda la vida.</p>
              </div>
            </div>
            <div class="w-5/12 ml-auto">
              <img src="/images/how-it-works/travelers/step-4.jpg" class="w-full image-shadow" alt="">
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
        slidesPerView: 'auto',
        loop: false,
        pagination: {
          el: '.travelers-swiper-pagination',
          type: 'fraction',
        }
        // on: {
        //   slideChange: (that) => {
        //     this.updateCurrentCat(this.mySwiper.activeIndex)
        //   }
        // }
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
  .image-shadow {
    box-shadow: -20px 60px 220px rgba(0, 0, 0, 0.44);
  }

  .step-icon {
    width: 65px;
    height: 65px;
    
    img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
    }
  }
</style>