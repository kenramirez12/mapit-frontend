<template>
  <div class="success-container p-4">
    <img class="character character--01 hidden md:block" src="~/assets/images/standing-checkout-03.svg">
    <img class="character character--02 hidden md:block" src="~/assets/images/sitting-checkout-04.svg">
    <div class="success-card m-auto p-6">
      <img src="~/assets/images/edit-icon-lg.svg" class="mx-auto" width="70">
      <h3 class="success-card__title mt-6">
        {{ $lang.translate(pageTranslations, 'title') }}
      </h3>
      <p class="success-card__copy my-6 mb-0">
        {{ $lang.translate(pageTranslations, 'copy') }}
      </p>
      <el-button
        type="primary"
        @click="$router.push(`/${$lang.current().slug}/my/bookings/${$route.params.id}/travelers-info`)"
        class="px-6 mt-6">
        {{ $lang.translate(pageTranslations, 'gotit') }}
      </el-button>
      <div class="py-6 font-light">
        <div class="flex flex-wrap text-sm">
          <div class="w-1/2 py-2">
            {{ $lang.translate(translations, 'order_number') }}:<br>
            {{ reserve.id + 300 }}
          </div>
          <div class="w-1/2 py-2">
            {{ $lang.translate(translations, 'order_date') }}:<br>
            {{ reserve.payment.details.order.transactionDate }}
          </div>
        </div>
        <div class="flex flex-wrap text-sm">
          <div class="w-1/2 py-2">
            {{ $lang.translate(translations, 'card_number') }}:<br>
            {{ reserve.payment.details.dataMap.CARD }}
          </div>
          <div class="w-1/2 py-2">
            {{ $lang.translate(translations, 'amount') }}:<br>
            {{ reserve.payment.details.order.amount.toFixed(2) }} {{ reserve.payment.details.order.currency }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reserve: {
      type: Object,
      required: true,
      default: () => {}
    },
    translations: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      pageTranslations: {
        'es_ES': {
          title: 'Último paso',
          copy: 'Para finalizar la compra y disfrutar de la experiencia, deberás completar los datos de tus acompañantes.',
          gotit: 'Entendido'
        },
        'en_EN': {
          title: 'Last step',
          copy: 'To complete the booking and enjoy the experience, you must fill the other travelers’ information.',
          gotit: 'Got it !'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .character {
    &--01 {
      bottom: 0;
      width: 11rem;
      left: 2rem;

      @media screen and (min-width: 992px) {
        width: 13rem;
        left: 3rem;
      }
    }

    &--02 {
      bottom: 10%;
      width: 16rem;
      right: 1rem;

      @media screen and (min-width: 992px) {
        width: 19rem;
        right: 3rem;
      }
    }
  }
</style>
