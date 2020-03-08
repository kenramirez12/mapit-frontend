<template>
  <div id="additional-info-section" class="experience-container py-6 pb-super">
    <div class="container mx-auto px-4">
      <div class="activities py-6 position-relative">
        <h3 class="text-5xl font-light mb-6 pb-6">Información Adicional</h3>
        <div class="flex flex-wrap">
          <div class="w-5/12 pr-6">
            <div class="py-6">
              <img src="~/assets/images/map-marker-lg.svg" class="mb-3" alt="">
              <span class="text-gray-500">Punto de encuentro</span>
              <span class="block text-2xl text-gray-500">Recojo y regreso al hotel</span>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap">
          <div class="w-5/12">
            <ul class="checkbox-list my-6 py-6">
              <li v-for="n in 5" :key="n" class="checkbox-list__item mb-4 text-gray-500">
                <img src="~/assets/images/checkbox-icon.svg" class="checkbox-list__icon">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, ea, commodi iusto.
              </li>
            </ul>
            <img src="~/assets/images/danger-icon.svg" class="mb-3" alt="">
            <p>Las cancelaciones solo pueden ser realizadas máximo 24 horas después de haberse realizado el pago para poder ser reembolsadas en su totalidad (100%). Pasadas las 24 horas no habrá reembolso alguno. Todas las cancelaciones se deberán realizar a través del correo de la empresa (info@mapit.com.pe) o a través de los teléfonos indicados en la página web.</p>
          </div>

          <div class="w-5/12 ml-auto">
            <div class="flex items-center">
              <h3 class="text-3xl">Qué llevar</h3>
              <img src="~/assets/images/sitting-01.svg" class="ml-auto" alt="">
            </div>
            <ul class="pr-6">
              <li class="flex mb-3"><img src="~/assets/images/dark-arrow-sm.svg" class="mr-5"> Cámara</li>
              <li class="flex mb-3"><img src="~/assets/images/dark-arrow-sm.svg" class="mr-5"> Paraguas o poncho de lluvia (especialmente entre Noviembre y Abril)</li>
              <li class="flex mb-3"><img src="~/assets/images/dark-arrow-sm.svg" class="mr-5"> Capas de ropa, ya que la temperatura suele variar en el transcurso del día</li>
              <li class="flex mb-3"><img src="~/assets/images/dark-arrow-sm.svg" class="mr-5"> Snacks y agua</li>
              <li class="flex mb-3"><img src="~/assets/images/dark-arrow-sm.svg" class="mr-5"> Bloqueador solar, gorra, o lentes de sol </li>
              <li class="flex mb-3"><img src="~/assets/images/dark-arrow-sm.svg" class="mr-5"> Mochila pequeña para guardar las obras de arte</li>
              <li class="flex mb-3"><img src="~/assets/images/dark-arrow-sm.svg" class="mr-5"> Zapatos cómodos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>