<template>
  <div class="page-header" :style="{ backgroundImage: `url(${baseBackground})` }">
    <div class="container page-header__container m-auto px-4">
      <div :class="contentClass">
        <h1 class="page-header__title">{{ title }}</h1>
        <p v-if="subtitle !== ''" class="page-header__description">{{ subtitle }}</p>
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
      required: true
    },
    subtitle: {
      type: String,
      required: false,
      default: () => ''
    },
    contentClass: {
      type: String,
      required: false,
      default: () => ''
    }
  },
  data() {
    return {
      baseBackground
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-header {
    display: flex;
    height: 640px;
    background-attachment: fixed;
    background-size: cover;

    &__container {
      height: 100%;
      display: flex;
      align-items: center;
    }

    &__title {
      font-weight: 300;
      font-size: 65px;
      line-height: 1.2;
      color: #fff;
    }

    &__description {
      font-weight: 300;
      font-size: 32px;
      line-height: 1.3;
      color: rgba(#fff, .7);
      max-width: 640px;
    }
  }
</style>