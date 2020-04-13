<template>
  <div v-loading="true" style="height: 100vh;"></div>
</template>

<script>
export default {
  mounted () {
    const currentLang = this.$lang.current().slug
    const fullPath = this.$route.fullPath

    return this.$router.push(`/${currentLang}${fullPath}`)
  }
}
</script>
