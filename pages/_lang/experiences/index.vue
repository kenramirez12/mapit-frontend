<template>
  <div>
    <CategoriesHeaderSlider
      :selected.sync="selectedDestination"
      :translations="pageTranslations"
      @handlerCategory="handlerUpdateCategory" />
    <div class="container max-width-container py-6 lg:px-4 my-6 mx-auto">
      <div class="flex flex-wrap">
        <div class="hidden md:block md:w-4/12 lg:w-3/12 pr-6">
          <el-select
            v-model="filters.sort_by"
            class="w-full text-center mb-6 pn-6 border-0"
            style="border:1px solid var(--primary)"
            :placeholder="$lang.translate(pageTranslations, 'sortBy')">
            <el-option
              v-for="item in sortFilters"
              :key="item.value"
              :label="$lang.translate(item.translations, 'label')"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="flex flex-wrap items-center font-light small mb-5">
            <el-tag
              v-if="currentCategoryObject"
              closable
              size="medium"
              :disable-transitions="false"
              @close="handleClose('category_id')"
              class="mr-2 mb-2">
              {{ $lang.apiTranslate(currentCategoryObject.translations, 'name') }}
            </el-tag>
            <el-tag
              v-if="currentDestination"
              closable
              size="medium"
              :disable-transitions="false"
              @close="handleClose('destination_id')"
              class="mr-2 mb-2">
              {{ currentDestination.name }}
            </el-tag>
            <el-tag
              v-if="currentSortFilter"
              closable
              size="medium"
              :disable-transitions="false"
              @close="handleClose('sort_by')"
              class="mb-2">
              {{ $lang.translate(currentSortFilter.translations, 'label') }}
            </el-tag>
          </div>
          <ul
            v-if="destinations"
            class="text-sm pb-2 border-black border-b">
            <div class="flex items-center justify-between pb-2 mb-3 border-black border-b">
              <span>{{ $lang.translate(pageTranslations, 'all') }}</span>
              <span>{{totalDestinationExpCount}}</span>
            </div>
            <li
              v-for="destination in destinations"
              :key="destination.id"
              @click.prevent="filters.destination_id = destination.id"
              class="item-with-counter cursor-pointer">
              <span :class="{ 'text-primary font-bold' : filters.destination_id === destination.id }">
                {{ destination.name }}
              </span>
              <div class="rounded-counter">
                <span>{{ destination.experiences_count }}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="w-full md:w-8/12 lg:w-9/12 xl:pl-6 lg:ml-auto">
          <ExperiencesGrid
            :cols="3"
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
import { mapGetters, mapMutations, mapActions } from 'vuex'
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
      experiences: [],
      loadingExperiences: false,
      selectedDestination: '',
      pageTranslations: {
        'es_ES': {
          copy: `¡Conoce nuestras<br>categorías!`,
          sortBy: 'ORDENAR POR',
          all: 'TODOS'
        },
        'en_EN': {
          copy: '¡Check out<br>our categories!',
          sortBy: 'SORT BY',
          all: 'ALL'
        }
      },
      sortFilters: [
        {
          value: 'min_price',
          sort: 'ASC',
          translations: {
            'es_ES': {
              label: 'Precio - menor a mayor'
            },
            'en_EN': {
              label: 'Price - lowest first'
            }
          }
        },
        {
          value: 'max_price',
          sort: 'DESC',
          translations: {
            'es_ES': {
              label: 'Precio - mayor a menor'
            },
            'en_EN': {
              label: 'Price - highest first'
            }
          }
        },
        {
          value: 'on_sale',
          sort: 'DESC',
          translations: {
            'es_ES': {
              label: 'En oferta'
            },
            'en_EN': {
              label: 'On sale'
            }
          }
        }
      ],
      currentPage: 1,
      lastPage: 1,
      filters: {
        destination_id: '',
        category_id: '',
        sort_by: '',
        sort: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      destinations: 'destinations/destinations',
      categories: 'categories/categories',
      currentCategory: 'categories/currentCategory'
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
      if(this.filters.destination_id === '') return null
      const current = this.destinations.find(item => item.id === this.filters.destination_id)
      return current
    },
    currentSortFilter() {
      if(this.filters.sort_by === '') return null
      const current = this.sortFilters.find(item => item.value === this.filters.sort_by)
      return current
    },
    currentCategoryObject() {
      if(this.filters.category_id === '') return null
      const current = this.categories.find(item => item.id === this.filters.category_id)
      return current
    }
  },
  watch: {
    filters: {
      deep: true,
      handler (value) {
        let sanitizedFilters = this.filters
        sanitizedFilters.sort = this.currentSortFilter ? this.currentSortFilter.sort : ''
        this.retrieveExperiences(sanitizedFilters)
      }
    },
    currentCategory(value) {
      this.filters.category_id = value
    }
  },
  async mounted () {
    this.retrieveExperiences()
  },
  methods: {
    ...mapActions({
      getExperiences: 'experiences/getExperiences'
    }),
    ...mapMutations({
      setCurrentCategory: 'categories/SET_CURRENT_CATEGORY'
    }),

    handlerUpdateCategory (catId) {
      this.filters.category_id = catId
    },

    handleClose (tag) {
      this.filters[tag] = ''

      if(tag === 'sort_by') {
        this.filters.sort = ''
      }

      if(tag === 'category_id') {
        this.setCurrentCategory('')
      }
    },

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
  max-width: 1400px!important;
}
</style>
