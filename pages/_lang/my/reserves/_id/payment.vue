<template>
  <div v-loading="!reserve">
    <PaymentFailed
      v-if="reserve.status === 0"
      :reserve="reserve"
      :translations="translations" />
    <template v-else>
      <SuccessfulPayment
        v-if="reserve.group_size === 1"
        :reserve="reserve"
        :translations="translations" />
      <RequireAdditionalInfo
        v-else
        :reserve="reserve"
        :translations="translations" />
    </template>
  </div>
</template>

<script>
import SuccessfulPayment from '~/components/checkout/SuccessfulPayment'
import RequireAdditionalInfo from '~/components/checkout/RequireAdditionalInfo'
import PaymentFailed from '~/components/checkout/PaymentFailed'

export default {
  middleware: 'auth',
  async asyncData({ app, params, store, error }) {
    try {
      const resp = await app.$axios.$get(`/reserves/${params.id}`)
      const reserve = resp.reserve
      
      return {
        reserve
      }
    } catch (error) {
      this.$log.error('Error:', error.response)
    }
  },
  components: {
    SuccessfulPayment,
    RequireAdditionalInfo,
    PaymentFailed
  },
  data() {
    return {
      translations: {
        'es_ES': {
          order_number: 'Número de pedido',
          order_date: 'Fecha de pedido',
          denial_reason: 'Motivo de denegación',
          card_number: 'Número de tarjeta',
          amount: 'Monto',
          api_error: 'Problemas técnicos en nuestra aplicación.'
        },
        'en_EN': {
          order_number: 'Order number',
          order_date: 'Order date',
          denial_reason: 'Reason of denial',
          card_number: 'Credit card number',
          amount: 'Amount',
          api_error: 'Technical problems in our application.'
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .success-container {
    position: relative;
    display: flex;
    min-height: calc(100vh - 80px);
    padding: 2rem;
  }

  .success-social {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #484848;

    &__points {
      font-size: 48px;
      font-weight: 300;
      line-height: 1.2;
    }

    &__label {
      font-size: 18px;
    }
  }

  .success-card {
    position: relative;
    max-width: 460px;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.12);
    position: relative;
    text-align: center;
    z-index: 2;

    &__title {
      font-size: 46px;
      line-height: 1;
      font-weight: 300;
    }

    &__copy {
      max-width: 90%;
      display: block;
      margin-right: auto;
      margin-left: auto;
      font-size: 15px;
      font-weight: 300;
    }
  }

  .character {
    position: absolute;
    z-index: 4;
  }
</style>