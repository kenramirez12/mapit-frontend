<template>
  <div class="custom-card" @click="$router.push('/experiences/2')">
    <div
      v-if="!loading || (experience && experience.on_sale === 1)"
      class="custom-card__sale">
      <div class="custom-card__sale-percentage">-{{ experience.sale_percentage }}%</div>
      <img src="~/assets/images/card-sale-bg.svg" width="32">
    </div>
    <div class="custom-card__image" style="height: 240px">
      <PuSkeleton :loading="loading" height="100%">
        <img v-if="experience" :src="$imagePath(experience.banner_image.path)">
      </PuSkeleton>
    </div>
    <div class="custom-card__content">
      <div class="flex items-center">
        <PuSkeleton :loading="loading" height="20px" style="width:100%;max-width:100px">
          <div v-if="experience" style="font-size:13px">
            {{ experience.destination.name }} 
            <span class="text-gray-500 ml-3">Medio Día</span>
          </div>
        </PuSkeleton>
        <a
          v-if="!loading"
          href="#"
          class="ml-auto"
          @click.prevent="favorite = !favorite">
          <img v-if="favorite" src="~/assets/images/icon-heart.svg" height="20">
          <img v-else src="~/assets/images/icon-heart-outline.svg" height="20">
        </a>
      </div>
      <div
        v-if="loading"
        class="my-6">
        <PuSkeleton :loading="loading" height="22px" width="100%" class="block mb-1" />
        <PuSkeleton :loading="loading" height="22px" width="70%" class="block mb-1" />
      </div>
      <p v-else class="my-6 text-base">
        {{ $lang.apiTranslate(experience.translations, 'title') }}
      </p>
      <div class="flex items-end">
        <div class="custom-card__normal-price">
          <PuSkeleton :loading="loading" height="13px" width="38px" class="block mb-1">
            <span style="font-size:13px">Desde</span>
          </PuSkeleton>
          <PuSkeleton :loading="loading" height="26px" width="110px">
            <span class="block font-light has-sale-price">US$ 39.90</span>
          </PuSkeleton>
        </div>
        <div
          v-if="!loading"
          class="custom-card__sale-price">
          US$ 39.90
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    experience: {
      type: Object,
      required: false
    },
    loading: {
      type: Boolean,
      required: false,
      value: () => false
    }
  },

  data () {
    return {
      favorite: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .custom-card {
    width: 100%;
    max-width: 20rem;
    box-shadow: 0 0 15px rgba(0, 0, 0, .15);
    position: relative;
    transition: all 0.35s;
    cursor: pointer;

    &:hover {
      transform: scale(.99);
      box-shadow: 0 0 5px rgba(0, 0, 0, .3);
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
      padding: 1.5rem;
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
