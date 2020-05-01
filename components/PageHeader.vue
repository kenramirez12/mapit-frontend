<template>
  <div
    class="page-header"
    :style="{ backgroundImage: `url(${image ? image : baseBackground})` }">
    <div class="container page-header__container m-auto px-4">
      <div :class="contentClass">
        <p
          v-if="preTitle !== ''"
          class="mb-6 md:mb-8 md:text-2xl text-white font-light page-header__pre-title">
          {{ preTitle }}
        </p>
        <h1 class="page-header__title pr-4 mb-4 md:mb-8">
          {{ headerTitle }}
        </h1>
        <p
          v-if="headerSubtitle !== ''"
          class="page-header__description">
          {{ headerSubtitle }}
        </p>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import baseBackground from '~/assets/images/destinations-bg.jpg'

export default {
  props: {
    title: {
      type: String,
      required: false
    },
    preTitle: {
      type: String,
      required: false
    },
    subtitle: {
      type: String,
      required: false
    },
    translations: {
      type: Object,
      required: false
    },
    image: {
      type: String,
      required: false
    },
    contentClass: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      baseBackground
    }
  },
  computed: {
    headerTitle() {
      if(this.title) return this.title
      if(this.translations) {
        return this.$lang.translate(this.translations, 'title')
      }

      return ''
    },
    headerSubtitle() {
      if(this.subtitle) return this.subtitle
      if(this.translations) {
        return this.$lang.translate(this.translations, 'subtitle')
      }

      return null
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-header {
    display: flex;
    // height: calc(100vh - 80px - 55px);
    height: 440px;
    // background-attachment: fixed;
    background-size: cover;
    background-position: center;

    @media screen and (min-width: 768px) {
      height: 640px;
    }

    &__container {
      height: 100%;
      display: flex;
      align-items: center;
    }

    &__title {
      font-weight: 300;
      font-size: 32px;
      line-height: 1.2;
      color: #fff;

      @media screen and (min-width: 768px) {
        font-size: 48px;
      }

      @media screen and (min-width: 1024px) {
        font-size: 65px;
      }
    }

    &__description {
      font-weight: 300;
      font-size: 20px;
      line-height: 1.3;
      color: rgba(#fff, .7);
      max-width: 640px;

      @media screen and (min-width: 768px) {
        font-size: 32px;
      }
    }
  }
</style>