<template>
  <div>
    <PageHeader
      :translations="pageTranslations"
      image="/images/destinations/banner.jpg" />
    <div class="container max-width-container py-6 lg:px-4 my-6 mx-auto">
      <div class="flex">
        <FiltersSidebar
          :show-categories="true"
          @refresh="retrieveExperiences" />

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
import { mapActions } from 'vuex'
import PageHeader from '@/components/PageHeader'
import ExperiencesGrid from '@/components/ExperiencesGrid'
import FiltersSidebar from '@/components/experiences/FiltersSidebar'

export default {
  components: {
    PageHeader,
    ExperiencesGrid,
    FiltersSidebar
  },
  data() {
    return {
      flag: 0,
      experiences: [],
      loadingExperiences: false,
      selectedDestination: '',
      pageTranslations: {
        'es_ES': {
          title: 'Destinos',
          subtitle: `Reserva experiencias auténticas y encuentra cosas para hacer en Cusco, Lima, Puno, Arequipa y más.`
        },
        'en_EN': {
          title: 'Destinations',
          subtitle: 'Book authentic experiences in Cusco, Lima, Puno, Arequipa and beyond.'
        }
      },
      currentPage: 1,
      lastPage: 1
    }
  },
  mounted () {
    this.retrieveExperiences()
  },
  methods: {
    ...mapActions({
      getExperiences: 'experiences/getExperiences'
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

  @media screen and (min-width: 1270px) {
    margin-right: 0;
    padding-left: 1rem;
    max-width: calc(20rem*3);
  }
}
</style>
