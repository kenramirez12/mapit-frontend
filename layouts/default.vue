<template>
  <div 
    v-loading="isLoading"
    :class="{ 'is-loading': isLoading }">
    <AuthPopup />
    <AppHeader />
    <nuxt />
    <AppFooter />
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
      setLang: 'SET_LANG_BY_SLUG'
    }),
    socialAuth(token) {
      this.$auth.setToken('local', 'Bearer ' + token)
      this.$auth.setStrategy('local')

      this.$auth.fetchUser().then( () => {
        this.isLoading = false
        if (localStorage.getItem("loginRedirectPath")) {
          return this.$router.push(localStorage.getItem("loginRedirectPath"))
        }
        return this.$router.push('/')
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

    if('access_token' in this.$route.query) {
      this.isLoading = true
      this.socialAuth(this.$route.query.access_token)
    }

    if(!'lang' in this.$route.params) {
      const dest = this.$route
      dest.params.lang = this.$lang.current().slug
      this.$router.push(dest)
    }

    if('error' in this.$route.query && 'provider' in this.$route.query) {
      this.$message.error(`El ingreso con su cuenta de ${this.$route.query.provider} falló. Por favor inténtelo nuevamente.`);
      
      if (localStorage.getItem("loginRedirectPath")) {
        return this.$router.push(localStorage.getItem("loginRedirectPath"))
      }
    }

    if(this.$route.params.lang !== this.$lang.current().iso_lang) {
      this.setLang(this.$route.params.lang)
    }
  }
}
</script>

<style scoped>
  .is-loading {
    height: 100vh;
    overflow: hidden;
  }
</style>
