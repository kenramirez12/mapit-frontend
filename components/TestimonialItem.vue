<template>
  <div class="testimonial-item">
    <span class="testimonial-item__number">0{{ testimonialNumber }}</span>
    <div class="testimonial-item__content" style="background-color:#fff">
      <span class="text-4xl leading-tight">"{{ testimonial.review }}"</span>
      <a href="#" class="flex items-center py-6 my-6">
        <i class="el-icon-collection-tag text-2xl mr-2"></i> Lee más opiniones en
        <img class="ml-8 " src="~/assets/images/social/tripadvisorlight.svg" alt="" width="30">
      </a>
      <div class="flex flex-col">
        <span>{{ testimonial.fullname }}</span>
        <small>{{ testimonial.country }}</small>
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
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .testimonial-item {
    display: flex;

    &:not(.swiper-slide-active) {
      .testimonial-item__number {
        opacity: 0;
      }
    }

    &__content {
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