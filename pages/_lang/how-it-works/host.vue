<template>
  <div class="container mx-auto py-12 px-4">
    <div class="flex flex-wrap">
      <div class="w-5/12 flex flex-col">
        <h5 class="font-light">Para anfitriones</h5>
        <h1 class="text-5xl font-light leading-tight my-auto">¡Comparte tu experiencia con viajeros de todo el mundo!</h1>
      </div>
      <div class="w-5/12 ml-auto">
        <img src="/images/how-it-works/hosts/main_image.jpg" class="w-full shadow-image" alt="">
      </div>
    </div>
    <div class="flex flex-wrap mt-4 mb-12">
      <div class="w-8/12 mx-auto flex items-center">
        <img src="/images/how-it-works/hosts/human_1.svg" class="human-1">
        <h3 class="text-center font-light text-3xl">¡Únete a nuestra comunidad y ayúdanos a promover el turismo responsable y de impacto!</h3>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-5/12 px-6">
        <p class="font-light">MAP IT conecta a viajeros con experiencias únicas y culturales, guiadas por expertos locales como tú. Si quieres convertirte en uno de ellos, y tienes alguna actividad en mente que vaya de la mano con nuestro propósito, ¿qué estás esperando? Mándanos tu propuesta llenando el siguiente formulario.</p>
      </div>
      <div class="w-5/12 mx-auto">
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
  }
}
</script>

<style scoped>
  .human-1 {
    height: 260px;
    margin-left: -220px;
  }

  .shadow-image {
    box-shadow: -20px 60px 220px rgba(0, 0, 0, 0.44);
  }
</style>