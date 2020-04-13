<template>
  <div v-if="experience" class="reserve-details p-6">
    <h3 class="text-xl mt-3 mb-6 pr-4 pb-4">
      {{ $lang.apiTranslate(experience.translations, 'title') }}
    </h3>
    <div class="flex font-light">
      <div class="w-2/3">Cantidad de viajeros</div>
      <div class="w-1/3 text-right">{{ groupSize }}</div>
    </div>
    <div class="flex font-light">
      <div class="w-2/3">Fecha</div>
      <div class="w-1/3 text-right">{{ reserveDate }}</div>
    </div>
    <hr class="my-3">
    <div class="flex font-light">
      <div class="w-2/3">Precio por persona</div>
      <div class="w-1/3 text-right">${{ reservePrice }}</div>
    </div>

    <template v-if="experience.extras && experience.extras.length > 0">
      <div
        v-for="extra in experience.extras"
        :key="extra.id"
      >
        <div
          v-if="reserveExtras.includes(extra.id)"
          class="flex font-light">
          <div class="w-2/3">{{ $lang.apiTranslate(extra.translations, 'title') }}</div>
          <div class="w-1/3 text-right">${{ extra.price }}</div>
        </div>
      </div>
    </template>

    <div class="flex font-light">
      <div class="w-2/3">Subtotal por persona</div>
      <div class="w-1/3 text-right">${{ pricePerPerson.toFixed(2) }}</div>
    </div>
    <div class="flex pb-3 font-light">
      <div class="w-2/3">IGV (18%)</div>
      <div class="w-1/3 text-right">$0.00</div>
    </div>
    <div class="flex pt-3 font-light">
      <div class="w-2/3">TOTAL POR PERSONA</div>
      <div class="w-1/3 text-right">${{ pricePerPerson.toFixed(2) }}</div>
    </div>
    <hr class="my-4">
    <div class="flex pt-3 mb-3 text-xl font-bold">
      <div class="w-2/3">TOTAL (x4)</div>
      <div class="w-1/3 text-right">${{ totalPrice.toFixed(2) }}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState({
      experience: s => s.reserves.experience
    }),
    ...mapGetters({
      reservePrice: 'reserves/reservePrice',
      pricePerPerson: 'reserves/pricePerPerson',
      totalPrice: 'reserves/totalPrice'
    }),
    groupSize() {
      return this.$store.state.reserves.form.groupSize
    },
    reserveDate() {
      return this.$store.state.reserves.form.date
    },
    reserveExtras() {
      return this.$store.state.reserves.form.extras
    }
  }
}
</script>

<style scoped>
  .reserve-details {
    box-shadow: 0px 8px 25px 2px rgba(0, 0, 0, 0.15);
  }
</style>
