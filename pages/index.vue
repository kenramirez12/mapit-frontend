<template>
  <div>
    <AppHero />
    <main>
      <div class="container mx-auto py-6 px-4">
        <div class="w-full flex items-center mb-6">
          <div>
            <h3 class="text-4xl font-light">Experiences</h3>
            <p class="mb-0">Encuentra cosas para hacer en Perú, tours gastronómicos, clases de cocina peruana, talleres de arte.</p>
          </div>
          <div class="flex ml-auto">
            <el-button @click="expSliderPrev += 1" circle plain type="primary" icon="el-icon-back" class="flex"></el-button>
            <el-button @click="expSliderNext += 1" circle plain type="primary" icon="el-icon-right" class="flex"></el-button>
          </div>
        </div>
        <div class="w-100">
          <ExperiencesSlider :prev="expSliderPrev" :next="expSliderNext" />
        </div>
        <div class="w-full flex items-center mb-6">
          <div>
            <h3 class="text-4xl font-light">Destinations</h3>
            <p class="mb-0">Reserva experiencias auténticas y encuentra cosas para hacer en Cusco, Lima, Puno, Arequipa y más.</p>
          </div>
          <div class="flex ml-auto">
            <el-button @click="destSliderPrev += 1" circle plain type="primary" icon="el-icon-back" class="flex"></el-button>
            <el-button @click="destSliderNext += 1" circle plain type="primary" icon="el-icon-right" class="flex"></el-button>
          </div>
        </div>
        <div class="w-100">
          <DestinationsSlider :prev="destSliderPrev" :next="destSliderNext" />
        </div>
      </div>

      <WhySection />

      <TrustedBySlider />

      <div class="container mx-auto py-6 my-6 px-4">
        <div class="ml-auto py-6 my-6 w-3/4">
          <TestimonialsSlider />
        </div>
      </div>

      <StartExploreSection />
    </main>
  </div>
</template>

<script>
import AppHero from '~/components/AppHero'
import ExperiencesSlider from '~/components/ExperiencesSlider'
import DestinationsSlider from '~/components/DestinationsSlider'
import TestimonialsSlider from '~/components/TestimonialsSlider'
import StartExploreSection from '~/components/StartExploreSection'
import WhySection from '~/components/home/WhySection'
import TrustedBySlider from '~/components/TrustedBySlider'

export default {
  components: {
    AppHero,
    ExperiencesSlider,
    DestinationsSlider,
    TestimonialsSlider,
    StartExploreSection,
    WhySection,
    TrustedBySlider
  },

  data() {
    return {
      expSliderNext: 0,
      expSliderPrev: 0,
      destSliderNext: 0,
      destSliderPrev: 0
    }
  }
}
</script>

<style lang="scss">
  .testimonial-item {
    display: flex;

    &__content {
      padding-right: 4.5rem;
    }
  }
</style>
