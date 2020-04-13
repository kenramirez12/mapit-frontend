<template>
  <div class="custom-card">
    <div
      v-if="!loading  && experience && experience.on_sale === 1"
      class="custom-card__sale">
      <div class="custom-card__sale-percentage">-{{ experience.sale_percentage }}%</div>
      <img src="~/assets/images/card-sale-bg.svg" width="32">
    </div>
    <a
      :href="experienceLink"
      @click.prevent="experienceLink !== '' ? $router.push(experienceLink) : ''"
      class="custom-card__image cursor-pointer"
      style="height: 240px">
      <PuSkeleton :loading="loading" height="100%">
        <img v-if="experience" :src="$imagePath(experience.main_image.path)">
      </PuSkeleton>
    </a>
    <div class="custom-card__content">
      <div class="flex items-center">
        <PuSkeleton :loading="loading" height="20px" style="width:100%;max-width:100px;white-space:nowrap">
          <div v-if="experience" style="font-size:13px">
            {{ experience.destination.name }} 
            <span class="text-gray-500 ml-3">{{ $lang.apiTranslate(experience.translations, 'duration') }}</span>
          </div>
        </PuSkeleton>
        <a
          v-if="!loading"
          href="#"
          class="ml-auto"
          @click.prevent="updateFavorite(favorite, experience.id)">
          <img v-if="favorite" src="~/assets/images/icon-heart.svg" height="20">
          <img v-else src="~/assets/images/icon-heart-outline.svg" height="20">
        </a>
      </div>
      <div
        v-if="loading"
        class="my-6">
        <PuSkeleton :loading="loading" height="22px" width="100%" class="block mb-1" />
        <PuSkeleton :loading="loading" height="22px" width="70%" class="block mb-1" />
      </div>
      <a
        v-else
        :href="experienceLink"
        @click.prevent="experienceLink !== '' ? $router.push(experienceLink) : ''"
        class="my-6 text-base cursor-pointer block">
        {{ $lang.apiTranslate(experience.translations, 'title') }}
      </a>
      <div class="flex items-end mt-auto">
        <div class="custom-card__normal-price">
          <PuSkeleton :loading="loading" height="13px" width="38px" class="block mb-1">
            <span style="font-size:13px">{{ $lang.translate(translations, 'from') }}</span>
          </PuSkeleton>
          <PuSkeleton :loading="loading" height="26px" width="110px">
            <span
              v-if="experience"
              class="block font-light"
              :class="{'has-sale-price' : experience.on_sale === 1 }">
              US$ {{ experience.min_price }}</span>
          </PuSkeleton>
        </div>
        <div
          v-if="!loading && experience && experience.on_sale === 1"
          class="custom-card__sale-price">
          US$ {{ salePrice }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    experience: {
      type: Object,
      required: false
    },
    loading: {
      type: Boolean,
      required: false,
      value: () => false
    }
  },
  data () {
    return {
      favorite: false,
      translations: {
        'es_ES': {
          from: 'Desde'
        },
        'en_EN': {
          from: 'From'
        }
      }
    }
  },
  computed: {
    salePrice () {
      if(!this.experience || this.experience.on_sale === 0) return null

      const discount = this.experience.min_price * parseInt(this.experience.sale_percentage) / 100
      const salePrice = this.experience.min_price - discount
      return salePrice.toFixed(2)
    },
    experienceLink () {
      if(!this.experience) return ''
      return `/${this.$lang.current().slug}/experiences/${this.$lang.apiTranslate(this.experience.translations, 'slug')}`
    }
  },
  methods: {
    ...mapMutations({
      setAuthDialogVisible: 'SET_AUTH_DIALOG_VISIBLE'
    }),
    updateFavorite(favorite, experienceId) {
      if(!this.$auth.loggedIn) {
        return this.setAuthDialogVisible(true)
      }
      
      const newFavorite = !favorite
      this.favorite = newFavorite

      let message = ''
        message = newFavorite ?
        `Experiencia agregada a tu lista de favoritos` :
        `Experiencia eliminada de tu lista de favoritos`
      const iconClass = newFavorite ?
        'el-icon-circle-plus text-white mr-2' :
        'el-icon-remove text-white mr-2'

      return this.$message({
        customClass: 'message-dark',
        dangerouslyUseHTMLString: true,
        showClose: true,
        message,
        iconClass
      })
    }
  }
}
</script>
<style lang="scss">
  .el-message {
    border-radius: 0;

    &__content {
      padding-right: 30px!important;
    }
  }

  .message-dark {
    // background-color: #323232;
    background-color: rgba(0, 0, 0, 0.8);
    border: 0;

    .el-message {
      &__icon, &__content {
        color: #fff!important;
      }
    }
  }
</style>
<style lang="scss" scoped>
  .custom-card {
    width: 100%;
    max-width: 17rem;
    height: 100%;
    box-shadow: 0 0 15px rgba(0, 0, 0, .15);
    position: relative;
    transition: all 0.2s;
    margin: auto;

    @media screen and (min-width: 768px) {
      max-width: 18rem;
    }

    &:hover {
      transform: scale(.99);
      box-shadow: 0 0 8px rgba(0, 0, 0, .2);
    }

    &__sale {
      position: absolute;
      top: -14px;
      right: -16px;
      width: 32px;

      &-percentage {
        font-size: .8rem;
        color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
      }
    }

    &__image {
      width: 100%;
      display: block;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      padding: 1.5rem;
    }

    &__sale-price {
      color: var(--red);
      font-size: 1.5rem;
      font-weight: 300;
      line-height: 1.1em;
      margin-left: 1.5rem;
    }
  }

  .has-sale-price {
    text-decoration: line-through;
  }
</style>
