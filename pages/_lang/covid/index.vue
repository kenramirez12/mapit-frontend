<template>
  <div class="flex flex-wrap h-full">
    <div
      @click="$router.push(`/${$lang.current().slug}/covid/response`)"
      class="hero hero__response">
      <div class="hero__title">
        {{ $lang.translate(translations, 'about') }}
      </div>
    </div>
    <div
      @click="$router.push(`/${$lang.current().slug}/covid/online-experiences`)"
      class="hero hero__experiences">
      <div class="hero__title">
        {{ $lang.translate(translations, 'online_experiences') }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      translations: {
        es_ES: {
          about: 'About the Coronavirus Outbreak',
          online_experiences: 'Launching online experiences'
        },
        en_EN: {
          about: 'About the Coronavirus Outbreak',
          online_experiences: 'Launching online experiences'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .hero {
    width: 100%;
    // height: 100%;
    background-size: cover;
    background-position: center;
    position: relative;
    cursor: pointer;
    transition: all 0.3s;

    &__experiences {
      background-position: 50% 60%;
    }

    @media screen and (min-width: 768px) {
      width: 50%;

      &__experiences {
        background-position: center;
      }
    }

    &:hover {
      // background-size: 105%;
      
      .hero__title {
        text-decoration: underline;
      }
    }

    &__response {
      background-image: url('/images/covid/banner-01.jpg');
    }

    &__experiences {
      background-image: url('/images/covid/banner-02.jpg');
    }

    &__title {
      font-size: 28px;
      line-height: 1.2;
      max-width: 300px;
      font-weight: 300;
      color: #fff;
      display: block;
      position: absolute;
      left: 2rem;
      top: 50%;
      transform: translateY(-50%);

      @media screen and (min-width: 768px) {
        font-size: 42px;
      }
    }
  }
</style>
