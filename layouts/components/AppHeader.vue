<template>
  <header class="header">
    <div class="header__container mx-auto pl-3 flex items-center">
      <a @click.prevent="$router.push(`/${currentLang.slug}/`)" href="#">
        <img src="~/assets/images/mapit-logo.svg" width="120" height="22" />
      </a>
      <AppMenu />
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import AppMenu from '~/layouts/components/AppMenu'

export default {
  components: { AppMenu },
  computed: {
    ...mapGetters({
      currentLang: 'currentLang'
    })
  }
}
</script>

<style lang="scss">
  .header {
    &__container {
      height: 80px;
    }
  }
</style>