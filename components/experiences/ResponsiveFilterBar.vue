<template>
  <div class="flex">
    <el-button
      type="primary"
      style="min-width:46px"
      @click="showFilters = !showFilters">
      <el-badge is-dot class="item">
        <i class="el-icon-s-operation text-xl" />
      </el-badge>
    </el-button>
    <el-dropdown
      trigger="click"
      class="w-full"
      @command="onCommandDropdown">
      <el-button class="w-full border-0 py-4 font-normal">
        <div class="flex relative mx-auto" style="max-width:460px">
          <span v-if="currentCategoryObject" class="mx-auto">
            {{ $lang.apiTranslate(currentCategoryObject.translations, 'name') }}
          </span>
          <i style="position:absolute;right:0" class="el-icon-arrow-down el-icon--right text-gray-600" />
        </div>
      </el-button>
      <el-dropdown-menu slot="dropdown" class="top-categories-dropdown py-0">
        <el-dropdown-item
          v-for="category in categories"
          :key="category.id"
          :command="category.id"
          class="text-center py-1 border-b">
          {{ $lang.apiTranslate(category.translations, 'name') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div
      :class="{ show : showFilters }"
      class="responsive-filter-container border-t">
      <FiltersSidebar />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import FiltersSidebar from '@/components/experiences/FiltersSidebar'

export default {
  components: {
    FiltersSidebar
  },
  data() {
    return {
      showFilters: false
    }
  },
  computed: {
    ...mapGetters({
      filters: 'experiences/filters',
      destinations: 'destinations/destinations',
      categories: 'categories/categories'
    }),
    filterCategory: {
      get() {
        return this.filters.category
      },
      set(value) {
        this.setFilter({ prop: 'category', value })
        this.setFilter({ prop: 'page', value: 1 })
      }
    },
    currentCategoryObject() {
      if(this.filterCategory === '' || !this.categories) return null
      const current = this.categories.find(item => item.id === this.filterCategory)
      if(current) {
        return current
      } else return null
    }
  },
  methods: {
    ...mapMutations({
      setFilter: 'experiences/SET_FILTER'
    }),
    onCommandDropdown(categoryId) {
      this.filterCategory = categoryId
    }
  }
}
</script>

<style lang="scss" scoped>
  .responsive-filter-container {
    display: flex;
    position: fixed;
    top: 46px;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #fff;
    padding: 2rem;
    width: 100%;
    max-width: 320px;
    transform-origin: center top;
    transform: scaleY(0);
    z-index: -999;
    opacity: 0;
    transition: all 0.3s;

    &.show {
      transform: scaleY(1);
      opacity: 1;
      z-index: 999;
    }
  }
</style>

<style lang="scss">
  .top-categories-dropdown {
    z-index: 9999!important;
    margin-top: 0!important;
    left: 0!important;
    right: 0!important;

    & > .popper__arrow {
      display: none!important;
    }
  }
</style>
