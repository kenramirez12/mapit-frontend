<template>
  <button
    @click="socialLogin(social)"
    :class="{
      'social-login-btn--facebook' : social === 'facebook',
      'social-login-btn--google' : social === 'google'
    }"
    class="social-login-btn shadow-input mb-4">
    <template v-if="social === 'facebook'">
      <img src="~/assets/images/facebook-logo.svg" style="height:20px">
      <span class="text-left pl-6 sm:pl-12 md:pl-0">{{ $lang.translate(translations, 'continue_with') }} Facebook</span>
    </template>
    <template v-else-if="social === 'google'">
      <img src="~/assets/images/google-logo.svg" style="height:20px">
      <span class="text-left pl-6 sm:pl-12 md:pl-0">{{ $lang.translate(translations, 'continue_with') }} Google</span>
    </template>
    <span v-else />
  </button>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  props: {
    social: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      translations: {
        'es_ES': {
          continue_with: 'Continúa con'
        },
        'en_EN': {
          continue_with: 'Continue with'
        }
      }
    }
  },
  computed: {
    ...mapState({
      reserveDate: s => s.reserves.form.date,
      groupSize: s => s.reserves.form.groupSize
    }),
    ...mapGetters({
      willCheckout: 'reserves/willCheckout',
      currentExperience: 'reserves/currentExperience',
      availableHours: 'reserves/availableHours'
    })
  },
  methods: {
    socialLogin(service) {
      if (process.browser) {
        if(this.willCheckout) {
          localStorage.setItem('willCheckout', this.willCheckout)
          localStorage.setItem('currentExperience', JSON.stringify(this.currentExperience))
          localStorage.setItem('availableHours', JSON.stringify(this.availableHours))
          localStorage.setItem('reserveDate', this.reserveDate)
          localStorage.setItem('groupSize', this.groupSize)
        } else {
          localStorage.setItem('loginRedirectPath', this.$route.fullPath);
        }
      }

      window.location.href = `${process.env.apiUrl}/login/${service}`;
    }
  }
}
</script>

<style lang="scss" scoped>
  .social-login-btn {
    width: 100%;
    height: 46px;
    display: flex;
    align-items: center;
    font-size: 90%;
    letter-spacing: .05rem;

    @media screen and (min-width: 768px) {
      height: 60px;
    }

    img {
      flex: 1;
    }

    span {
      flex: 4;

      @media screen and (min-width: 768px) {
        flex: 3;
      }

      @media screen and (min-width: 830px) {
        flex: 2;
      }
    }

    &--facebook {
      background-color: #3B5998;
      color: #fff;

      &:hover {
        background-color: darken(#3B5998, 5);
      }
    }

    &--google {
      background-color: #fff;

      &:hover {
        background-color: darken(#fff, 5);
      }
    }
  }
</style>
