<template>
  <div
    class="testimonial-item"
    :class="{
      'testimonial-item--white' : formattedTestimonialNumber !== null
    }"  
  >
    <span v-if="formattedTestimonialNumber" class="testimonial-item__number">
      {{ formattedTestimonialNumber }}
    </span>
    <div class="testimonial-item__content">
      <span class="text-lg font-light leading-snug">
        "{{ $lang.apiTranslate(testimonial.translations, 'comment') }}"
      </span>
      <div class="my-auto">
        <a
          v-if="testimonial.external_link !== ''"
          :href="testimonial.external_link"
          target="_blank"
          class="flex items-center py-6 my-6">
          <i class="el-icon-collection-tag text-2xl mr-2"></i> 
          {{ $lang.translate(translations, 'read_more') }}
          <img class="ml-4" src="~/assets/images/social/tripadvisorlight.svg" alt="Trip Advisor Logo" width="30">
        </a>
        <div class="flex flex-col">
          <span>{{ testimonial.author }}</span>
          <small>{{ $lang.apiTranslate(testimonial.translations, 'author_country') }}</small>
        </div>
      </div>
    </div>
    <img
      class="testimonial-item__image md:mb-0"
      :src="$imagePath(testimonial.avatar.path)"
      :class="{
        'mb-16' : testimonialNumber,
        'mb-8' : !testimonialNumber
      }">
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
  },
  data() {
    return {
      translations: {
        'es_ES': {
          read_more: 'Lee más opiniones en'
        },
        'en_EN': {
          read_more: 'For more reviews go to'
        }
      }
    }
  },
  computed: {
    formattedTestimonialNumber() {
      if(this.testimonialNumber === null) return null
      if(this.testimonialNumber < 10) {
        return '0' + this.testimonialNumber
      } else {
        return this.testimonialNumber
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .testimonial-item {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

    @media screen and (min-width: 768px) {
      flex-direction: row;
    }

    &--white {
      @media screen and (min-width: 768px) {
        background-color: #fff;
      }
    }

    &:not(.swiper-slide-active) {
      .testimonial-item__number {
        opacity: 0;
      }
    }

    &__content {
      position: relative;
      display: flex;
      flex-direction: column;
      padding-right: 1.5rem;
      width: 90%;
      order: 1;

      @media screen and (min-width: 768px) {
        width: calc(100% - 400px);
        max-width: 30rem;
        padding-right: 2.5rem;
        position: unset;
        order: 0;
      }
    }

    &__image {
      width: calc(100% + 4rem);
      max-width: initial;
      margin-left: -2rem;
      height: 300px;
      object-fit: cover;
      order: 0;

      @media screen and (min-width: 560px) {
        width: 100%;
        margin-left: 0;
      }

      @media screen and (min-width: 768px) {
        width: 400px;
        height: 550px;
        margin-left: 0;
        margin-bottom: 0;
        order: 1;
      }
    }

    &__number {
      position: absolute;
      line-height: 1;
      font-weight: 200;
      color: #D8D8D8;
      transition: opacity .3s;
      font-size: 5rem;
      top: 310px;
      right: 0;
      font-size: 5rem;

      // @media screen and (min-width: 768px) {
      //   top: 280px;
      //   right: auto;
      //   left: -20%;
      //   font-size: 14rem;
      // }
      @media screen and (min-width: 768px) {
        top: 0;
        right: auto;
        left: -25%;
        font-size: 10rem;
      }

      @media screen and (min-width: 1024px) {
        font-size: 8rem;
        top: auto;
      }

      @media screen and (min-width: 1024px) {
        font-size: 16rem;
        left: -40%;
      }
    }
  }
</style>