<template>
  <header class="header">
    <div class="header__container container mx-auto pl-3 flex items-center">
      <a @click.prevent="$router.push('/')" href="#">
        <img src="~/assets/images/mapit-logo.svg" width="120" height="22" />
      </a>
      <AppMenu />
    </div>
  </header>
</template>

<script>
import AppMenu from '~/components/AppMenu'

export default {
  components: { AppMenu }
}
</script>

<style lang="scss">
  .header {
    &__container {
      height: 80px;
    }
  }
</style>