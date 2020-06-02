<template>
  <div class="container mx-auto py-16 px-6 md:px-4">
    <div class="flex flex-wrap">
      <div class="w-full mb-10 md:mb-6 px-2">
        <h1
          class="text-3xl md:text-5xl font-light leading-tight"
          v-html="$lang.translate(translations, 'title')" />
      </div>
      <div class="w-full md:w-9/12 xl:w-1/2">
        <ClaimForm />
      </div>
    </div>
  </div>
</template>

<script>
import ClaimForm from '@/components/shared/ClaimForm'

export default {
  components: {
    ClaimForm
  },
  data() {
    return {
      translations: {
        es_ES: {
          title: `Libro de reclamaciones`,
          copy: '¿Necesitas ayuda? Cuéntanos.'
        },
        en_EN: {
          title: 'Complaints book',
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
