<template>
  <div class="success-container p-4">
    <div class="success-card m-auto p-6">
      <img src="/images/checkout-fail.svg" class="mx-auto" width="70">
      <h3 class="success-card__title mt-6" v-html="$lang.translate(translations, 'error_title')" />
      <p class="success-card__copy mt-5" v-html="$lang.translate(translations, 'error_copy')" />
      <div class="py-6 font-light">
        <div v-if="!reserve.payment.details" class="w-full text-sm">
          {{ $lang.translate(translations, 'denial_reason') }}:<br>
          {{ $lang.translate(translations, 'api_error') }}
        </div>
        <div v-else class="flex flex-wrap text-sm">
          <div class="w-1/2 py-2">
            {{ $lang.translate(translations, 'order_number') }}:<br>
            {{ reserve.id + 300 }}
          </div>
          <div class="w-1/2 py-2">
            {{ $lang.translate(translations, 'order_date') }}:<br>
            {{ reserve.payment.details.data.TRANSACTION_DATE }}
          </div>
          <div class="w-full py-2">
            {{ $lang.translate(translations, 'denial_reason') }}:<br>
            {{ reserve.payment.details.data.ACTION_DESCRIPTION }}
          </div>
        </div>
      </div>
      <el-button
        type="primary"
        class="px-6"
        @click="$router.push(`/${$lang.current().slug}/experiences/${$lang.apiTranslate(reserve.experience.translations, 'slug')}`)">
        Entendido
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
  }
}
</script>

<style lang="scss" scoped>
  .character {
    &--01 {
      width: 18rem;
      top: 10%;
      left: 3rem;
    }

    &--02 {
      width: 16rem;
      bottom: 0;
      right: 0;
    }
  }
</style>
