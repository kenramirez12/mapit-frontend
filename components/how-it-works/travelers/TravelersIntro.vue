<template>
  <div class="container mx-auto h-full flex py-12 lg:py-6">
    <div class="flex flex-wrap md:items-center lg:my-auto px-6 md:px-4 md:pb-0 travelers-intro-container">
      <div class="w-full sm:w-10/12 md:w-6/12">
        <h2 class="text-2xl md:text-3xl lg:text-5xl font-light">
          {{ $lang.translate(translations, 'for_travelers') }}
        </h2>
        <p class="w-full md:w-9/12 text-xl lg:text-2xl font-light my-6 leading-tight">
          {{ $lang.translate(translations, 'subtitle') }}
        </p>
        <img src="/images/how-it-works/travelers/step-0.jpg" class="w-full image-shadow mt-3 mb-6 md:hidden">
        <p class="font-light md:pr-6 text-xs md:text-sm">
          {{ $lang.translate(translations, 'copy') }}
        </p>
      </div>
      <div class="w-full md:w-6/12 lg:w-5/12 ml-auto mt-8 lg:mt-0">
        <img src="/images/how-it-works/travelers/step-0.jpg" class="w-full image-shadow hidden md:block">
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

<style lang="scss" scoped>
  .image-shadow {
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

  .travelers-intro-container {
    // transform: translateY(calc(-80px + 1.5rem));

    // @media screen and (min-width: 768px) {
    //   transform: translateY(0);
    // }
  }
</style>