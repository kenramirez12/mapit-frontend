<template>
  <div class="flex flex-wrap">
    <div class="w-6/12 font-light text-xl pt-12">
      <p class="mb-6">{{ $lang.translate(translations, 'copy_1') }}</p>
      <p class="mb-6">{{ $lang.translate(translations, 'copy_2') }}</p>
    </div>
    <div class="w-5/12 ml-auto">
      <img src="/images/about/about-us-vertical.jpg" class="about-vertical shadow-lg">
      <img src="/images/about/about-us-horizontal.jpg" class="about-horizontal shadow-lg">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      translations: {
        es_ES: {
          copy_1: 'MAP IT es un marketplace que conecta a los viajeros con experiencias únicas con expertos locales en distintas ciudades del Perú. Con nosotros, puedes encontrar cosas que hacer en Cusco, Lima, Puno, y muchos destinos más, y reservarlas en línea.',
          copy_2: 'Nuestras actividades te permitirán descubrir la ciudad desde una perspectiva más local, divertida, y real. Compartirás con personas locales, quienes a través de experiencias, te enseñarán la riqueza y diversidad de su cultura, ya sea aprendiendo a preparar recetas típicas peruanas con un chef, remando en una canoa en medio del lago Titicaca con un aventurero, o creando tus propias cerámicas con un artesano en una comunidad rural lejos de la ciudad.'
        },
        en_EN: {
          copy_1: ' MAP IT is a marketplace that connects travelers to unique experiences with local insiders in many locations in Peru. With us, you can find things to do in Cusco, Lima, Puno, and beyond, and book them online.',
          copy_2: 'On every tour, you\'ll get a fun and local perspective of the city, from street food to street art, hidden gems and all the best local cultural spots. We help you connect with people in authentic ways, whether you are learning food traditions from a chef, rowing in the middle of Lake Titicaca, or creating your own ceramics with a craftsman from a local community.'
        }
      }
    }
  }
}
</script>

<style scoped>
  .about-vertical {
    width: 100%;
    box-shadow: -20px 60px 220px rgba(0, 0, 0, 0.44);
    position: relative;
    z-index: 1;
  }

  .about-horizontal {
    box-shadow: -20px 60px 220px rgba(0, 0, 0, 0.44);
    height: 355px;
    width: auto;
    transform: translate(-450px, -250px);
  }
</style>