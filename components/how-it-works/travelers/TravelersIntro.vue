<template>
  <div class="container mx-auto h-full flex py-6">
    <div class="flex flex-wrap md:items-center my-auto px-4 pb-12 md:pb-0">
      <div class="w-full md:w-6/12">
        <h2 class="text-2xl md:text-5xl font-light">
          {{ $lang.translate(translations, 'for_travelers') }}
        </h2>
        <p class="w-full md:w-9/12 md:text-2xl font-light my-6 leading-tight">
          {{ $lang.translate(translations, 'subtitle') }}
        </p>
        <p class="font-light md:pr-6 text-xs md:text-sm">
          {{ $lang.translate(translations, 'copy') }}
        </p>
      </div>
      <div class="w-full md:w-5/12 ml-auto hidden md:block">
        <img src="/images/how-it-works/travelers/step-0.jpg" class="w-full image-shadow">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      translations: {
        es_ES: {
          for_travelers: 'Para viajeros',
          subtitle: '¡Disfruta momentos únicos con nuestros wisers!',
          copy: 'Nuestras experiencias han pasado por un minucioso proceso de selección, eligiendo a las mejores por su alto nivel de calidad, seguridad y autenticidad. Te aseguramos que tu wiser- el nombre que le damos a nuestros expertos locales - será tu compañero perfecto para la experiencia que estás buscando, pues ha sido elegido por su larga trayectoria y pasión por lo que hace. Ellos forman parte de diferentes organizaciones sociales, asociaciones rurales, pequeños emprendimientos, entre otros; y se capacitan constantemente para ofrecer un excelente servicio a los viajeros.'
        },
        en_EN: {
          for_travelers: 'For travelers',
          subtitle: 'Spend an amazing time with our wisers!',
          copy: 'Our experiences have carefully chosen by our team, ensuring the best quality, safety, and authenticity. We assure you our wisers- the name we give to our local experts- will be the perfect company for the experience you are seeking for, as they have been selected for their expertise and passion for what they do.  They are part of numerous social organizations, rural associations, local businesses, amongst others, and they are constantly training to provide an excellent service for travelers.'
        }
      }
    }
  }
}
</script>

<style scoped>
  .image-shadow {
    box-shadow: -20px 60px 220px rgba(0, 0, 0, 0.44);
  }
</style>