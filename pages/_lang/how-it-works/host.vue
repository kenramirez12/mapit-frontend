<template>
  <div class="container mx-auto py-12 px-6 sm:px-4">
    <div class="flex flex-wrap">
      <div class="w-full md:w-5/12 flex flex-col">
        <h5 class="font-light">
          {{ $lang.translate(translations, 'for_host') }}
        </h5>
        <h1 class="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-light leading-tight my-auto mt-3 md:mt-12 lg:mt-0">
          {{ $lang.translate(translations, 'title') }}
        </h1>
      </div>
      <div class="w-full md:w-6/12 lg:w-5/12 ml-auto my-6 md:my-0">
        <img src="/images/how-it-works/hosts/main_image.jpg" class="w-full shadow-image" alt="">
      </div>
    </div>
    <div class="flex-wrap mt-4 mb-12 hidden md:flex">
      <div class="w-full md:w-8/12 mx-auto flex items-center">
        <img src="/images/how-it-works/hosts/human_1.svg" class="human-1 hidden md:block">
        <h3 class="text-center font-light text-xl md:text-2xl lg:text-3xl">
          {{ $lang.translate(translations, 'subtitle') }}
        </h3>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-full md:w-5/12 md:px-6 my-5 md:my-0">
        <p class="text-sm md:text-base font-light mb-4 md:mb-0">
          {{ $lang.translate(translations, 'copy') }}
        </p>
      </div>
      <div class="w-full md:w-6/12 lg:w-5/12 mx-auto">
        <HostContactForm />
      </div>
    </div>
  </div>
</template>

<script>
import HostContactForm from '@/components/how-it-works/host/ContactForm'

export default {
  components: {
    HostContactForm
  },
  data() {
    return {
      translations: {
        es_ES: {
          for_host: 'Para anfitriones',
          title: '¡Comparte tu experiencia con viajeros de todo el mundo!',
          subtitle: '¡Únete a nuestra comunidad y ayúdanos a promover el turismo responsable y de impacto!',
          copy: 'MAP IT conecta a viajeros con experiencias únicas y culturales, guiadas por expertos locales como tú. Si quieres convertirte en uno de ellos, y tienes alguna actividad en mente que vaya de la mano con nuestro propósito, ¿qué estás esperando? Mándanos tu propuesta llenando el siguiente formulario'
        },
        en_EN: {
          for_host: 'For hosts',
          title: 'Share your experience with travelers from all over the world!',
          subtitle: 'Join our community and help us promote responsible and sustainable tourism',
          copy: 'MAPIT connects travelers with unique and cultural experiences, guided by local experts like you. If you want to be part of them, and if you have in mind an activity that goes hand in hand with our purpose, what are you waiting for? Send us your information through the following form.'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .human-1 {
    height: 240px;
    margin-left: -190px;
    
    @media screen and (min-width: 1024px) {
      height: 260px;
      margin-left: -220px;
    }
  }

  .shadow-image {
    box-shadow: -10px 10px 60px rgba(0, 0, 0, 0.15);
    width: calc(100% + 3rem);
    max-width: unset!important;
    margin-left: -1.5rem;

    @media screen and (min-width: 640px) {
      width: 100%;
      max-width: 100%;
      margin-left: 0;
    }

    @media screen and (min-width: 768px) {
      box-shadow: -20px 60px 220px rgba(0, 0, 0, 0.44);
    }
  }
</style>