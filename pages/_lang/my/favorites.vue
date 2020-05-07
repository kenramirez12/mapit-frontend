<template>
  <div class="flex flex-col">
    <div class="container mx-auto pt-8 inline-block">
      <div class="w-full flex items-center mb-4 md:mb-8 mt-6 px-6 md:px-4">
        <h3 class="text-2xl md:text-4xl font-light">
          {{ $lang.translate(translations, 'favorites') }}
        </h3>
      </div>
    </div>
    <div>
      <ExperiencesSlider
        :experiences="favorites"
        :translations="favoritesTranslations" />
    </div>
    <div
      :class="{ 'mt-5' : favorites && favorites.length === 0 }"
      class="container mx-auto inline-block">
      <div class="w-full flex items-center mb-4 md:mb-8 px-6 md:px-4">
        <h3 class="text-2xl md:text-4xl font-light">
          {{ $lang.translate(translations, 'recommended') }}
        </h3>
      </div>
    </div>
    <div class="mb-8">
      <ExperiencesSlider
        :experiences="recommended"
        :translations="recommendedTranslations" />
    </div>
  </div>
</template>

<script>
import ExperiencesSlider from '~/components/home/ExperiencesSlider'

export default {
  middleware: 'auth',
  components: { ExperiencesSlider },
  data() {
    return {
      favorites: null,
      recommended: null,
      translations: {
        'es_ES': {
          favorites: 'Mis favoritos',
          recommended: 'Recomendados'
        },
        'en_EN': {
          favorites: 'My favorites',
          recommended: 'Recommended'
        }
      },
      favoritesTranslations: {
        es_ES: {
          noResultsCopy: 'Todavía no agregas experiencias a tu lista de favoritos!'
        },
        en_EN: {
          noResultsCopy: 'You haven’t added any experiences to your favorites yet!'
        }
      },
      recommendedTranslations: {
        es_ES: {
          noResultsCopy: 'No encontramos lo que buscas'
        },
        en_EN: {
          noResultsCopy: 'We couldn’t find what you’re searching for'
        }
      }
    }
  },
  computed: {
    currentFavorites() {
      if(this.$auth.loggedIn) {
        return this.$auth.$state.user.favorites
      }
    }
  },
  watch: {
    currentFavorites() {
      this.favorites = null
      this.recommended = null
      this.retrieveFavorites()
    }
  },
  mounted() {
    this.retrieveFavorites()
  },
  methods: {
    async retrieveFavorites() {
      try {
        const resp = await this.$axios.get('/user/favorites')
        this.favorites = resp.data.favorites
        this.recommended = resp.data.recommended
      } catch (error) {
        this.$log.error('retrieveFavorites', error, error.response)
      }
    }
  }
}
</script>

<style>

</style>