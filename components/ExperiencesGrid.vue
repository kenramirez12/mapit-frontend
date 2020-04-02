<template>
  <div class="flex flex-wrap .-m-2">
    <template v-if="isLoading">
      <div
        v-for="n in cols"
        :key="n"
        :class="{
          'w-1/3 px-2' : cols === 3,
          'w-1/4' : cols === 4
        }">
        <ExperienceCard :loading="true" />
      </div>
    </template>
    <template v-else>
      <div
        v-for="experience in experiences"
        :key="experience.id"
        :class="{
          'w-1/3 px-2' : cols === 3,
          'w-1/4' : cols === 4
        }">
        <ExperienceCard :experience="experience" class="mb-6" />
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ExperienceCard from '@/components/ExperienceCard'

export default {
  components: {
    ExperienceCard
  },

  props: {
    cols: {
      type: Number,
      required: true
    },
    experiences: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true,
      default: () => false
    }
  }
}
</script>
