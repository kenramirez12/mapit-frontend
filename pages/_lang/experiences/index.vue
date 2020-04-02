<template>
  <div>
    <CategoriesHeaderSlider :selected.sync="selectedDestination" />
    <div class="container py-6 px-4 my-6 mx-auto">
      <div class="flex flex-wrap">
        <div class="w-3/12 pr-6">
          <el-dropdown trigger="click" placement="bottom" class="w-full mb-6 pb-6">
            <el-button
              type="primary"
              plain
              class="w-full uppercase font-light"
              style="border-width:2px"
            >
              Ordenar por <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item>Action 4</el-dropdown-item>
              <el-dropdown-item>Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <ul class="text-sm pb-6 border-black border-b">
            <div class="flex items-center justify-between pb-2 mb-3 border-black border-b">
              <span>ALL</span>
              <span>22</span>
            </div>
            <li
              v-for="destination in destinations"
              :key="destination.id"
              class="item-with-counter">
              <a
                @click.prevent="selectedDestination = destination.id"
                :class="{ 'text-primary font-bold' : selectedDestination === destination.id }"
                href="#">
                {{ destination.name }}
              </a>
              <div class="rounded-counter"><span>08</span></div>
            </li>
          </ul>
        </div>
        <div class="w-9/12 pl-6 ml-auto">
          <ExperiencesGrid
            :cols="3"
            :experiences.sync="experiences"
            :is-loading.sync="loadingExperiences" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CategoriesHeaderSlider from '@/components/CategoriesHeaderSlider'
import ExperiencesGrid from '@/components/ExperiencesGrid'

export default {
  components: {
    CategoriesHeaderSlider,
    ExperiencesGrid
  },

  data() {
    return {
      experiences: [],
      loadingExperiences: false,
      selectedDestination: '',
      destinations: [
        { id: 1, name: 'Lima' },
        { id: 2, name: 'Cusco' },
        { id: 3, name: 'Arequipa' }
      ],
      filters: {
        experience_id: []
      }
    }
  },

  async mounted () {
    this.retrieveExperiences()
  },

  methods: {
    ...mapActions({
      getExperiences: 'experiences/getExperiences'
    }),
    
    async retrieveExperiences() {
      this.loadingExperiences = true
      const experiences = await this.getExperiences()
      this.experiences = experiences ? experiences : []
      this.loadingExperiences = false
    }
  }
}
</script>

<style>

</style>