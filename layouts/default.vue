<template>
  <div 
    v-loading="isLoading"
    :class="{ 'is-loading': isLoading }">
    <div>
      <AuthPopup />
      <div
        :class="{
          'header-fixed' : $route.name === 'lang-how-it-works-travelers'
        }">
        <el-alert
          class="top-bar pt-3 pb-4"
          center>
          <p class="font-light text-center text-black mb-0">
            {{ $lang.translate(translations, 'covid_policies') }} 
            <a
              href="#"
              @click.prevent="$router.push(`/${$lang.current().slug}/covid`)"
              class="font-medium underline">
              {{ $lang.translate(translations, 'click') }}</a>
          </p>
        </el-alert>
        <AppHeader />
      </div>
      <AppResponsiveNavbar />
      <nuxt
        :class="{'main-content' : $route.name !== 'lang-contact' }" />
      <AppFooter
        v-if="
        $route.name &&
        $route.name !== 'lang-experiences-id' && 
        $route.name !== 'lang-how-it-works'" />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import AuthPopup from '~/components/auth/AuthPopup'
import AppHeader from '~/layouts/components/AppHeader'
import AppFooter from '~/layouts/components/AppFooter'
import AppResponsiveNavbar from '~/layouts/components/AppResponsiveNavbar'

export default {
  components: {
    AuthPopup,
    AppHeader,
    AppFooter,
    AppResponsiveNavbar
  },
  data () {
    return {
      isLoading: false,
      translations: {
        es_ES: {
          covid_policies: 'Para más información  sobre las políticas de cancelación de COVID-19 y las últimas actualizaciones.',
          click: 'Clic aquí'
        },
        en_EN: {
          covid_policies: 'Learn more about our COVID-19 response and cancellation policies.',
          click: 'Click here'
        }
      }
    }
  },
  computed: {
    ...mapGetters(['authDialogVisible'])
  },
  methods: {
    ...mapActions({
      getCategories: 'categories/getCategories',
      getDestinations: 'destinations/getDestinations'
    }),
    ...mapMutations({
      setLang: 'SET_LANG_BY_SLUG',
      setExperience: 'reserves/SET_EXPERIENCE',
      setAvailableHours: 'reserves/SET_AVAILABLE_HOURS',
      setReserveField: 'reserves/SET_RESERVE_FIELD'
    }),
    setCheckoutData() {
      this.setExperience(JSON.parse(localStorage.getItem('currentExperience')))
      this.setAvailableHours(JSON.parse(localStorage.getItem('availableHours')))
      this.setReserveField({ field: 'date', value: localStorage.getItem('reserveDate') })
      this.setReserveField({ field: 'groupSize', value: parseInt(localStorage.getItem('groupSize')) })

      localStorage.removeItem('willCheckout')
      localStorage.removeItem('currentExperience')
      localStorage.removeItem('availableHours')
      localStorage.removeItem('reserveDate')
      localStorage.removeItem('groupSize')
    },
    socialAuth(token) {
      this.$auth.setStrategy('local')
      this.$auth.setUserToken(token).then( () => {
        this.isLoading = false

        if (localStorage.getItem('loginRedirectPath')) {
          const redirectTo = localStorage.getItem('loginRedirectPath')
          localStorage.removeItem('loginRedirectPath')
          return this.$router.push(redirectTo)
        } else if (localStorage.getItem('willCheckout')) {
          this.setCheckoutData()
          return this.$router.push(`/${this.$lang.current().slug}/checkout`)
        } else {
          return this.$router.push('/')
        }
      }).catch( (e) => {
        console.error('socialAuth()', e)
        this.$auth.logout()
        this.isLoading = false
        // return this.$router.push(`/auth/${this.$route.query.origin ? this.$route.query.origin : 'register'}?error=1`)
      });
    }
  },
  mounted () {
    this.getCategories()
    this.getDestinations()

    /** Login */
    if('access_token' in this.$route.query) { // Just logged in
      this.isLoading = true
      return this.socialAuth(this.$route.query.access_token)
    }

    if('error' in this.$route.query && 'provider' in this.$route.query) { // Error on social login
      this.$message.error(`El ingreso con su cuenta de ${this.$route.query.provider} falló. Por favor inténtelo nuevamente.`);
    }

    if (localStorage.getItem('loginRedirectPath')) { // Shouldn't arrieve here
      const redirectTo = localStorage.getItem('loginRedirectPath') 
      localStorage.removeItem('loginRedirectPath')
      return this.$router.push(redirectTo)
    }

    /** Lang */
    if(!('lang' in this.$route.params)) { // Route has not lang
      const dest = this.$route
      dest.params.lang = this.$lang.current().slug
      this.$router.push(dest)
    }

    if(this.$route.params.lang !== this.$lang.current().iso_lang) { // Update lang in store
      this.setLang(this.$route.params.lang)
    }
  }
}
</script>

<style lang="scss">
  .header-fixed {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }

  .top-bar {
    .el-alert__closebtn {
      top: 50%!important;
      transform: translateY(-50%);
      color: #6f6f6f!important;
    }
  }

  .container {
    @media (min-width: 1280px) {
      max-width: 1170px;
    }
  }

  .container-left-margin {
    width: 100%;

    @media (min-width: 640px) {
      --width: 640px;
      margin-left: calc((100% - var(--width)) / 2);
      width: calc(100% - ((100% - var(--width)) / 2));
    }

    @media (min-width: 768px) {
      --width: 768px;
    }

    @media (min-width: 1024px) {
      --width: 1024px;
    }

    @media (min-width: 1280px) {
      --width: 1170px;
    }
  // max-width: 1170px;
    // width: calc(100% - 2rem)!important;
    // max-width: none!important;

    // @media screen and (min-width: 768px) {
    //   width: calc(100% - 5rem)!important;
    // }
  }

  .el-input__inner,
  .el-textarea__inner,
  .el-button {
    letter-spacing: 0.05rem;
  }
</style>

<style lang="scss" scoped>
  .top-bar {
    height:55px;
    background-color:#E9FFFF;
  }

  .main-content {
    min-height: calc(100vh - var(--header-height) - 55px);
  }

  .is-loading {
    height: 100vh;
    overflow: hidden;
  }
</style>
