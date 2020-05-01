<template>
  <div>
    <div class="responsive-floating">
      <ResponsiveFilterBar />
    </div>
    <CategoriesHeaderSlider :translations="translations" />
    <div class="container experiences-container py-6 px-4 my-6 mx-auto">
      <div class="flex">
        <FiltersSidebar class="experiences-container__sidebar" />
        <div class="experiences-container__grid">
          <ExperiencesGrid :experiences.sync="experiences" />
          <div
            v-if="experiences && experiences.length > 0 && lastPage > 1"
            class="block mt-6">
            <el-pagination
              v-if="lastPage"
              layout="prev, pager, next"
              :current-page.sync="currentPage"
              :page-count="lastPage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import CategoriesHeaderSlider from '@/components/experiences/CategoriesHeaderSlider'
import ExperiencesGrid from '@/components/shared/ExperiencesGrid'
import FiltersSidebar from '@/components/experiences/FiltersSidebar'
import ResponsiveFilterBar from '@/components/experiences/ResponsiveFilterBar'

export default {
  components: {
    CategoriesHeaderSlider,
    ExperiencesGrid,
    FiltersSidebar,
    ResponsiveFilterBar
  },
  head() {
    return {
      title: this.pageTranslations[this.currentLang].pageTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.pageTranslations[this.currentLang].pageDescription },
        { hid: 'og:description', name: 'og:description', content: this.pageTranslations[this.currentLang].pageDescription }
      ]
    }
  },
  data() {
    return {
      experiences: null,
      pageTranslations: {
        es: {
          pageTitle: 'MAP IT - Encuentra los mejores tours en Peru!',
          pageDescription: 'Reserva experiencias auténticas en Cusco, Lima, Puno, Arequipa y más.',
        },
        en: {
          pageTitle: 'MAP IT - Find unique things to do in Peru!',
          pageDescription: 'Book authentic experiences in Cusco, Lima, Puno, Arequipa and beyond.'
        }
      },
      translations: {
        'es_ES': {
          copy: `¡Conoce nuestras<br>categorías!`
        },
        'en_EN': {
          copy: '¡Check out<br>our categories!'
        }
      },
      lastPage: 1
    }
  },
  computed: {
    ...mapGetters({
      filters: 'experiences/filters',
      selectedSort: 'experiences/selectedSort'
    }),
    currentLang() {
      if(this.validLang) {
        return this.$route.params.lang
      } return 'en'
    },
    validLang() {
      const allowedLangs = ['es', 'en']
      return 'lang' in this.$route.params && allowedLangs.includes(this.$route.params.lang)
    },
    currentPage: {
      get() {
        return this.filters.page
      },
      set(value) {
        this.setFilter({ prop: 'page', value })
      }
    }
  },
  watch: {
    filters: {
      deep: true,
      handler (value, oldValue) {
        this.$router.push({ query : value })
        let sanitizedFilters = this.sanitizeFilters(this.filters)
        this.retrieveExperiences(sanitizedFilters)
      }
    }
  },
  mounted () {
    this.resetFilters()
    
    if(Object.keys(this.$route.query).length > 0) {
      const filters = ['category', 'destination', 'page']

      filters.forEach(item => {
        if(item in this.$route.query) {
          const value = parseInt(this.$route.query[item])
          if( !Number.isNaN(value) ) {
            this.setFilter({ prop: item, value: parseInt(this.$route.query[item]) })
          }
        }
      })

      if('sort' in this.$route.query) {
        this.setFilter({ prop: 'sort', value: this.$route.query.sort })
      }

      const sanitized = this.sanitizeFilters(this.filters)
      this.retrieveExperiences(sanitized)
    } else {
      this.retrieveExperiences()
    }
  },
  methods: {
    ...mapActions({
      getExperiences: 'experiences/getExperiences'
    }),
    ...mapMutations({
      setFilter: 'experiences/SET_FILTER',
      resetFilters: 'experiences/RESET_FILTERS'
    }),
    sanitizeFilters(filters) {
      let sanitized = {
        category_id: filters.category,
        destination_id: filters.destination,
        page: filters.page
      }

      if(this.selectedSort) {
        sanitized = { ...sanitized, ...this.selectedSort }
      }

      return sanitized
    },
    async retrieveExperiences(params = null) {
      this.experiences = null

      try {
        const experiences = await this.getExperiences(params)
        this.experiences = experiences.data
        this.lastPage = experiences.last_page
      } catch (error) {
        this.experiences = []
      }
    }
  }
}
</script>
