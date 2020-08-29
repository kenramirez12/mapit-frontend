<template>
  <div id="why-mapit" class="flex flex-wrap mt-10 md:mt-20 px-5">
    <div class="w-full lg:w-5/12">
      <h2 class="text-2xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6 lg:mb-0">
        ¿Por qué MAP IT?
      </h2>
    </div>
    <div class="w-full lg:w-6/12">
      <div class="flex flex-wrap">
        <div
          v-for="(feature, n) in features"
          :key="'item_' + n"
          class="w-1/2 mb-10 pr-6 md:pr-12">
          <img :src="feature.icon" class="mb-4 feature-icon">
          <h4
            class="text-lg md:text-xl font-light mb-4"
            v-html="feature.title" />
          <p class="font-light text-gray-600 text-xs md:text-sm">
            {{ feature.copy }}
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
          icon: '/images/corporativo-icons/personalizado.svg',
          title: 'Personalizado',
          copy: 'Nos adaptamos a tus preferencias para ofrecerte la mejor experiencia para tu empresa.'
        },
        {
          icon: '/images/corporativo-icons/participativo.svg',
          title: 'Participativo',
          copy: ' Nuestras experiencias están diseñadas para fomentar la interacción de los participantes mientras se divierten.'
        },
        {
          icon: '/images/corporativo-icons/expertos.svg',
          title: 'Expertos',
          copy: 'Aprende y disfruta junto a los mejores profesionales en su rubro.'
        },
        {
          icon: '/images/corporativo-icons/integrador.svg',
          title: 'Integrador',
          copy: 'Nuestras experiencias permiten unir a miembros de diferentes equipos y locaciones.'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .feature-icon {
    height: 70px;

    @media screen and (min-width: 768px) {
      height: 120px;
    }
  }
</style>
