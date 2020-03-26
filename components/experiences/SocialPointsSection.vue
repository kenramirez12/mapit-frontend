<template>
  <div id="social-points-section" class="experience-container py-6 pb-super">
    <div class="container mx-auto px-4">
      <div class="activities py-6 position-relative">
        <h3 class="text-5xl font-light mb-6 pb-6">Puntos Sociales</h3>
        <div class="flex flex-wrap">
          <div class="w-5/12 pr-6 pb-6">
            <p class="mb-6">{{ translations.social_impact }}</p>
          </div>
        </div>
        <div class="flex flex-wrap mt-6" style="position:relative">
          <img src="~/assets/images/sitting-05.svg" style="position:absolute;top:0;left:-8rem;height:20rem">
          <div class="w-3/12 pr-6" style="margin-left:9rem">
            <img src="~/assets/images/brujula-icon.svg" class="mb-4" style="width:60px" alt="">
            <p class="mb-6">Al reservar  con nosotros, estás acumulando puntos sociales:</p>
            <p class="text-2xl">1USD = 1 Punto Social</p>
          </div>

          <div class="w-4/12 ml-auto pr-6">
            <p>Con tu aporte, podemos llevar a cabo proyectos sociales en comunidades a lo largo del país:  Capacitaciones, mejora de infraestructuras, reforestación, programas de educación, y muchos más. Ayúdanos a hacerlos realidad, ¡sumáte a la causa!</p>
            <div class="flex justify-between mt-6 pt-6 pr-6">
              <img src="~/assets/images/social-three-icon.svg" alt="" style="width:80px">
              <img src="~/assets/images/social-book-icon.svg" alt="" style="width:80px">
              <img src="~/assets/images/social-house-icon.svg" alt="" style="width:80px">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    experience: {
      type: Object,
      required: true
    }
  },
  computed: {
    translations () {
      const translations = this.experience.translations.find(item => {
        return item.iso_lang === this.$store.getters.currentLang.iso_lang
      })
  
      return translations
    }
  }
}
</script>

<style>

</style>