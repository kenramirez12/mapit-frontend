<template>
  <div>
    <div class="flex flex-wrap pt-16 mb-12">
      <div class="w-4/12">
        <h2 class="text-5xl font-light">
          {{ $lang.translate(translations, 'title') }}
        </h2>
      </div>
      <div class="w-7/12 ml-auto">
        <div class="flex flex-wrap">
          <div class="w-11/12 flex flex-wrap">
            <div class="flex-1">
              <h5 class="text-2xl font-light">Daniela</h5>
              <span class="font-light text-sm">
                {{ $lang.translate(translations, 'cofounder') }}
              </span>
              <div class="block mt-4">
                <el-button size="small" type="primary" icon="el-icon-bottom" circle />
              </div>
            </div>
            <div class="flex-1">
              <h5 class="text-2xl font-light">Ursula</h5>
              <span class="font-light text-sm">
                {{ $lang.translate(translations, 'cofounder') }}
              </span>
              <div class="block mt-4">
                <el-button size="small" type="primary" icon="el-icon-bottom" circle />
              </div>
            </div>
            <div class="flex-1">
              <h5 class="text-2xl font-light">Mirella</h5>
              <span class="font-light text-sm">
                {{ $lang.translate(translations, 'cofounder') }}
              </span>
              <div class="block mt-4">
                <el-button size="small" type="primary" icon="el-icon-bottom" circle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap pb-12">
      <div class="w-4/12 pr-10">
        <p class="mb-6 font-light">{{ $lang.translate(translations, 'copy_1') }}</p>
        <p class="mb-6 font-light">{{ $lang.translate(translations, 'copy_2') }}</p>
      </div>
      <div class="w-7/12 ml-auto">
        <img src="/images/about/team.jpg" class="w-full" alt="Equipo Map it!">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      translations: {
        es_ES: {
          title: 'Nuestro Equipo',
          copy_1: 'MAP IT fue fundado en el año 2019 por Ursula, Daniela y Mirella; emprendedoras peruanas unidas por un mismo propósito: cambiar el turismo tradicional por uno de impacto, y enseñarle al mundo que viajar y mejorar vidas van de la mano.',
          copy_2: 'Queremos preservar la cultura de nuestro país, y crear un real intercambio cultural, a la misma vez que ofrecemos un turismo responsable que ayuda a mejorar la calidad de vida de nuestra gente. Creemos que el turismo puede ser una herramienta de cambio para el Perú, y día a día estamos luchando por ello.',
          cofounder: 'Co-Fundadora'
        },
        en_EN: {
          title: 'Our Team',
          copy_1: 'MAP IT was founded in 2019 by Ursula, Daniela, and Mirella; Peruvian entrepreneurs who came together for one purpose: To turn traditional tourism into a sustainable one and to show the world that traveling and improving lives go hand in hand.',
          copy_2: 'We want to preserve our country\'s culture and promote an authentic cultural exchange while offering a responsible tourism that helps to create opportunities for local people. We believe tourism can be a tool of change and we will work every day to achieve it.',
          cofounder: 'Co-Founder'
        }
      }
    }
  }
}
</script>

<style>

</style>