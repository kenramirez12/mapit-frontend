<template>
  <div class="flex flex-wrap .-m-2">
    <template v-if="!experiences">
      <div
        v-for="n in 3*3"
        :key="n"
        class="experience-grid__item px-2 mb-6"
      >
        <ExperienceCard :loading="true" />
      </div>
    </template>
    <template v-else-if="experiences.length > 0">
      <div
        v-for="experience in experiences"
        :key="experience.id"
        class="experience-grid__item px-2 mb-6"
      >
        <ExperienceCard :experience="experience" />
      </div>
    </template>
    <el-alert
      v-else
      class="pt-4 pb-6"
      type="error"
      :closable="false">
      <h4 class="text-3xl text-black">{{ translations[$lang.current().iso_lang].noResultsTitle }}</h4>
      <p class="text-base font-light text-black">{{ translations[$lang.current().iso_lang].noResultsCopy }}</p>
    </el-alert>
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
    experiences: {
      type: Array,
      required: false
    }
  },

  data() {
    return {
      translations: {
        es_ES: {
          noResultsTitle: '¡Whoops!',
          noResultsCopy: 'No encontramos lo que buscas'
        },
        en_EN: {
          noResultsTitle: '¡Whoops!',
          noResultsCopy: 'We couldn’t find what you’re searching for'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .experience-grid {
    &__item {
      width: 100%;

      @media screen and (min-width: 610px) {
        width: 50%;
      }

      @media screen and (min-width: 1270px) {
        width: 33.333%;
      }
    }
  }
</style>
