<template>
  <div>
    <AppHeader />
    <nuxt />
    <AppFooter />
  </div>
</template>
<script>
import AppHeader from '~/layouts/components/AppHeader'
import AppFooter from '~/layouts/components/AppFooter'

export default {
  components: {
    AppHeader,
    AppFooter
  }
}
</script>
