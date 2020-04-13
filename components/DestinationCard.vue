<template>
  <div class="custom-card">
    <div class="custom-card__image" style="height: 380px">
      <PuSkeleton :loading="isLoading" width="100%" height="100%">
        <img v-if="destination && destination.image" :src="$imagePath(destination.image.path)">
      </PuSkeleton>
    </div>
    <div class="custom-card__content">
      <div class="flex items-center justify-between text-2xl">
        <PuSkeleton
          :loading="isLoading"
          width="120px"
          height="36px">
          <h4 v-if="destination">{{ destination.name }}</h4>
        </PuSkeleton>
        <el-button
          v-if="!isLoading"
          type="primary"
          size="small"
          plain
          class="py-2">
          VER MÁS
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    destination: {
      type: Object,
      required: false
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: () => false
    }
  }
}
</script>

<style lang="scss" scoped>
  .custom-card {
    width: 100%;
    max-width: 17rem;
    box-shadow: 0 0 15px rgba(0, 0, 0, .15);
    position: relative;
    transition: all 0.35s;
    cursor: pointer;
    margin: auto;

    @media screen and (min-width: 768px) {
      max-width: 18rem;
    }

    &:hover {
      transform: scale(.99);
      box-shadow: 0 0 8px rgba(0, 0, 0, .2);
    }
    &__sale {
      position: absolute;
      top: -14px;
      right: -16px;
      width: 32px;

      &-percentage {
        font-size: .8rem;
        color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
      }
    }

    &__image {
      width: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__content {
      background-color: #fff;
      padding: 1rem 1.5rem;
    }

    &__sale-price {
      color: var(--red);
      font-size: 1.5rem;
      font-weight: 300;
      line-height: 1.1em;
      margin-left: 1.5rem;
    }
  }

  .has-sale-price {
    text-decoration: line-through;
  }
</style>
