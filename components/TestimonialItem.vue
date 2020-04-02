<template>
  <div
    class="testimonial-item"
    :class="{ 'testimonial-item--white' : testimonialNumber !== null }"  
  >
    <span v-if="testimonialNumber" class="testimonial-item__number">0{{ testimonialNumber }}</span>
    <div class="testimonial-item__content">
      <span class="text-3xl font-light leading-tight">"{{ testimonial.review }}"</span>
      <div class="my-auto">
        <a href="#" class="flex items-center py-6 my-6">
          <i class="el-icon-collection-tag text-2xl mr-2"></i> Lee más opiniones en
          <img class="ml-4" src="~/assets/images/social/tripadvisorlight.svg" alt="Trip Advisor Logo" width="30">
        </a>
        <div class="flex flex-col">
          <span>{{ testimonial.fullname }}</span>
          <small>{{ testimonial.country }}</small>
        </div>
      </div>
    </div>
    <img src="~/assets/images/testimonial.jpg" alt="">
  </div>
</template>

<script>
export default {
  props: {
    testimonial: {
      type: Object,
      required: true
    },
    testimonialNumber: {
      type: Number,
      required: false,
      default: () => null
    }
  }
}
</script>

<style lang="scss" scoped>
  .testimonial-item {
    display: flex;

    &--white {
      background-color: #fff;
    }

    &:not(.swiper-slide-active) {
      .testimonial-item__number {
        opacity: 0;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      padding-right: 4.5rem;
    }

    &__number {
      position: absolute;
      left: -45%;
      line-height: 1;
      font-size: 20rem;
      font-weight: 200;
      color: #D8D8D8;
      transition: opacity .3s;
    }
  }
</style>