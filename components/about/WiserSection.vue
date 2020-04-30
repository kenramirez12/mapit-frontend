<template>
  <div id="wisers" class="bg-primary pt-8 md:pt-12 pb-10 md:pb-10">
    <div class="container mx-auto px-4 pt-4">
      <div class="flex flex-wrap">
        <div class="w-full md:w-4/12 mx-auto relative">
          <h3 class="text-2xl md:text-3xl md:text-5xl mb-4 md:mb-10 font-light">Wiser</h3>
          <p class="md:text-2xl font-light">
            {{ $lang.translate(translations, 'copy') }}
          </p>
          <img src="/images/about/human-01.svg" class="hidden md:block human-01">
          <img src="/images/about/human-02.svg" class="hidden md:block human-02 mt-8 ml-auto">
        </div>
        <div class="w-full md:w-4/12 mt-12 md:mt-0">
          <div
            v-for="(feature, n) in features"
            :key="'wiser_feature_' + n"
            class="block mb-8 font-light">
            <h5 class="md:text-xl mb-2">
              {{ $lang.translate(feature.translations, 'title') }}
            </h5>
            <p class="text-sm md:text-base">
              {{ $lang.translate(feature.translations, 'copy') }}
            </p>
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
      translations: {
        es_ES: {
          copy: 'Nuestros wisers son expertos locales que conocen hasta el último rincón de las ciudades, ¡y lo compartirán contigo!'
        },
        en_EN: {
          copy: 'Our “wisers” are insiders who know the cities like the back of their hands and are eager to share their world with you.'
        }
      },
      features: [
        {
          translations: {
            es_ES: {
              title: 'Wisers locales',
              copy: 'Son todas las personas que viven en comunidades andinas. Sus vidas están llenas de historia, tradiciones y conocimientos antiguos.'
            },
            en_EN: {
              title: 'Wisers local',
              copy: 'They are our local experts who live in Andean communities. Their lives are full of history, traditions and ancient knowledge.'
            }
          }
        },
        {
          translations: {
            es_ES: {
              title: 'Wisers expertos',
              copy: 'Les apasiona el arte, la gastronomía, la historia y más. Únete a ellos en experiencias únicas que no encontrarás en ningún otro lugar.'
            },
            en_EN: {
              title: 'Wisers expert',
              copy: 'They are passionate about art, music, gastronomy, photography and more. Join them for one-of-a-kind activities that you will not get anywhere else.'
            }
          }
        },
        {
          translations: {
            es_ES: {
              title: 'Wisers de apoyo',
              copy: 'Traductores, conductores, cocineros, y más, ¡son parte de nuestro equipo y sin ellos sería imposible llevar a cabo la experiencia!'
            },
            en_EN: {
              title: 'Wisers helper',
              copy: 'From translators, drivers, cooks and more…they are the part of our team that makes your experience possible! '
            }
          }
        }
      ]
    }
  }
}
</script>

<style scoped>
  .human-01, .human-02 {
    height: 330px;
  }
  .human-01 {
    position: absolute;
    left: -260px;
    bottom: 100px;
  }
</style>