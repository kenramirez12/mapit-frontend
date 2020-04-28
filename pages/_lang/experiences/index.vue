<template>
  <div>
    <CategoriesHeaderSlider :translations="pageTranslations" />
    <div class="container max-width-container py-6 px-4 my-6 mx-auto">
      <div class="flex">
        <FiltersSidebar />
        <div class="experiences-container">
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
import CategoriesHeaderSlider from '@/components/CategoriesHeaderSlider'
import ExperiencesGrid from '@/components/ExperiencesGrid'
import FiltersSidebar from '@/components/experiences/FiltersSidebar'

export default {
  components: {
    CategoriesHeaderSlider,
    ExperiencesGrid,
    FiltersSidebar
  },
  data() {
    return {
      experiences: null,
      pageTranslations: {
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
          this.setFilter({ prop: item, value: parseInt(this.$route.query[item]) })
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

<style lang="scss">
.max-width-container {
  max-width: 980px!important;

  @media screen and (min-width: 1270px) {
    max-width: 1300px!important;
  }
}

.experiences-container {
  width: 100%;
  max-width: calc(20rem*2);
  margin-right: auto;
  margin-left: auto;

  @media screen and (min-width: 960px) {
    padding-left: 1rem;
  }

  @media screen and (min-width: 1270px) {
    margin-right: 0;
    max-width: calc(20rem*3);
  }
}
</style>
