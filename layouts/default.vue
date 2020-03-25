<template>
  <div>
    <AppHeader />
    <nuxt />
    <AppFooter />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import AppHeader from '~/layouts/components/AppHeader'
import AppFooter from '~/layouts/components/AppFooter'

export default {
  components: {
    AppHeader,
    AppFooter
  },

  methods: {
    ...mapActions({
      getCategories: 'categories/getCategories'
    })
  },

  mounted () {
    this.getCategories()
  }
}
</script>
