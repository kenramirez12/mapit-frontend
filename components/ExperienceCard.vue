<template>
  <div class="custom-card" @click="$router.push('/experiences/2')">
    <div class="custom-card__sale">
      <div class="custom-card__sale-percentage">-30%</div>
      <img src="~/assets/images/card-sale-bg.svg" width="32">
    </div>
    <div class="custom-card__image" style="height: 240px">
      <img src="~/assets/images/experience-card-iamge.jpg">
    </div>
    <div class="custom-card__content">
      <div class="flex items-center">
        <div style="font-size:13px">CUSCO <span class="text-gray-500 ml-3">Half Day</span></div>
        <a href="#" class="ml-auto" @click.prevent="favorite = !favorite">
          <img v-if="favorite" src="~/assets/images/icon-heart.svg" height="20">
          <img v-else src="~/assets/images/icon-heart-outline.svg" height="20">
        </a>
      </div>
      <p class="my-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
      <div class="flex items-end">
        <div class="custom-card__normal-price">
          <span style="font-size:13px">Desde</span>
          <span class="block font-light has-sale-price">US$ 39.90</span>
        </div>
        <div class="custom-card__sale-price">
          US$ 39.90
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: false
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
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
      transform: scale(.96);
      box-shadow: 0 0 10px rgba(0, 0, 0, .2);
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
