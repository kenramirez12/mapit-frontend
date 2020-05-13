<template>
  <div class="success-container p-4">
    <img class="character character--01 hidden md:block" src="~/assets/images/sitting-checkout-01.svg">
    <img class="character character--02 hidden md:block" src="~/assets/images/standing-checkout-01.svg">
    <div class="success-card m-auto p-6">
      <img src="~/assets/images/include-icon.svg" class="mx-auto" width="70">
      <h3 class="success-card__title mt-6">
        {{ $lang.translate(pageTranslations, 'succesful') }}<br>
        {{ $lang.translate(pageTranslations, 'purchase') }}
      </h3>
      <p class="success-card__copy my-5 mb-0">
        {{ $lang.translate(pageTranslations, 'copy') }}<br>
        {{ $lang.translate(pageTranslations, 'copy2') }}
      </p>
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
      <el-button
        type="primary"
        class="px-6"
        @click="$router.push(`/${$lang.current().slug}/my/bookings/${reserve.code}`)">
        {{ $lang.translate(pageTranslations, 'gotit') }}
      </el-button>
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
          succesful: 'Compra',
          purchase: 'exitosa',
          copy: '¡Gracias por reservar tu experiencia con nosotros!',
          copy2: 'Dentro de las próximas 24 hrs te llegará un correo de confirmación con el código de reserva y los detalles de la experiencia.',
          gotit: 'Entendido',
          order_number: 'Número de pedido',
          order_date: 'Fecha de pedido',
          denial_reason: 'Motivo de denegación',
          card_number: 'Número de tarjeta',
          amount: 'Monto'
        },
        'en_EN': {
          succesful: 'Succesful',
          purchase: 'purchase',
          copy: 'Thank you for booking with us!',
          copy2: 'Within the next 24 hrs, you will receive a confirmation email with the reservation code and the details of the experience.',
          gotit: 'Got it !',
          order_number: 'Order number',
          order_date: 'Order date',
          denial_reason: 'Reason of denial',
          card_number: 'Credit card number',
          amount: 'Amount'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .character {
    &--01 {
      width: 14rem;
      top: 16%;
      left: 0;

      @media screen and (min-width: 992px) {
        width: 18rem;
        top: 10%;
        left: 3rem;
      }
    }

    &--02 {
      width: 12.5rem;
      bottom: 0;
      right: 0;

      @media screen and (min-width: 992px) {
        width: 16rem;
      }
    }
  }
</style>
