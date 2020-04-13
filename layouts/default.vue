<template>
  <div 
    v-loading="isLoading"
    :class="{ 'is-loading': isLoading }">
    <AuthPopup />
    <el-alert
      class="pt-3 pb-4"
      style="height:55px;background-color:#E9FFFF"
      center
      :closable="false">
      <p class="font-light text-center text-black mb-0" style="font-size:14px">
        Get the latest on our COVID-19 response and cancellation policies. <a href="#" class="font-medium underline">Learn more</a>
      </p>
    </el-alert>
    <AppHeader />
    <nuxt class="main-content" />
    <AppFooter v-if="$route.name && $route.name !== 'lang-experiences-id'" />
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import AuthPopup from '~/components/auth/AuthPopup'
import AppHeader from '~/layouts/components/AppHeader'
import AppFooter from '~/layouts/components/AppFooter'

export default {
  components: {
    AuthPopup,
    AppHeader,
    AppFooter
  },
  data () {
    return {
      isLoading: false
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

<style scoped>
  .main-content {
    min-height: calc(100vh - var(--header-height) - 55px);
  }

  .is-loading {
    height: 100vh;
    overflow: hidden;
  }
</style>
