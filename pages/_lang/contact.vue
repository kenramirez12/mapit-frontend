<template>
  <div class="container mx-auto pt-16 pb-10 md:pb-0 px-4">
    <div class="flex flex-wrap">
      <div class="w-full mb-10 md:mb-6 px-2 md:px-0">
        <h1
          class="text-3xl md:text-5xl font-light leading-tight"
          v-html="$lang.translate(translations, 'title')" />
      </div>
      <div class="md:w-5/12 xl:w-1/2 items-end justify-between pt-12 pr-8 hidden md:flex">
        <img src="/images/contact/human_01.svg" class="human-01">
        <img src="/images/contact/human_02.svg" class="human-02">
      </div>
      <div class="w-full md:w-7/12 xl:w-1/2">
        <h4 class="px-2 text-xl md:text-2xl mb-5 font-light">
          {{ $lang.translate(translations, 'copy') }}
        </h4>
        <ContactForm />
      </div>
    </div>
  </div>
</template>

<script>
import ContactForm from '@/components/shared/ContactForm'

export default {
  components: {
    ContactForm
  },
  data() {
    return {
      translations: {
        es_ES: {
          title: `Contáctate con<br>nuestro equipo`,
          copy: '¿Necesitas ayuda? Cuéntanos.'
        },
        en_EN: {
          title: 'Contact our team',
          copy: 'Need help? Let us know'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .human-01 {
    height: 240px;
    margin-left: -70px;

    @media screen and (min-width: 1024px) {
      transform: translateX(-80px);
      margin-left: 0;
      height: 260px;
    }
  }
  .human-02 {
    height: 320px;
    transform: translateX(30px);

    @media screen and (min-width: 1024px) {
      transform: translateX(0);
      height: 350px;
    }
  }
</style>
