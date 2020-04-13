<template>
  <div v-loading="!reserve">
    <PaymentFailed v-if="reserve.status === 0" :reserve="reserve" />
    <template v-else>
      <SuccessfulPayment v-if="reserve.group_size === 1" :reserve="reserve" />
      <RequireAdditionalInfo v-else />
    </template>
  </div>
</template>

<script>
import SuccessfulPayment from '~/components/checkout/SuccessfulPayment'
import RequireAdditionalInfo from '~/components/checkout/RequireAdditionalInfo'
import PaymentFailed from '~/components/checkout/PaymentFailed'

export default {
  async asyncData({ app, params, store, error }) {
    try {
      const resp = await app.$axios.$get(`/reserves/${params.id}`)
      const reserve = resp.reserve
      console.log('Success: ', reserve)
      
      return {
        reserve
      }
    } catch (error) {
      console.error('Error:', error.response)
    }
  },
  components: {
    SuccessfulPayment,
    RequireAdditionalInfo,
    PaymentFailed
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
      font-size: 54px;
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
    z-index: 1;
  }
</style>