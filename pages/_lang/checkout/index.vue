<template>
  <div class="checkout-container">
    <ul class="steps">
      <li
        :class="{
          active : currentStep === 1,
          success : currentStep === 2
        }"
        class="steps__item">
        <a href="#" class="steps__link">1. Detalles de la experiencia</a>
      </li>
      <li
        :class="{
          active : currentStep === 2
        }"
        class="steps__item">
        <a href="#" class="steps__link">2. Datos del viajero</a>
      </li>
    </ul>
    <div class="container flex m-auto py-6">
      <div class="w-2/3">
        <ReserveDetails v-if="currentStep === 1" />
        <ReserveClientDetails v-if="currentStep === 2" />
      </div>
      <div class="w-1/3">
        <ReserveResume />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ReserveDetails from '~/components/checkout/ReserveDetails'
import ReserveClientDetails from '~/components/checkout/ReserveClientDetails'
import ReserveResume from '~/components/checkout/ReserveResume'

export default {
  components: {
    ReserveDetails,
    ReserveClientDetails,
    ReserveResume
  },
  computed: {
    ...mapGetters({
      currentStep: 'reserves/currentStep'
    })
  }
}
</script>

<style lang="scss">
  .checkout-lg {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row-reverse;

    .el-checkbox__label {
      font-size: 16px;
      font-weight: 300;
      color: #000;
      padding-left: 0;
      padding-right: 1rem;
    }

    .el-checkbox__inner {
      width: 24px;
      height: 24px;
      box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.15);
      border: 0;

      &::after {
        height: 12px;
        left: 9px;
        top: 4px;
      }
    }
  }

  .checkout-container {
    min-height: calc(100vh - 79px);
    display: flex;
    flex-direction: column;
  }

  .steps {
    display: flex;
    width: 100%;
    list-style: none;
    padding-left: 0;
    margin-bottom: 0;


    &__item {
      flex: 1;
      text-align: center;
      padding: .8rem;
      border-top: 6px solid #C4C4C4;
      font-weight: 300;

      &.active {
        border-color: #555;
        font-weight: 400;
      }

      &.success {
        border-color: var(--primary);
        color: var(--primary);
      }
    }
  }
</style>
