<template>
  <div
    class="explore-section"
    style="background-image: url('/images/home/bg_final.jpg')">
    <el-button
      @click="$router.push(`/${$lang.current().slug}/experiences`)"
      type="primary"
      size="large"
      class="main-btn text-sm uppercase font-light">
      {{ $lang.translate(translations, 'start_explore') }}
    </el-button>
  </div>
</template>

<script>
export default {
  props: {
    translations: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.explore-section {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24rem;
  background-size: cover;
  background-position: center right;

  @media screen and (min-width: 768px) {
    height: 34rem;
  }
}

.main-btn {
  height: 50px;
  width: 280px;
  letter-spacing: 0.16em;
  box-shadow: 0 0 13px rgba(0, 0, 0, .3);
  transition: all 0.3s;

  &:hover {
    transform: scale(1.04);
    box-shadow: 0 0 18px rgba(0, 0, 0, .2);
  }
}
</style>