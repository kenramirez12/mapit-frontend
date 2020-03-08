<template>
  <div class="explore-section" :style="{ backgroundImage: 'url(' + require('@/assets/images/start-explore-bg.jpg') + ')'}">
    <el-button type="primary" size="large" class="main-btn">Comienza a explorar</el-button>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.explore-section {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 34rem;
  background-attachment: fixed;
  background-size: cover;
}

.main-btn {
  box-shadow: 0 0 13px rgba(0, 0, 0, .3);
  transition: all 0.3s;

  &:hover {
    transform: scale(1.04);
    box-shadow: 0 0 18px rgba(0, 0, 0, .2);
  }
}
</style>