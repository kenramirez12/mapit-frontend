<template>
  <div class="experiences-sidebar">
    <el-select
      v-model="filterSort"
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
        @close="filterCategory = ''"
        class="mr-2 mb-2">
        {{ $lang.apiTranslate(currentCategoryObject.translations, 'name') }}
      </el-tag>
      <el-tag
        v-if="currentDestination"
        closable
        size="medium"
        :disable-transitions="false"
        @close="filterDestination = ''"
        class="mr-2 mb-2">
        {{ currentDestination.name }}
      </el-tag>
      <el-tag
        v-if="currentSortFilter"
        closable
        size="medium"
        :disable-transitions="false"
        @close="filterSort = ''"
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
        @click.prevent="filterDestination = destination.id"
        class="item-with-counter cursor-pointer">
        <span :class="{ 'text-primary font-bold' : filterDestination === destination.id }">
          {{ destination.name }}
        </span>
        <div class="rounded-counter">
          <span>{{ destination.experiences_count }}</span>
        </div>
      </li>
    </ul>
    <div v-if="showCategories" class="mt-10 mb-5">
      <el-select
        v-model="filterCategory"
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
import { mapState, mapGetters, mapMutations } from 'vuex'

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
      }
    }
  },
  computed: {
    ...mapState({
      sortFilters: (s) => s.experiences.sortFilters
    }),
    ...mapGetters({
      filters: 'experiences/filters',
      destinations: 'destinations/destinations',
      categories: 'categories/categories'
    }),
    filterSort: {
      get() {
        return this.filters.sort
      },
      set(value) {
        this.setFilter({ prop: 'sort', value })
        this.setFilter({ prop: 'page', value: 1 })
      }
    },
    filterCategory: {
      get() {
        return this.filters.category
      },
      set(value) {
        this.setFilter({ prop: 'category', value })
        this.setFilter({ prop: 'page', value: 1 })
      }
    },
    filterDestination: {
      get() {
        return this.filters.destination
      },
      set(value) {
        this.setFilter({ prop: 'destination', value })
        this.setFilter({ prop: 'page', value: 1 })
      }
    },
    totalDestinationExpCount() {
      if(!this.destinations) return 0
      let total = 0
      this.destinations.forEach(item => {
        total += parseInt(item.experiences_count)
      })

      return total
    },
    currentDestination() {
      if(this.filterDestination == '' || !this.destinations) return null
      const current = this.destinations.find(item => item.id === this.filterDestination)
      return current
    },
    currentSortFilter() {
      if(this.filterSort === '') return null
      const current = this.sortFilters.find(item => item.value === this.filterSort)
      return current
    },
    currentCategoryObject() {
      if(this.filterCategory === '' || !this.categories) return null
      const current = this.categories.find(item => item.id === this.filterCategory)
      return current
    }
  },
  methods: {
    ...mapMutations({
      setFilter: 'experiences/SET_FILTER'
    })
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