<template>
  <div class="linear-steps">
    <div
      v-for="(step, n) in steps"
      :key="'step_' + n"
      class="linear-step-item">
      <div class="linear-step-item__content">
        <span class="linear-step-item__number--responsive">{{ step.number }}</span>
        <div class="linear-step-item__image">
          <img :src="`/images/covid/${step.image}`">
        </div>
        <div class="linear-step-item__description">
          <p class="font-light">{{ $lang.translate(step.translations, 'content') }}</p>
        </div>
      </div>
      <div class="linear-step-item__number">
        <span class="text-5xl font-light leading-none">{{ step.number }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    steps: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .linear-steps {
    position: relative;
    width: 100%;
    max-width: 260px;
    margin: auto;

    @media screen and (min-width: 590px) {
      max-width: 700px;
    }

    &::after {
      display: block;
      width: 1px;
      background-color: #9F9F9F;
      position: absolute;
      right: 79px;
      top: 75px;
      bottom: 75px;
      z-index: -1;

      @media screen and (min-width: 590px) {
        content: '';
      }
    }
  }

  .linear-step-item {
    display: flex;
    flex-wrap: wrap;

    @media screen and (min-width: 590px) {
      height: 150px;
    }

    &:first-child {
      --color: #D3FFFF;
      --circle-color: #37D7D7;
    }

    &:nth-child(2) {
      --color: #FFF3C5;
      --circle-color: #FAD33D;
      margin-top: 2.5rem;
      margin-bottom: 2.5rem;
    }

    &:last-child {
      --color: #FFCED0;
      --circle-color: #FF5A5F;
    }

    &__content {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-wrap: wrap;
      padding: 1.5rem 2rem 1.5rem 1.5rem;
      background-color: var(--color);
      border-top-left-radius: 6.5rem;
      border-top-right-radius: 6.5rem;
      box-shadow: 0px 0px 12px rgba(174, 174, 192, 0.4);

      @media screen and (min-width: 590px) {
        width: calc(100% - 110px);
        border-top-right-radius: 0;
        border-top-left-radius: 5rem;
        border-bottom-left-radius: 5rem;
        flex-direction: row;
      }
    }

    &__image {
      --size: 120px;
      width: var(--size);
      height: var(--size);
      margin-bottom: 2rem;

      @media screen and (min-width: 590px) {
        --size: 100px;
        margin-bottom: 0;
      }
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }

    &__description {
      width: 100%;
      font-size: 90%;
      text-align: center;

      @media screen and (min-width: 590px) {
        width: calc(100% - 120px);
        padding-left: 1.5rem;
        text-align: left;
        font-size: 70%;
      }
    }

    &__number {
      display: none;
      align-items: center;
      justify-content: space-between;
      width: 85px;
      margin-left: 25px;
      color: #9F9F9F;
      font-size: 3rem;
      line-height: 1;

      @media screen and (min-width: 590px) {
        display: flex;
      }

      &::before {
        content: '';
        width: 10px;
        height: 10px;
        background-color: var(--circle-color);
        display: block;
        border-radius: 50%;
      }
    }

    &__number--responsive {
      display: block;
      color: #9F9F9F;
      font-size: 3.5rem;
      font-weight: 300;
      margin-bottom: 1rem;

      @media screen and (min-width: 590px) {
        display: none;
      }
    }
  }
</style>
