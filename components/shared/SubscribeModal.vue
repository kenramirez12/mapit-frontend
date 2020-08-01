<template>
  <div
    v-loading="loading"
    class="subscribe-modal">
    <div class="subscribe-modal__container">
      <div
        v-if="!loading"
        @click="closeSubscribeModal"
        class="subscribe-modal__close-btn">
        <img src="/images/x.svg">
      </div>
      <div class="subscribe-modal__content">
        <h2 class="subscribe-modal__title">
          {{ $lang.translate(translations, 'title') }}
        </h2>
        <img src="/images/modal-image.jpg" class="w-full">
        <p class="subscribe-modal__copy my-4">
          {{ $lang.translate(translations, 'copy') }}
        </p>
        <SubscribeForm
          @updateLoading="updateLoading"
          @closeSubscribeModal="closeSubscribeModal" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import SubscribeForm from '@/components/shared/SubscribeForm'

export default {
  components: {
    SubscribeForm
  },
  data () {
    return {
      loading: false,
      translations: {
        'es_ES': {
          title: '¡Obtén nuestra lista de imperdibles en Perú!',
          copy: 'Suscríbete y recibe gratis nuestra lista (en inglés) de las 50 actividades que no puedes dejar de hacer cuando viajes a Perú.'
        },
        'en_EN': {
          title: 'Get The Ultimate Bucket List to travel Peru!',
          copy: 'Subscribe and receive our free copy of the top 50 activities you can\'t miss when visiting this beautiful country.'
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      setSubscribeModalVisible: 'SET_SUBSCRIBE_MODAL_VISIBLE'
    }),
    updateLoading (value) {
      this.loading = value
    },
    closeSubscribeModal () {
      this.setSubscribeModalVisible(false)
      this.$cookies.set('hide-subscribe-modal', 1, { maxAge: 60 * 60 * 24 * 7 * 52 })
    }
  }
}
</script>

<style lang="scss" scoped>
  .subscribe-modal {
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.5);

    @media screen and (min-width: 640px) {
      background-color: transparent;
      top: unset;
      right: unset;
    }

    &__close-btn {
      position: absolute;
      top: -14px;
      right: -14px;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background-color: #fff;
      border: 1px solid #9F9F9F;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;

      img {
        margin: auto;
      }

      &:hover {
        background-color: darken(#fff, 10);
      }
    }

    &__container {
      position: relative;
      width: 280px;
      background: #38D7D6;
      box-shadow: -20px 60px 220px rgba(0, 0, 0, 0.44);
      max-height: calc(100vh - 2rem);
      margin: auto;

      @media screen and (min-width: 640px) {
        margin: unset;
        // overflow-y: auto;
      }
    }

    &__content {
      padding: 1.5rem 1rem;
      overflow-y: auto;
      height: 100%;
    }

    &__title {
      font-size: 20px;
      font-weight: 300;
      line-height: 1.2;
      color: #525252;
      margin-bottom: .7rem;
    }

    &__copy {
      font-size: 12px;
      line-height: 1.2;
      color: #525252;
    }
  }
</style>
