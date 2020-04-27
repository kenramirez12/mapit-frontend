<template>
  <div v-if="experience" v-loading="isLoading" class="flex flex-col h-full pt-5">
    <div class="flex mb-6 pb-4">
      <div class="w-1/3">
        <span class="font-light">{{ $lang.translate(translations, 'date') }}</span>
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
            :placeholder="$lang.translate(translations, 'date')"
          />
        </div>
      </div>
      <div class="w-1/3">
        <span class="font-light">
          {{ $lang.translate(translations, 'points') }}
        </span>
        <div class="block">
          <span class="text-3xl font-light">{{ parseFloat(reservePrice) * groupSize }}</span>
        </div>
      </div>
      <div class="w-1/3">
        <span class="font-light">
          {{ $lang.translate(translations, isOnline ? 'device_quantity' : 'group_size') }}
        </span>
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

    <div v-if="experience.extras !== null && experience.extras.length > 0" class="block mb-6 pb-4">
      <span class="font-light">
        {{ $lang.translate(translations, 'starting_time') }}
        <el-tooltip v-if="isOnline" effect="dark" content="GMT -5" placement="right">
          <i class="el-icon-info ml-2" />
        </el-tooltip>
      </span>
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

    <div class="flex flex-wrap">

      <div class="w-1/3 pr-6">
        <el-checkbox-group
          v-if="experience && experience.extras !== null && experience.extras.length > 0"
          v-model="reserveExtras">
          <el-checkbox
            v-for="extra in experience.extras"
            :key="extra.id"
            :label="extra.id"
            class="checkout-lg w-full my-2">
            {{ $lang.apiTranslate(extra.translations, 'title') }} (+ {{ extra.price }})
          </el-checkbox>
        </el-checkbox-group>
        <div v-else class="block mb-6 pb-4">
          <span class="font-light">
            {{ $lang.translate(translations, 'starting_time') }}
            <el-tooltip v-if="isOnline" effect="dark" content="GMT -5" placement="right">
              <i class="el-icon-info ml-2" />
            </el-tooltip>
          </span>
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
      </div>
      <div class="w-1/2">
        <span class="block mb-2 font-light">
          {{ $lang.translate(translations, 'message') }}
        </span>
        <el-input
          v-model="message"
          type="textarea"
          :rows="3"
          :placeholder="$lang.translate(translations, 'message_placeholder')"
          class="shadow-input border-0" />
      </div>
    </div>

    <div class="w-5/6 mt-auto flex">
      <el-button @click="trySubmit()" type="primary" class="ml-auto">
        {{ $lang.translate(translations, 'continue') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      onlineCategoryId: process.env.onlineId,
      isLoading: false,
      datesOption: {
        disabledDate: (time) => this.shouldDisableDate(time)
      },
      translations: {
        'es_ES': {
          date: 'Fecha',
          points: 'Puntos acumulados',
          group_size: 'Cantidad de viajeros',
          device_quantity: 'Dispositivos',
          starting_time: 'Elige tu horario de inicio',
          message: 'Mensaje al wiser',
          message_placeholder: 'Avísale a tu wiser si tienes algún requerimiento especial',
          continue: 'Continuar',
          no_places: 'No hay cupos suficientes para la fecha seleccionada',
          time_required: 'Seleccione un horario para continuar',
          process_error: 'No pudimos completar el proceso, por favor inténtelo nuevamente'

        },
        'en_EN': {
          date: 'Date',
          points: 'Accumulated points',
          group_size: 'Group size',
          device_quantity: 'Devices',
          starting_time: 'Choose your starting time',
          message: 'Message to the wiser',
          message_placeholder: 'Let your wiser know if you have any special request',
          continue: 'Continue',
          no_places: 'There are no available places for this day',
          time_required: 'Please, choose your starting time to continue',
          process_error: 'No pudimos completar el proceso, por favor inténtelo nuevamente'
        }
      }
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
    },
    message: {
      get () {
        return this.$store.state.reserves.form.message
      },
      set (value) {
        this.setReserveField({ field: 'message', value })
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
  mounted() {
    if(!this.experience) {
      this.$router.push(`/${this.$lang.current().slug}/experiences`)
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
        return this.$message.error(this.$lang.translate(this.translations, 'no_places'))
      }
      if(this.reserveTime === '') {
        return this.$message.warning(this.$lang.translate(this.translations, 'time_required'))
      }
      this.setCheckoutStep(2)
    },
    async retrieveAvailableHours() {
      this.isLoading = true
      try {
        const resp = await this.getAvailableHours()        
        this.isLoading = false

        if(!resp) {
          return this.$message.error(this.$lang.translate(this.translations, 'process_error'))
        }

        if(!this.hasAvailableHours) {
          return this.$message.error(this.$lang.translate(this.translations, 'no_places'))
        }
      } catch (error) {
        console.error(error)
        this.isLoading = false
        return this.$message.error(this.$lang.translate(this.translations, 'process_error'))
      }
    }
  }
}
</script>

<style>

</style>