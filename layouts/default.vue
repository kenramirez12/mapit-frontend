<template>
  <div>
    <AppHeader />
    <nuxt />
    <AppFooter />
  </div>
</template>
<script>
import AppHeader from '~/components/AppHeader'
import AppFooter from '~/components/AppFooter'

export default {
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style src="tailwindcss/dist/base.css"></style>
<style src="tailwindcss/dist/components.css"></style>
<style src="tailwindcss/dist/utilities.css"></style>
