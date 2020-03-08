<template>
  <div>
    <PageHeader title="Destinations" subtitle="Reserva experiencias auténticas y encuentra cosas para hacer en Cusco, Lima, Puno, Arequipa y más." />
    <div class="container py-6 px-4 my-6 mx-auto">
      <div class="flex flex-wrap">
        <div class="w-3/12 pr-6">
          <ul class="mr-6 text-sm pb-6 border-black border-b">
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

          <div class="mr-6 mt-6">
            <el-select
              v-model="filters.experience_id"
              placeholder="EXPERIENCES"
              size="large"
              class="w-full bg-white shadow-lg border-0">
              <el-option
                v-for="item in experiences"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="w-9/12">
          <ExperiencesGrid :cols="3" :experiences="9" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PageHeader from '@/components/PageHeader'
import ExperiencesGrid from '@/components/ExperiencesGrid'

export default {
  components: {
    PageHeader,
    ExperiencesGrid
  },

  data() {
    return {
      selectedDestination: null,
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

  computed: {
    ...mapState({
      experiences: s => s.experiences
    })
  }
}
</script>

<style>

</style>