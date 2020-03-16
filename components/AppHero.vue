<template>
  <div class="hero super-center flex-col" :style="{ backgroundImage: `url(${backgroundUrl})` }">
    <h1 class="text-6xl font-light pb-4 mb-6 text-white not-italic">Lorem ipsum dorem lorum</h1>

    <el-form :inline="true">
      <el-form-item >
        <el-select
          v-model="filters.experience_id"
          placeholder="EXPERIENCIAS"
          size="large">
          <el-option
            v-for="item in experiences"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="filters.destination_id"
          placeholder="DESTINOS"
          size="large">
          <el-option
            v-for="item in destinations"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="large" type="white">
          <span class="flex items-center font-normal">
            BUSCAR
            <img src="~/assets/images/search-icon.svg" height="18" class="ml-4">
          </span>
        </el-button>
      </el-form-item>
    </el-form>


  </div>
</template>

<script>
import { mapState } from 'vuex'
import backgroundUrl from '~/assets/images/main-hero.jpg'

export default {
  data () {
    return {
      backgroundUrl,
      filters: {
        experience_id: '',
        destination_id: ''
      }
    }
  },

  computed: {
    ...mapState({
      experiences: s => s.experiences,
      destinations: s => s.destinations
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