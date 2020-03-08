<template>
  <div>
    <CategoriesHeaderSlider />
    <div class="container py-6 px-4 my-6 mx-auto">
      <div class="flex flex-wrap">
        <div class="w-full">
          <ExperiencesGrid :cols="4" :experiences="12" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CategoriesHeaderSlider from '@/components/CategoriesHeaderSlider'
import ExperiencesGrid from '@/components/ExperiencesGrid'

export default {
  components: {
    CategoriesHeaderSlider,
    ExperiencesGrid
  },

  data() {
    return {
    }
  },

  computed: {
    ...mapState({
      experiences: s => s.experiences
    })
  }
}
</script>

<style>

</style>