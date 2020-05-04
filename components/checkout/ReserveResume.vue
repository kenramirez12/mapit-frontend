<template>
  <div v-if="experience" class="reserve-details p-6">
    <div class="flex justify-between items-start">
      <h3 class="text-lg lg:text-xl md:mt-3 mb-2 md:mb-4 lg:mb-6 pr-4">
        {{ $lang.apiTranslate(experience.translations, 'title') }}
      </h3>
      <el-button
        type="primary"
        size="mini"
        class="md:hidden"
        @click="showDetails = !showDetails"
        :icon="showDetails ? 'el-icon-plus' : 'el-icon-minus'"
        circle />
    </div>

    <div
      :class="{ show: showDetails }"
      class="pt-4 md:pt-0 reserve-details__collapse text-sm lg:text-base">
      <div class="flex font-light">
        <div class="w-2/3">
          {{ $lang.translate(translations, isOnline ? 'device_quantity' : 'group_size') }}
        </div>
        <div class="w-1/3 text-right">{{ groupSize }}</div>
      </div>
      <div class="flex font-light">
        <div class="w-1/2 md:w-2/3">
          {{ $lang.translate(translations, 'date') }}
        </div>
        <div class="w-1/2 md:w-1/3 text-right">{{ reserveDate }}</div>
      </div>
      <hr class="my-3">
      <div class="flex font-light">
        <div class="w-2/3">
          {{ $lang.translate(translations, isOnline ? 'per_device' : 'per_person') }}
        </div>
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
        <div class="w-2/3">
          {{ $lang.translate(translations, isOnline ? 'device_subtotal' : 'subtotal') }}
        </div>
        <div class="w-1/3 text-right">${{ subpricePerPerson.toFixed(2) }}</div>
      </div>
      <div class="flex pb-3 font-light">
        <div class="w-2/3">{{ $lang.translate(translations, 'igv') }} (18%)</div>
        <div class="w-1/3 text-right">${{ igv.toFixed(2) }}</div>
      </div>
      <div class="flex pt-3 font-light">
        <div class="w-2/3">
          {{ $lang.translate(translations, isOnline ? 'total_per_device' : 'total_per_person') }}
        </div>
        <div class="w-1/3 text-right">${{ pricePerPerson.toFixed(2) }}</div>
      </div>
    </div>

    <hr class="my-4">

    <div class="flex md:pt-3 lg:mb-3 md:text-lg lg:text-xl font-medium">
      <div class="w-2/3">
        {{ $lang.translate(translations, 'total') }} (x{{ groupSize }})
      </div>
      <div class="w-1/3 text-right">${{ totalPrice.toFixed(2) }}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      onlineCategoryId: process.env.onlineId,
      showDetails: false,
      translations: {
        'es_ES': {
          group_size: 'Cantidad de viajeros',
          date: 'Fecha',
          per_person: 'Precio por persona',
          subtotal: 'Subtotal por persona',
          igv: 'IGV',
          total_per_person: 'TOTAL POR PERSONA',
          total: 'TOTAL',
          device_quantity: 'Cantidad de dispositivos',
          per_device: 'Precio por dispositivo',
          device_subtotal: 'Subtotal por dispositivo',
          total_per_device: 'TOTAL POR DISPOSITIVO'
        },
        'en_EN': {
          group_size: 'Group size',
          date: 'Date',
          per_person: 'Price per person',
          subtotal: 'Subtotal per person',
          igv: 'VAT',
          total_per_person: 'TOTAL PER PERSON',
          total: 'TOTAL',
          device_quantity: 'Number of devices',
          per_device: 'Price per device',
          device_subtotal: 'Subtotal per device',
          total_per_device: 'TOTAL PER DEVICE'
        }
      }
    }
  },
  computed: {
    ...mapState({
      experience: s => s.reserves.experience
    }),
    ...mapGetters({
      reservePrice: 'reserves/reservePrice',
      subpricePerPerson: 'reserves/subpricePerPerson',
      pricePerPerson: 'reserves/pricePerPerson',
      totalPrice: 'reserves/totalPrice',
      igv: 'reserves/igv'
    }),
    isOnline () {
      if(!this.experience || this.experience.categories.length === 0) return false

      let isOnline = false
      this.experience.categories.forEach(item => {
        if(item.id === parseInt(this.onlineCategoryId)) {
          isOnline = true
        }
      })

      return isOnline
    },
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

<style lang="scss" scoped>
  .reserve-details {
    background-color: #fff;
    box-shadow: 0px 8px 25px 2px rgba(0, 0, 0, 0.15);
    font-size: 90%;

    @media screen and (min-width: 768px) {
      font-size: unset;
    }

    &__collapse {
      display: none;

      @media screen and (min-width: 768px) {
        display: block;
      }

      &.show {
        display: block;
      }
    }
  }
</style>
