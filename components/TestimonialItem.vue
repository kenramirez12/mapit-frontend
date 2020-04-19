<template>
  <div
    class="testimonial-item"
    :class="{ 'testimonial-item--white' : formattedTestimonialNumber !== null }"  
  >
    <span v-if="formattedTestimonialNumber" class="testimonial-item__number">
      {{ formattedTestimonialNumber }}
    </span>
    <div class="testimonial-item__content">
      <span class="text-3xl font-light leading-tight">
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
    <img :src="$imagePath(testimonial.avatar.path)" class="testimonial-item__image" alt="">
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
      max-width: 30rem;
      order: 1;

      @media screen and (min-width: 768px) {
        padding-right: 3rem;
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
      margin-bottom: 5rem;
      order: 0;

      @media screen and (min-width: 560px) {
        width: 100%;
        margin-left: 0;
      }

      @media screen and (min-width: 768px) {
        width: 300px;
        height: auto;
        margin-left: 0;
        margin-bottom: 0;
        order: 1;
      }

      @media screen and (min-width: 920px) {
        width: 400px;
      }
    }

    &__number {
      position: absolute;
      line-height: 1;
      font-weight: 200;
      font-size: 14rem;
      left: -20%;
      color: #D8D8D8;
      transition: opacity .3s;
      top: 280px;

      @media screen and (min-width: 1024px) {
        font-size: 8rem;
        top: auto;
      }

      @media screen and (min-width: 1024px) {
        font-size: 16rem;
        left: -45%;
      }
    }
  }
</style>