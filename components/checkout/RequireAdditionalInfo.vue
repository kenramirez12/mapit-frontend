<template>
  <div class="success-container p-4">
    <img class="character character--01" src="~/assets/images/standing-checkout-03.svg">
    <img class="character character--02" src="~/assets/images/sitting-checkout-04.svg">
    <div class="success-card m-auto p-6">
      <img src="~/assets/images/edit-icon-lg.svg" class="mx-auto" width="100">
      <h3 class="success-card__title mt-6">
        {{ $lang.translate(translations, 'title') }}
      </h3>
      <p class="success-card__copy my-6 mb-0 pb-6">
        {{ $lang.translate(translations, 'copy') }}
      </p>
      <el-button
        type="primary"
        @click="$router.push(`/${$lang.current().slug}/my/reserves/${$route.params.id}/travelers-info`)"
        class="px-6 mt-6">
        Entendido
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      translations: {
        'es_ES': {
          title: 'Último paso',
          copy: 'Para finalizar la compra y disfrutar de la experiencia, deberás completar los datos de tus acompañantes.'
        },
        'en_EN': {
          title: 'Last step',
          copy: 'To complete the booking and enjoy the experience, you must fill the other travelers’ information.'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .character {
    &--01 {
      width: 13rem;
      left: 3rem;
      bottom: 0;
    }

    &--02 {
      width: 19rem;
      right: 3rem;
      bottom: 10%;
    }
  }
</style>
