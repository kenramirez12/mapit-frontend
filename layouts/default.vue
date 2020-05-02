<template>
  <div 
    v-loading="isLoading"
    :class="{ 'is-loading': isLoading }">
    <div>
      <AuthPopup />
      <div
        :class="{
          'header-fixed hidden' : $route.name === 'lang-how-it-works-travelers'
        }">
        <HeaderDialog />
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
import HeaderDialog from '~/layouts/components/HeaderDialog'
import AppHeader from '~/layouts/components/AppHeader'
import AppFooter from '~/layouts/components/AppFooter'
import AppResponsiveNavbar from '~/layouts/components/AppResponsiveNavbar'

export default {
  components: {
    AuthPopup,
    HeaderDialog,
    AppHeader,
    AppFooter,
    AppResponsiveNavbar
  },
  head() {
    return {
      title: this.pageTranslations[this.currentLang].pageTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.pageTranslations[this.currentLang].pageDescription },
        { hid: 'og:description', name: 'og:description', content: this.pageTranslations[this.currentLang].pageDescription }
      ]
    }
  },
  data () {
    return {
      isLoading: false,
      pageTranslations: {
        es: {
          pageTitle: 'MAP IT - Turismo sostenible en Perú',
          pageDescription: 'Encuentra qué hacer en Perú: tours gastronómicos, talleres de arte, experiencias con comunidades, cosas para hacer de noche, y mucho más.'
        },
        en: {
          pageTitle: 'MAP IT - Responsible travel in Peru',
          pageDescription: 'Find things to do in Peru: food tours, art tours, experiences with local communities, what to do at night, and much more.'
        }
      }
    }
  },
  computed: {
    ...mapGetters(['authDialogVisible']),
    currentLang() {
      if(this.validLang) {
        return this.$route.params.lang
      } return 'en'
    },
    validLang() {
      const allowedLangs = ['es', 'en']
      return 'lang' in this.$route.params && allowedLangs.includes(this.$route.params.lang)
    }
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
        this.$log.error('socialAuth', e, e.response)
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
    if(!this.validLang) { // Route has not lang
      const path = this.$route.path
      return this.$router.push(`/${this.currentLang}${path}`)
    }

    if(this.validLang && this.$route.params.lang !== this.$lang.current().iso_lang) { // Update lang in store
      this.setLang(this.$route.params.lang)
    }
  }
}
</script>

<style lang="scss">
  body {
    margin-bottom: 80px;

    @media screen and (min-width: 768px) {
      margin-bottom: 0;
    }
  }

  .header-fixed {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
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
  }

  .el-input__inner,
  .el-textarea__inner,
  .el-button {
    letter-spacing: 0.05rem;
  }
</style>

<style lang="scss" scoped>
  .main-content {
    min-height: calc(100vh - var(--header-height) - 55px);
  }

  .is-loading {
    height: 100vh;
    overflow: hidden;
  }
</style>
