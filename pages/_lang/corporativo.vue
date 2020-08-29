<template>
  <div>
    <PageHeader
      :translations="translations"
      class="mt-10 md:mt-0"
      image="/images/banner-corporativo.jpg" />
    <div class="container mx-auto">
      <div class="flex flex-wrap justify-center pt-24">
        <div class="w-full text-center px-6">
          <p class="md:text-lg mb-6 font-light">Brindamos experiencias virtuales para fortalecer la integración entre los colaboradores, la relación con los clientes, y la mejora del clima laboral, desde la comodidad del hogar.</p>
          <p class="md:text-lg mb-6 font-light">Ofrecemos un amplio catálogo de experiencias virtuales que te permitirán crear conexiones y tener una cultura empresarial sólida. Además, contamos con opciones de envío de packs de insumos en distintas experiencias.</p>
        </div>
      </div>
      <WhyMapitSection />
      <div class="flex flex-wrap pt-20 pb-14 justify-center">
        <div class="w-full mb-12 px-5">
          <h2 class="text-2xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6 lg:mb-0">
            Tipos de experiencias
          </h2>
        </div>
        <div
          v-for="(type, n) in experienceTypes"
          :key="'type_' + n"
          class="w-1/2 md:w-1/3 lg:w-1/5 px-5 text-center mb-10"
        >
          <img :src="`/images/${type.image}`" :alt="type.title" class="experience-type__image">
          <h4 class="text-lg mb-3">
            {{ type.title }}
          </h4>
          <p class="font-light leading-tight text-xs md:text-base text-gray-600">
            {{ type.description }}
          </p>
        </div>
      </div>
    </div>
    <div class="pt-12 pb-24">
      <TrustedBySlider :translations="translations" />
      <div class="container mx-auto pt-16 pb-10 md:pb-0 px-6 md:px-4">
        <div class="flex flex-wrap justify-center">
          <div class="w-full md:w-7/12 xl:w-1/2">
            <h1
              class="text-3xl md:text-5xl font-light leading-tight"
              v-html="$lang.translate(translations, 'contact_title')" />
            <h4 class="px-2 text-xl md:text-2xl mb-5 font-light">
              {{ $lang.translate(translations, 'contact_copy') }}
            </h4>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/shared/PageHeader'
import TrustedBySlider from '~/components/corporativo/TrustedBySlider'
import ContactForm from '@/components/shared/ContactForm'
import WhyMapitSection from '@/components/corporativo/WhyMapitSection'

export default {
  components: {
    PageHeader,
    TrustedBySlider,
    WhyMapitSection,
    ContactForm
  },
  data () {
    return {
      experienceTypes: [
        {
          image: 'cocteles.jpg',
          title: 'Cocktails en casa',
          description: 'Aprende las técnicas y secretos para preparar diferentes cócteles con la guía de un reconocido bartender profesional.'
        },
        {
          image: 'clases-de-cocina.jpg',
          title: 'Clase de cocina',
          description: 'Un chef los guiará en la preparación de una deliciosa receta, paso a paso, mientras les enseña sus mejores técnicas.'
        },
        {
          image: 'catas-gourmet.jpg',
          title: 'Catas gourmet',
          description: 'Contamos con opciones de catas de quesos y vino, y catas de whisky, guiadas por expertos.',
        },
        {
          image: 'experiencia-barista.jpg',
          title: 'Experiencia barista',
          description: 'Aprende acerca del café peruano y prepara 3 recetas con la guía de un reconocido barista.',
        },
        {
          image: 'otras-experiencias.jpg',
          title: 'Otras experiencias',
          description: 'Talleres de impro, alimentación saludable, yoga, y muchas otras opciones que se adapten a tus necesidades.'
        }
      ],
      translations: {
        'es_ES': {
          title: 'Map It para empresas',
          subtitle: 'Experiencias corporativas virtuales',
          trust_us: 'Confian en nosotros',
          contact_title: '¿Interesado?',
          contact_copy: '¡Llena el siguiente formulario para obtener más información de nuestras experiencias!'
        },
        'en_EN': {
          title: 'Map It para empresas',
          subtitle: 'Experiencias corporativas virtuales',
          trust_us: 'Confian en nosotros',
          contact_title: '¿Interesado?',
          contact_copy: '¡Llena el siguiente formulario para obtener más información de nuestras experiencias!'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .experience-type {
    &__image {
      border-radius: 50%;
      margin-bottom: 1rem;
    }
  }
</style>
