<template>
  <header class="header">
    <div class="header__container mx-auto pl-4 flex items-center">
      <a @click.prevent="$router.push(`/${currentLang.slug}/`)" href="#">
        <img class="logo-responsive" src="~/assets/images/mapit-iso-primary.svg" />
        <img class="logo-desktop" src="~/assets/images/mapit-logo.svg" width="120" height="22" />
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
    display: none;
    border-bottom: 1px solid #e8e8e8;

    @media screen and (min-width: 768px) {
      display: block;
    }

    &__container {
      height: var(--header-height);
    }
  }

  .logo-responsive {
    display: block;
    height: 40px;

    @media screen and (min-width: 920px) {
      display: none;
    }
  }

  .logo-desktop {
    display: none;

    @media screen and (min-width: 920px) {
      display: block;
    }
  }
</style>