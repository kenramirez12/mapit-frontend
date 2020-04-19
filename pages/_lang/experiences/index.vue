<template>
  <div>
    <CategoriesHeaderSlider :translations="pageTranslations" />
    <div class="container max-width-container py-6 lg:px-4 my-6 mx-auto">
      <div class="flex">
        <FiltersSidebar @refresh="retrieveExperiences" />

        <div class="experiences-container">
          <ExperiencesGrid
            :experiences.sync="experiences"
            :is-loading.sync="loadingExperiences" />
          
          <div
            v-if="experiences && experiences.length > 0 && lastPage > 1"
            class="block mt-6">
            <el-pagination
              v-if="lastPage"
              layout="prev, pager, next"
              :current-page.sync="currentPage"
              :page-count="lastPage"
              @current-change="handleCurrentPage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
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
      flag: 0,
      experiences: [],
      loadingExperiences: false,
      pageTranslations: {
        'es_ES': {
          copy: `¡Conoce nuestras<br>categorías!`
        },
        'en_EN': {
          copy: '¡Check out<br>our categories!'
        }
      },
      currentPage: 1,
      lastPage: 1
    }
  },
  mounted () {
    if(Object.keys(this.$route.query).length > 0) {
      if('category' in this.$route.query) {
        this.setCurrentCategory(parseInt(this.$route.query.category))
      }
    }
    
    this.retrieveExperiences()
  },
  methods: {
    ...mapActions({
      getExperiences: 'experiences/getExperiences'
    }),
    ...mapMutations({
      setCurrentCategory: 'categories/SET_CURRENT_CATEGORY'
    }),
    handleCurrentPage (page) {
      const params = {page, ...this.filters }
      this.retrieveExperiences(params)
    },
    async retrieveExperiences(params = null) {
      this.loadingExperiences = true

      try {
        const experiences = await this.getExperiences(params)
        this.experiences = experiences.data
        this.lastPage = experiences.last_page 
        this.loadingExperiences = false
      } catch (error) {
        this.loadingExperiences = false
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
