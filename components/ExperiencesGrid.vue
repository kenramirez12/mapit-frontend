<template>
  <div class="flex flex-wrap">
    <div
      v-for="n in experiences"
      :key="n"
      :class="{
        'w-1/3' : cols === 3,
        'w-1/4' : cols === 4
      }"
      class="pr-4 mb-6">
      <ExperienceCard />
    </div>
  </div>
</template>

<script>
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
      type: Number,
      required: true
    }
  }
}
</script>

<style>

</style>