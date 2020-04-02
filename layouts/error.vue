<template>
  <div class="error-page">
    <img class="error-page__image" src="~/assets/images/404-main.svg">
    <div class="error-page__content">
      <el-button
        type="primary"
        icon="el-icon-right"
        class="error-page__btn"
        circle
        @click="$router.push(`/${$lang.current().slug}/`)" />
      <h2 class="error-page__subtitle">404 - PAGE NOT FOUND</h2>
      <h1 class="error-page__title">WHOOPS!</h1>
      <p class="error-page__copy">Guess we got lost in the day<br>Get back to track</p>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations({
      setLang: 'SET_LANG_BY_SLUG'
    })
  },
  created () {
    console.log('error', this.error)
  }
}
</script>

<style lang="scss" scoped>
  .error-page {
    min-height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;

    &__image {
      max-width: 460px;
      width: calc(100% - 30px);
      margin: auto;
    }

    &__content {
      position: relative;
      display: inline-block;
      margin: 1rem auto;
    }

    &__btn {
      transform: scale(1.5);
      position: absolute;
      right: -3rem;
      top: -1.5rem;
    }

    &__title {
      font-size: 72px;
      line-height: 1;
      font-weight: 300;
    }

    &__subtitle {
      font-size: 1.3rem;
      font-weight: 300;
      line-height: 1;
    }

    &__copy {
      text-align: right;
    }
  }
</style>
