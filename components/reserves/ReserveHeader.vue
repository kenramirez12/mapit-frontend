<template>
  <div class="reserve-header" :style="`background-image:url(${$imagePath(experience.banner_image.path)})`">
    <div class="container flex items-center px-4 m-auto">
      <div class="block mr-3">
        <el-button
          circle
          icon="el-icon-arrow-left"
          @click="$router.push(`/${$lang.current().slug}/my/reserves`)" />
      </div>
      <h1 id="reserve-title" class="text-white text-2xl md:text-3xl leading-tight">
        {{ $lang.apiTranslate(experience.translations, 'title') }}
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    experience: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .reserve-header {
    display: flex;
    background-size: cover;
    background-position: center;
    height: 230px;
  }
</style>
