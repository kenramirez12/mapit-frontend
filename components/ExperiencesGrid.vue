<template>
  <div class="flex flex-wrap .-m-2">
    <template v-if="isLoading">
      <div
        v-for="n in cols*3"
        :key="n"
        :class="{
          'lg:w-1/3 px-2' : cols === 3,
          'lg:w-1/4' : cols === 4
        }"
        class="w-full sm:w-1/2 mb-6"
      >
        <ExperienceCard :loading="true" />
      </div>
    </template>
    <template v-else-if="experiences.length > 0">
      <div
        v-for="experience in experiences"
        :key="experience.id"
        :class="{
          'lg:w-1/3 px-2' : cols === 3,
          'lg:w-1/4' : cols === 4
        }"
        class="w-full sm:w-1/2 mb-6"
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
