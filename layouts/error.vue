<template>
  <div class="error-page py-5">
    <img class="error-page__image" src="/images/404-animation.gif">
    <div class="error-page__content">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-right"
        class="error-page__btn"
        circle
        @click="$router.push(`/${$lang.current().slug}/`)" />
      <h2 class="error-page__subtitle">404 - PAGE NOT FOUND</h2>
      <h1 class="error-page__title">WHOOPS!</h1>
      <p class="error-page__copy">Guess we got lost in the way<br>Get back to track</p>
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
    align-items: center;
    justify-content: center;

    &__image {
      max-width: 280px;
      width: calc(100% - 30px);
      margin: 0 auto;

      @media screen and (min-width: 640px) {
        max-width: 420px;
      }
    }

    &__content {
      position: relative;
      display: inline-block;
      margin: 1rem auto 0;
      padding-top: 1rem;
      padding-bottom: 1rem;
    }

    &__btn {
      transform: scale(1.5);
      position: absolute;
      right: -2rem;
      top: -1rem;

      @media screen and (min-width: 640px) {
        right: -3rem;
        top: 0;
      }
    }

    &__title {
      font-size: 52px;
      line-height: 1;
      font-weight: 300;

      @media screen and (min-width: 640px) {
        font-size: 64px;
      }
    }

    &__subtitle {
      font-size: 1rem;
      font-weight: 300;
      line-height: 1;
    }

    &__copy {
      text-align: right;
    }
  }
</style>
