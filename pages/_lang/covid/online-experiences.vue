<template>
  <div class="container px-4 py-12 mx-auto">
    <div class="flex flex-wrap">
      <div class="w-full pb-2 mb-8 text-sm font-light">
        {{ $lang.translate(translations, 'updated_at') }}
      </div>
      <div class="w-full lg:w-6/12 font-light text-sm pr-10" v-html="$lang.translate(translations, 'content')" />
      <div class="w-full lg:w-6/12 ml-auto xl:pl-12">
        <TheSteps :steps="steps" />
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/shared/PageHeader'
import TheSteps from '@/components/shared/TheSteps'

export default {
  components: {
    PageHeader,
    TheSteps
  },
  data() {
    return {
      translations: {
        es_ES: {
          updated_at: 'Manteniendo a las personas conectadas',
          content: `<h4 class="text-lg underline mb-4">¡Estamos felices de presentarles nuestras experiencias en línea!</h4>
          <p class="mb-8">Disfruta conociendo a personas de Perú y participando en experiencias únicas que te permitirán comprender mejor nuestra cultura, aprender cosas nuevas, y divertirte, desde la 
comodidad de tu hogar.</p>
          <p class="mb-8">Desde clases de cocina, hasta conciertos de música y clases de yoga, hemos reunido en un 
solo lugar todas estas experiencias para que puedas conectarte con los locales y descubrir 
un nuevo país, ¡incluso si no puedes viajar! </p>`
        },
        en_EN: {
          updated_at: 'Keeping people connected',
          content: `<h4 class="mb-8 text-3xl">We are excited to introduce you our online experiences!</h4>
          <p class="mb-8">Enjoy meeting locals from Peru and participating in one of a kind experiences where you will explore our culture, learn new things and have fun from the comfort of your home.</p>
          <p class="mb-8">From cooking classes to music concerts to yoga classes, we’ve gathered them in one place so you can connect with locals and discover a new country, without even travelling.</p>`
        }
      },
      steps: [
        {
          number: '01',
          image: 'experiences/step-01.jpg',
          translations: {
            es_ES: {
              content: 'Navega nuestra categoría ONLINE en la pestaña de Experiencias y elige la que más te guste.'
            },
            en_EN: {
              content: 'Browse our ONLINE category in the Experiences tab and pick your favorite one.'
            }
          }
        },
        {
          number: '02',
          image: 'experiences/step-02.jpg',
          translations: {
            es_ES: {
              content: 'Reserva en línea y ¡ya está! Recibirás por correo el enlace del programa para realizar la experiencia por videollamada.'
            },
            en_EN: {
              content: 'Book it online and that\'s it! You will receive an e-mail with the link for the online meeting place to have the experience through a video call.'
            }
          }
        },
        {
          number: '03',
          image: 'experiences/step-03.jpg',
          translations: {
            es_ES: {
              content: '.El wiser te estará esperando en el programa para tener la experiencia a la hora acordada. ¡Prepárate para pasar un tiempo increíble!'
            },
            en_EN: {
              content: 'Meet your wiser at the online meeting place at the agreed time. Get ready to spend an amazing time!'
            }
          }
        }
      ]
    }
  }
}
</script>
