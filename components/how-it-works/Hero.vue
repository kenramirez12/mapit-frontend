<template>
  <div class="flex flex-wrap h-full">
    <div
      @click="$router.push(`/${$lang.current().slug}/how-it-works/travelers`)"
      class="hero hero__traveler">
      <div class="hero__title">Para viajeros</div>
    </div>
    <div
      @click="$router.push(`/${$lang.current().slug}/how-it-works/host`)"
      class="hero hero__host">
      <div class="hero__title">Para anfitriones</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .hero {
    width: 50%;
    // height: 100%;
    background-size: cover;
    background-position: center;
    position: relative;
    cursor: pointer;

    &__traveler {
      background-image: url('/images/how-it-works/travelers.jpg');

      &:hover {
        .hero__title {
          padding: 14rem 3.5rem 2rem;
        }
      }

      .hero__title {
        position: absolute;
        top: 18%;
        left: 50%;
        transform: translateX(-50%);
        padding: 10rem 1.5rem 2rem;


        &::before {
          width: 2px;
          height: 18px;
          bottom: 0;
          left: calc(50% - 1px);
        }
      }
    }

    &__host {
      background-image: url('/images/how-it-works/hosts.jpg');

      &:hover {
        .hero__title {
          padding: 7rem 3rem 7rem 1.5rem;
        }
      }

      .hero__title {
        position: absolute;
        top: 50%;
        right: 5%;
        transform: translateY(-50%);
        padding: 5rem 1.5rem;

        &::before {
          width: 18px;
          height: 2px;
          left: 0;
          top: calc(50% - 1px);
        }
      }
    }

    &__title {
      font-size: 42px;
      font-weight: 300;
      color: #fff;
      line-height: 1;
      white-space: nowrap;
      border: 2px solid var(--primary);
      display: inline-block;
      position: relative;
      transition: padding 0.3s;

      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: calc(50% - 1px);
        background-color: var(--primary);
      }
    }
  }
</style>
