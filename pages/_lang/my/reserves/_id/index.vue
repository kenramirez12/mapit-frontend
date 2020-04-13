<template>
  <div v-if="reserve" class="container pb-10 px-4 mx-auto">
    <el-breadcrumb class="mt-6 mb-8 p-4 bg-gray-100" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: `/${$lang.current().slug}/my/reserves` }">Historial de reservas</el-breadcrumb-item>
      <el-breadcrumb-item>
        {{ $lang.apiTranslate(reserve.experience.translations, 'title') }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <pre>
      {{reserve}}
    </pre> -->
    <h1 class="mb-6 text-3xl reserves-container__title">
      Detalles de la reserva
    </h1>
    <div class="flex flex-wrap">
      <div class="w-3/5 pr-16">
        <div class="flex flex-wrap">
          <div class="w-1/2">
            <span class="block">Llegada</span>
            <span class="block font-light">15:00</span>
            <span class="block font-light">Lun. 26 ago.</span>
          </div>
          <div class="w-1/2">
            <span class="block">Salida</span>
            <span class="block font-light">15:00</span>
            <span class="block font-light">Lun. 26 ago.</span>
          </div>
        </div>
        <hr class="my-3">
        <div class="w-full">
          <p v-if="reserve.experience.host !== ''" class="mb-6">
            <span>Wiser: </span>
            <span class="font-light">
              {{ $lang.apiTranslate(reserve.experience.host.translations, 'fullname') }}
            </span>
          </p>
          <p v-if="reserve.group_size > 1">
            <span class="block">¿Quién te acompaña?</span>
            <span v-if="reserve.group_size === 2" class="font-light">
              1 viajero
            </span>
            <span v-else class="font-light">{{ reserve.group_size - 1 }} viajeros</span>
          </p>
        </div>
        <hr class="my-3">
        <div class="w-full">
          <p class="mb-6">
            <span class="block">Dirección</span>
            <span class="font-light">Cusco, Perú</span>
          </p>
          <p>
            <span class="block">¿Qué llevar?</span>
            <span class="font-light">Cámara, Capas de ropa, ya que la temperatura suele variar en el transcurso del día, Zapatos cómodos, Snacks y agua.</span>
          </p>
        </div>
        <hr class="my-3">
        <div class="w-full">
          <p class="mb-6">
            <span class="block">Código</span>
            <span class="font-light">{{ reserve.code }}</span>
          </p>
          <p>
            <span class="block">Costo total</span>
            <span>$140.00</span>
          </p>
        </div>
      </div>
      <div class="w-2/5">
        <span class="block">¿Necesitas una copia de los detalles de tu reservación?</span>
        <p class="font-light mb-8">
          En ocasiones, los nombres de los viajeros y la prueba de estadía son requisito para el trámite de una visa. Comprueba qué requisitos debes cumplir para obtener la visa para un país en específico.
        </p>
        <p>
          <span class="text-sm font-light">Guardar copia de los detalles de la reservación (PDF)</span><br>
          <el-button class="mt-3" type="primary" icon="el-icon-document-add">
            Imprimir información
          </el-button>
        </p>
      </div>
    </div>
    <!-- {{ reserve }} -->
  </div>
</template>

<script>
export default {
  async asyncData({ app, params, store, error }) {  
    try {
      const resp = await app.$axios.$get('/reserves/' + params.id)
      const reserve = resp.reserve

      return {
        reserve
      }
    } catch (error) {
      console.error('error', error.response)
    }
  },
  mounted() {
    if(this.reserve && this.reserve.status === 1) {
      return $router.push(`/${this.$lang.current().slug}/my/reserves/${this.reserve.code}/travelers-info`)
    }
  }
}
</script>

<style>

</style>