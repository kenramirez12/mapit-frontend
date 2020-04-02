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
          <div
            v-if="currentDestination"
            class="flex items-center font-light small mb-5">
            <el-tag
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{currentDestination.name}}
            </el-tag>
          </div>
          <ul
            v-if="destinations"
            class="text-sm pb-2 border-black border-b">
            <div class="flex items-center justify-between pb-2 mb-3 border-black border-b">
              <span>TODOS</span>
              <span>{{totalDestinationExpCount}}</span>
            </div>
            <li
              v-for="destination in destinations"
              :key="destination.id"
              class="item-with-counter">
              <a
                @click.prevent="currentDestinationId = destination.id"
                :class="{ 'text-primary font-bold' : currentDestinationId === destination.id }"
                href="#">
                {{ destination.name }}
              </a>
              <div class="rounded-counter">
                <span>{{ destination.experiences_count }}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="w-9/12 pl-6 ml-auto">
          <ExperiencesGrid
            :cols="3"
            :experiences.sync="experiences"
            :is-loading.sync="loadingExperiences" />
          
          <div class="block mt-6">
            <el-pagination
              v-if="filters.lastPage"
              layout="prev, pager, next"
              :current-page.sync="filters.currentPage"
              :page-count="filters.lastPage"
              @current-change="handleCurrentPage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CategoriesHeaderSlider from '@/components/CategoriesHeaderSlider'
import ExperiencesGrid from '@/components/ExperiencesGrid'

export default {
  components: {
    CategoriesHeaderSlider,
    ExperiencesGrid
  },
  data() {
    return {
      flag: 0,
      currentDestinationId: '',
      experiences: [],
      loadingExperiences: false,
      selectedDestination: '',
      filters: {
        currentPage: 1,
        lastPage: 1
      }
    }
  },
  computed: {
    ...mapGetters({
      destinations: 'destinations/destinations'
    }),
    totalDestinationExpCount() {
      if(!this.destinations) return 0
      let total = 0
      this.destinations.forEach(item => {
        total += parseInt(item.experiences_count)
      })

      return total
    },
    currentDestination() {
      if(this.currentDestinationId === '') return null
      const current = this.destinations.find(item => item.id === this.currentDestinationId)
      return current
    }
  },
  watch: {
    async currentDestinationId(value) {
      const params = {
        page: 1,
        destination_id: value
      }

      try {
        const experiences = await this.retrieveExperiences(params)
        this.experiences = experiences.data
        this.filters.lastPage = experiences.last_page
        this.filters.currentPage = 1
      } catch (error) {
        console.error(error)
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

    handleClose () {
      this.currentDestinationId = ''
    },

    handleCurrentPage (page) {
      const params = {
        page,
        destination_id: this.currentDestinationId
      }

      this.retrieveExperiences(params)
    },
    
    async retrieveExperiences(params = null) {
      this.loadingExperiences = true

      try {
        const experiences = await this.getExperiences(params)
        this.experiences = experiences.data
        this.filters.lastPage = experiences.last_page 
        this.loadingExperiences = false
      } catch (error) {
        this.loadingExperiences = false
      }
    }
  }
}
</script>
