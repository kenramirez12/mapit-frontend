<template>
  <div v-loading="isLoading" class="flex flex-col h-full pt-5">
    <div class="flex mb-6 pb-4">
      <div class="w-1/3">
        <span class="font-light">Fecha</span>
        <div class="block mt-1">
          <el-date-picker
            v-model="reserveDate"
            value-format="yyyy-MM-dd"
            :picker-options="datesOption"
            :clearable="false"
            class="border-0"
            style="border:1px solid var(--primary)"
            type="date"
            size="small"
            placeholder="Fecha"
          />
        </div>
      </div>
      <div class="w-1/3">
        <span class="font-light">Puntos acumulados</span>
        <div class="block">
          <span class="text-3xl font-light">{{ parseFloat(reservePrice) * groupSize }}</span>
        </div>
      </div>
      <div class="w-1/3">
        <span class="font-light">Cantidad de viajeros</span>
        <div class="flex items-center">
          <span class="text-3xl font-light mr-6">{{ groupSize > 9 ? groupSize : '0' + groupSize }}</span>
          <div>
            <el-button
              :disabled="groupSize === experience.min_quota"
              @click="groupSize -= 1"
              icon="el-icon-minus"
              circle
              size="mini"
              class="shadow" />
            <el-button
              :disabled="groupSize === experience.max_quota"
              @click="groupSize += 1"
              icon="el-icon-plus"
              circle
              size="mini"
              class="shadow" />
          </div>
        </div>
      </div>
    </div>

    <div class="block mb-6 pb-4">
      <span class="font-light">Elige tu horario de inicio</span>
      <div
        v-if="availableHours && availableHours.length > 0"
        class="block mt-2 -mx-1">
        <el-button
          v-for="(hour, n) in availableHours"
          :key="'hour_' + n"
          :disabled="hour.available_quota < groupSize"
          @click="reserveTime = hour.start_time"
          type="primary"
          size="small"
          :plain="reserveTime !== hour.start_time"
          class="mx-1">
          {{ hour.start_time }}
        </el-button>
      </div>
      <p v-else class="text-sm font-light mt-3">No se encontraron horarios disponibles.</p>
    </div>

    <div
      v-if="experience && experience.extras !== null && experience.extras.length > 0"
      class="flex">
      <div class="w-1/3">
        <el-checkbox-group v-model="reserveExtras">
          <el-checkbox
            v-for="extra in experience.extras"
            :key="extra.id"
            :label="extra.id"
            class="checkout-lg w-full my-2">
            {{ $lang.apiTranslate(extra.translations, 'title') }} (+ {{ extra.price }})
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>

    <div class="mt-auto">
      <el-button @click="trySubmit()" type="primary">Continuar</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      isLoading: false,
      datesOption: {
        disabledDate: (time) => this.shouldDisableDate(time)
      },
    }
  },
  computed: {
    ...mapState({
      experience: s => s.reserves.experience
    }),
    ...mapGetters({
      availableHours: 'reserves/availableHours',
      hasAvailableHours: 'reserves/hasAvailableHours',
      reservePrice: 'reserves/reservePrice',
      availableDays: 'reserves/availableDays',
      holidaysArray: 'reserves/holidaysArray'
    }),
    reserveDate: {
      get () {
        return this.$store.state.reserves.form.date
      },
      set (value) {
        this.setReserveField({ field: 'date', value })
      }
    },
    groupSize: {
      get () {
        return this.$store.state.reserves.form.groupSize
      },
      set (value) {
        this.setReserveField({ field: 'groupSize', value })
      }
    },
    reserveTime: {
      get () {
        return this.$store.state.reserves.form.time
      },
      set (value) {
        this.setReserveField({ field: 'time', value })
      }
    },
    reserveExtras: {
      get () {
        return this.$store.state.reserves.form.extras
      },
      set (value) {
        this.setReserveField({ field: 'extras', value })
      }
    }
  },
  watch: {
    reserveDate() {
      this.reserveTime = ''
      this.retrieveAvailableHours()
    },
    groupSize() {
      this.reserveTime = ''
      this.retrieveAvailableHours()
    }
  },
  methods: {
    ...mapMutations({
      setReserveField: 'reserves/SET_RESERVE_FIELD',
      setCheckoutStep: 'reserves/SET_CHECKOUT_STEP'
    }),
    ...mapActions({
      getAvailableHours: 'reserves/getAvailableHours'
    }),
    shouldDisableDate(time) {
      if(time < new Date()) return true
      if(!this.availableDays.includes(time.getDay())) return true

      if(this.holidaysArray) {
        const current = this.formatDate(time)
        return this.holidaysArray.includes(current)
      }

      return false
    },
    formatDate(date) {
      let currentDay = date.getDate()
      if(currentDay < 10) currentDay = '0' + currentDay

      let currentMonth = date.getMonth() + 1
      if(currentMonth < 10) currentMonth = '0' + currentMonth

      return `${date.getFullYear()}-${currentMonth}-${currentDay}`
    },
    trySubmit() {
      if(!this.hasAvailableHours) {
        return this.$message.error('No hay cupos suficientes para la fecha seleccionada')
      }
      if(this.reserveTime === '') {
        return this.$message.warning('Seleccione un horario para continuar')
      }
      this.setCheckoutStep(2)
    },
    async retrieveAvailableHours() {
      this.isLoading = true
      try {
        const resp = await this.getAvailableHours()        
        this.isLoading = false

        if(!resp) {
          return this.$message.error('No pudimos completar el proceso, por favor inténtelo nuevamente')
        }

        if(!this.hasAvailableHours) {
          return this.$message.error('No hay cupos suficientes para la fecha seleccionada')
        }
      } catch (error) {
        console.error(error)
        this.isLoading = false
        return this.$message.error('No pudimos completar el proceso, por favor inténtelo nuevamente')
      }
    }
  }
}
</script>

<style>

</style>