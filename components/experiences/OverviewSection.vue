<template>
  <div id="overview-section" class="container mx-auto px-4 pt-6 pb-super">
    <div class="overview py-6">
      <div class="flex flex-wrap my-10 py-10">
        <div class="w-5/12 pr-6">
          <p class="dark-gray text-4xl ">Aprenderás las técnicas andinas utilizadas en la comunidad Chichubamba, realizando 3 diferentes talleres divertidos y culturales.</p>
          <p class="my-6 py-6 font-light text-2xl">Wiser: Comunidad de Chichumba</p>
          <ul class="checkbox-list">
            <li class="checkbox-list__item mb-4 text-base">
              <img src="~/assets/images/checkbox-icon.svg" class="checkbox-list__icon">
              Auténtica experiencia cultural en la cual podrás aprender sobre las verdaderas tradiciones Incas.
            </li>
            <li class="checkbox-list__item mb-4 text-base">
              <img src="~/assets/images/checkbox-icon.svg" class="checkbox-list__icon">
              Los expertos locales de cada taller cuentan con más de 15 años de experiencia en lo que hacen. 
            </li>
            <li class="checkbox-list__item mb-4 text-base">
              <img src="~/assets/images/checkbox-icon.svg" class="checkbox-list__icon">
              Los expertos locales de cada taller cuentan con más de 15 años de experiencia en lo que hacen.</li>
          </ul>
        </div>
        <div class="w-6/12 ml-auto">
          <div class="">
            <div class="flex items-center mb-3">
              <img src="~/assets/images/include-icon.svg" style="height:64px" class="ml-0 ">
              <span class="dark-gray text-2xl font-light ml-8">Qué incluye</span>
              
            </div>
            <p class="dark-gray mb-5 ml-24 text-base leading-6">Transporte privado ida y vuelta, traductor en inglés (opcional), materiales para las actividades, la cerámica que pintes, y degustación del chocolate caliente preparado y chicha de jora.</p>
          </div>
          <div>
          <img src="~/assets/images/overview-img.jpg" class="overview-img shadow-xl mt-16" alt="">
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
.overview-img {
  box-shadow: 0px 0px 100px rgba(0, 0, 0, 0.33);
}

.dark-gray{
   color: #484848;
}
</style>