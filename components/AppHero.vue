<template>
  <div class="hero super-center flex-col" :style="{ backgroundImage: `url(${backgroundUrl})` }">
    <h1 class="text-6xl font-light pb-4 mb-6 text-white not-italic">{{ $lang.translate(translations, 'hero_title') }}</h1>

    <el-form :inline="true">
      <el-form-item >
        <el-select
          :disabled="categories === null"
          v-model="filters.category_id"
          :placeholder="$lang.translate(translations, 'experiences').toUpperCase()"
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
      <el-form-item v-if="destinations">
        <el-select
          v-model="filters.destination_id"
          :placeholder="$lang.translate(translations, 'destinations').toUpperCase()"
          size="large">
          <el-option
            v-for="item in destinations"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="large" type="white">
          <span class="flex items-center font-normal">
            {{ $lang.translate(translations, 'search').toUpperCase() }}
            <img src="~/assets/images/search-icon.svg" height="18" class="ml-4">
          </span>
        </el-button>
      </el-form-item>
    </el-form>


  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import backgroundUrl from '~/assets/images/main-hero.jpg'

export default {
  props: {
    translations: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      backgroundUrl,
      filters: {
        category_id: '',
        destination_id: ''
      }
    }
  },

  computed: {
    ...mapGetters({
      destinations: 'destinations/destinations',
      categories: 'categories/categories'
    })
  }
}
</script>

<style style="scss">
  .hero {
    width: 100%;
    height: 640px;
    background-size: cover;
    background-position: center;
  }
</style>