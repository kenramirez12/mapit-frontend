<template>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['currentLang'])
  },
  mounted () {
    this.$router.push(`/${this.currentLang.slug}/`)
  }
}
</script>
