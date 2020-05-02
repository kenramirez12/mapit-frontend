<template>
  <div class="faq-item">
    <span class="text-sm block mb-2 font-medium">{{ faq.question }}</span>  
    <p class="text-xs sm:text-sm font-light">{{ faq.answer }}</p>
  </div>
</template>

<script>
export default {
  props: {
    faq: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scss>
  .faq-item {
    padding: 1rem 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0px 0px 12px rgba(174, 174, 192, 0.4);

    &:last-child {
      margin-bottom: 0;
    }
  }
</style>