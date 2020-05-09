<template>
  <div class="checkout-container">
    <ul class="steps">
      <li
        :class="{
          active : currentStep === 1,
          success : currentStep === 2
        }"
        class="steps__item">
        <a href="#" class="steps__link">1. {{ $lang.translate(translations, 'experience_details') }}</a>
      </li>
      <li
        :class="{
          active : currentStep === 2
        }"
        class="steps__item">
        <a href="#" class="steps__link">2. {{ $lang.translate(translations, 'traveler_details') }}</a>
      </li>
    </ul>
    <div class="container flex flex-wrap m-auto py-6">
      <div class="reserve-details-container w-full md:w-7/12 lg:w-2/3 order-2 md:order-1">
        <ReserveDetails v-if="currentStep === 1" />
        <ReserveClientDetails v-if="currentStep === 2" />
      </div>
      <div class="reserve-resume w-full md:w-5/12 lg:w-1/3 order-1 md:order-2 px-4 md:px-0">
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
  data() {
    return {
      translations: {
        'es_ES': {
          experience_details: 'Detalles de la experiencia',
          traveler_details: 'Datos del viajero'
        },
        'en_EN': {
          experience_details: 'Experience details',
          traveler_details: 'Traveler details'
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      currentStep: 'reserves/currentStep'
    })
  }
}
</script>

<style lang="scss">
  .reserve-resume {
    position: sticky;
    top: 10px;
    z-index: 99;

    @media screen and (min-width: 768px) {
      position: relative;
      top: unset;
      z-index: unset;
    }
  }

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
      font-size: 80%;

      @media screen and (min-width: 768px) {
        font-size: 100%;
      }

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
