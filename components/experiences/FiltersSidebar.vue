<template>
  <div class="experiences-sidebar">
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
    <div v-if="showCategories" class="mt-10 mb-5">
      <el-select
        v-model="filters.category_id"
        :placeholder="$lang.translate(pageTranslations, 'categories')"
        class="w-full border-0 shadow-input">
        <el-option
          v-for="category in categories"
          :key="category.id"
          :label="$lang.apiTranslate(category.translations, 'name')"
          :value="category.id">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    showCategories: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      filters: {
        destination_id: '',
        category_id: '',
        sort_by: '',
        sort: ''
      },
      pageTranslations: {
        'es_ES': {
          sortBy: 'ORDENAR POR',
          all: 'TODOS',
          categories: 'Categorías'
        },
        'en_EN': {
          sortBy: 'SORT BY',
          all: 'ALL',
          categories: 'Categories'
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
              label: 'Price - low to high'
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
              label: 'Price - high to low'
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
      ]
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
      if(this.filters.destination_id === '' || !this.destinations) return null
      const current = this.destinations.find(item => item.id === this.filters.destination_id)
      return current
    },
    currentSortFilter() {
      if(this.filters.sort_by === '') return null
      const current = this.sortFilters.find(item => item.value === this.filters.sort_by)
      return current
    },
    currentCategoryObject() {
      if(this.filters.category_id === '' || !this.categories) return null
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
        this.$emit('refresh', sanitizedFilters)
      }
    },
    currentCategory(value) {
      this.filters.category_id = value
    }
  },
  mounted() {
    if(Object.keys(this.$route.query).length > 0) {
      if('destination' in this.$route.query) {
        this.filters.destination_id = parseInt(this.$route.query.destination)
      }
    }
  },
  methods: {
    ...mapMutations({
      setCurrentCategory: 'categories/SET_CURRENT_CATEGORY'
    }),

    handleClose (tag) {
      this.filters[tag] = ''

      if(tag === 'sort_by') {
        this.filters.sort = ''
      }

      if(tag === 'category_id') {
        this.setCurrentCategory('')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.experiences-sidebar {
  display: none;

  @media screen and (min-width: 960px) {
    width: 100%;
    max-width: 260px;
    display: block;
  }
}
</style>