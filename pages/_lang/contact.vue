<template>
  <div class="container mx-auto pt-16 px-4">
    <div class="flex flex-wrap">
      <div class="w-full mb-6">
        <h1
          class="text-5xl font-light leading-tight"
          v-html="$lang.translate(translations, 'title')" />
      </div>
      <div class="w-1/2 flex items-end justify-between pt-12 pr-8">
        <img src="/images/contact/human_01.svg" class="human-01">
        <img src="/images/contact/human_02.svg" class="human-02">
      </div>
      <div class="w-1/2">
        <h4 class="px-2 text-2xl mb-5 font-light">
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

<style scoped>
  .human-01 {
    height: 260px;
    transform: translateX(-80px);
  }
  .human-02 {
    height: 350px;
  }
</style>
