<template>
  <div
    class="hero super-center flex-col px-4"
    style="background-image: url('/images/home/banner_2.jpg')">
    <h1 class="hidden sm:block text-5xl md:text-6xl font-light px-8 pb-4 mb-6 text-white not-italic text-center leading-tight">
      {{ $lang.translate(translations, 'hero_title') }}
    </h1>
    <el-form :inline="true" class="hero-form">
      <el-form-item class="sm:hidden w-full">
        <el-select
          v-model="cascada"
          v-loading="!selectGroup"
          :placeholder="$lang.translate(translations, 'search_placeholder')"
          filterable
          collapse-tags
          multiple
          class="shadow-input w-full cascada"
          size="large">
          <el-option-group
            v-for="group in selectGroup"
            :key="group.label"
            :label="group.label">
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item class="hidden sm:inline-block">
        <el-select
          :disabled="categories === null"
          v-model="filters.category_id"
          :placeholder="$lang.translate(translations, 'categories').toUpperCase()"
          class="shadow-input"
          size="large">
          <template v-if="categories && categories.length > 0">
            <el-option
              v-for="category in categories"
              :key="category.id"
              :label="$lang.apiTranslate(category.translations, 'name')"
              :value="category.id">
            </el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item class="hidden sm:inline-block">
        <el-select
          :disabled="destinations === null"
          v-model="filters.destination_id"
          :placeholder="$lang.translate(translations, 'destinations').toUpperCase()"
          class="shadow-input"
          size="large">
          <template v-if="destinations && destinations.length > 0">
            <el-option
              v-for="item in destinations"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          size="large"
          type="white"
          class="shadow-input"
          @click="handleSearch()">
          <div class="flex flex-wrap items-center">
            <span class="hidden sm:block">
              {{ $lang.translate(translations, 'search').toUpperCase() }}
            </span>
            <img src="~/assets/images/search-icon.svg" height="18" class="sm:ml-4">
          </div>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      cascada: '',
      cascadaVisible: false,
      filters: {
        category_id: '',
        destination_id: ''
      },
      translations: {
        'es_ES': {
          hero_title: 'Descubre el Perú como un local',
          search: 'Buscar',
          search_placeholder: 'Buscar...',
          categories: 'Categorías',
          destinations: 'Destinos'
        },
        'en_EN': {
          hero_title: 'Experience it, live it',
          search: 'Search',
          search_placeholder: 'Search...',
          categories: 'Categories',
          destinations: 'Destinations',
        }
      }
    }
  },

  watch: {
    cascada(value) {
      this.filters.category_id = ''
      this.filters.destination_id = ''

      if(value.constructor === Array && value.length > 0) {
        value.forEach(item => {
          const splitted = item.split('_')
          if(splitted[0] === 'categories') {
            this.filters.category_id = parseInt(splitted[1])
          } else {
            this.filters.destination_id = parseInt(splitted[1])
          }
        })
      }
    }
  },

  computed: {
    ...mapGetters({
      destinations: 'destinations/destinations',
      categories: 'categories/categories'
    }),
    selectGroup() {
      if(!this.destinations || !this.categories) return null
      const groups = [
        {
          label: 'Categorías',
          options: []
        },
        {
          label: 'Destinos',
          options: []
        }
      ]

      this.categories.forEach(item => {
        if(this.filters.category_id === '' || this.filters.category_id === item.id) {
          groups[0].options.push({
            value: 'categories_' + item.id,
            label: item.translations[0].name
          })
        }
      })

      this.destinations.forEach(item => {
        if(this.filters.destination_id === '' || this.filters.destination_id === item.id) {
          groups[1].options.push({
            value: 'destinations_' + item.id,
            label: item.name
          })
        }
      })

      return groups
    }
  },

  methods: {
    handleSearch() {
      let query = {}

      if(this.filters.category_id !== '') query.category = this.filters.category_id
      if(this.filters.destination_id !== '') query.destination = this.filters.destination_id

      return this.$router.push({
        path: `/${this.$lang.current().slug}/experiences`,
        query
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .hidden {
    display: none!important;

    @media screen and (min-width: 640px) {
      display: inline-block!important;
    }
  }

  .sm\:hidden {
    @media (min-width: 640px) {
      display: none!important;
    }
  }
</style>

<style lang="scss">
  .hero {
    width: 100%;
    background-size: cover;
    background-position: center;
    padding-top: 6rem;
    padding-bottom: 5rem;

    @media screen and (min-width: 640px) {
      height: 450px;
      padding-top: 0;
      padding-bottom: 0;
    }

    @media screen and (min-width: 768px) {
      height: 640px;
    }
  }
  .hero-form {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 400px;

    @media screen and (max-width: 640px) {
      & > .el-form-item:first-child {
        flex: 2;
        margin-left: 10px;

        & > .el-form-item__content {
          width: 100%;
        }
      }

    }

    @media screen and (min-width: 640px) {
      width: auto;
      max-width: unset;
    }
  }
  .el-select--large {
    height: 54px;

    & > .el-input--suffix & > .el-input__inner {
      height: 54px;
    }
  }
</style>
