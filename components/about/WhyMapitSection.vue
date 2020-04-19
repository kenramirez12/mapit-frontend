<template>
  <div class="flex flex-wrap -mt-16">
    <div class="w-5/12">
      <h2 class="text-5xl font-light" v-html="$lang.translate(translations, 'title')" />
    </div>
    <div class="w-6/12">
      <div class="flex flex-wrap">
        <div
          v-for="(feature, n) in features"
          :key="'item_' + n"
          class="w-1/2 mb-10 pr-12">
          <img :src="feature.icon" class="mb-4" style="height:120px">
          <h4
            class="text-xl font-light mb-4"
            v-html="$lang.translate(feature.translations, 'title')" />
          <p class="font-light text-gray-600 text-sm">
            {{ $lang.translate(feature.translations, 'copy') }}
          </p>
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
          title: `¿Por qué viajar<br>con MAP IT?`
        },
        en_EN: {
          title: 'Why travel with<br>MAP IT?'
        }
      },
      features: [
        {
          icon: '/images/about/why-01.svg',
          translations: {
            es_ES: {
              title: `Experiencias<br>únicas`,
              copy: 'Disfruta experiencias auténticas con expertos locales y descubre diferentes formas de vida y culturas.'
            },
            en_EN:  {
              title: 'Unique<br>experiences',
              copy: 'Explore authentic experiences with local experts and get to know different cultures and ways of life.'
            }
          }
        },
        {
          icon: '/images/about/why-02.svg',
          translations: {
            es_ES: {
              title: `Vive como<br>un local`,
              copy: 'Descubre nuestra cultura desde los ojos de un local, probando sus comidas, escuchando sus historias, y aprendiendo sobre sus tradiciones.'
            },
            en_EN:  {
              title: 'Connect<br>with locals',
              copy: 'You\’ll get an insider\'s perspective of the culture by tasting their food, hearing their tales, and getting in touch with their traditions.'
            }
          }
        },
        {
          icon: '/images/about/why-03.svg',
          translations: {
            es_ES: {
              title: `Impacto<br>social`,
              copy: 'Queremos lograr un cambio sostenible en Perú generando mayores ingresos para los locales,  cuidando el medio ambiente, y preservando sus comunidades  y tradiciones.'
            },
            en_EN:  {
              title: 'Social<br>impact',
              copy: 'Our mission is to make a sustainable change in Peru by bringing more income to the locals, protecting our environment, and preserving disappearing culture and communities.'
            }
          }
        },
        {
          icon: '/images/about/why-04.svg',
          translations: {
            es_ES: {
              title: `Experiencias<br>seguras`,
              copy: 'La seguridad de nuestros viajeros es nuestra prioridad,  y nuestro equipo se asegurará de ello cada experiencia.'
            },
            en_EN:  {
              title: 'Safe<br>experiences',
              copy: 'The first thing we always think about is the safety of our travelers, and our team will ensure it in each activity.'
            }
          }
        }
      ]
    }
  }
}
</script>

<style>

</style>