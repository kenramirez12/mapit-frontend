<template>
  <div
    v-if="experience"
    v-loading="isLoading"
    :class="{ 'reserve-form--sticky': sticky }"
    class="reserve-form bg-white px-5 py-2 md:py-5 md:shadow-xl"
  >
    <div
      class="reserve-form__price"
      @click="isExpanded = !isExpanded">
      <div class="flex items-center">
        <div>
          <span class="font-light">
            {{ priceLabel }}
          </span>
          <span class="block font-light text-xl lg:text-3xl leading-none">USD {{ reservePrice }}</span>
        </div>
        <div v-if="sticky" class="flex items-center ml-auto">
          <span class="text-sm">
            {{isExpanded ? $lang.translate(translations, 'show_less') : $lang.translate(translations, 'see_more') }}
          </span>
          <el-button
            :icon="`el-icon-${isExpanded ? 'minus' : 'plus'}`"
            type="primary"
            size="small"
            circle
            class="shadow ml-4" />
        </div>
      </div>
    </div>
    <el-form
      v-show="!sticky || isExpanded"
      ref="reserveForm"
      :key="'reserve_' + this.$lang.current().slug"
      :class="{ 'mt-2 md:mt-6' : sticky }"
      class="reserve-form">
      <div v-if="isOnline" class="w-1/2 pr-2">
        <el-form-item prop="date" class="w-full mb-3">
          <el-date-picker
            ref="reserveDate"
            v-model="reserveDate"
            value-format="yyyy-MM-dd"
            :picker-options="datesOption"
            class="border-0 input-shadow"
            type="date"
            :placeholder="$lang.translate(translations, 'date')"
          >
          </el-date-picker>
        </el-form-item>
      </div>
      <div
        :class="{
          'w-full' : !isOnline,
          'w-1/2 pl-2' : isOnline
        }">
        <el-form-item prop="quota" class="w-full mb-3">
          <el-select
            v-model="groupSize"
            ref="reserveGroupSize"
            class="w-full border-0 input-shadow"
            :placeholder="$lang.translate(translations, isOnline ? 'devices' : 'persons')"
          >
            <el-option
              v-for="item in groupOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="w-full mt-2">
        <el-button
          v-if="!isOnline"
          class="w-full submit-btn text-sm font-normal"
          type="primary"
            @click="$router.push({
              path: `/${$lang.current().slug}/contact`,
              query: {
                type: 'reserve',
                experience: $lang.apiTranslate(experience.translations, 'title'),
                group_size: groupSize
              }
            })"
        >
          {{ $lang.translate(translations, 'book_now_pay_later') }}
        </el-button>
        <el-button
          v-else
          class="w-full submit-btn text-sm font-normal"
          type="primary"
            @click="formSubmit('reserveForm')"
        >
          {{ $lang.translate(translations, 'book') }}
        </el-button>
      </div>
    </el-form>
    <div
      v-if="!sticky"
      class="w-full mt-6 pt-4 border-t border-black flex items-center justify-between"
    >
      <small class="font-light">
        {{ $lang.translate(translations, 'reserve_copy') }}
      </small>
      <el-button
        type="primary"
        size="small"
        plain
        class="py-2 ml-5 text-dark"
        @click="$router.push({
          path: `/${$lang.current().slug}/contact`,
          query: {
            type: 'inquire',
            experience: $lang.apiTranslate(experience.translations, 'title')
          }
        })"
      >
        {{ $lang.translate(translations, 'inquiry') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  props: {
    sticky: {
      type: Boolean,
      required: false,
      default: () => false
    },
    show: {
      type: Boolean,
      required: false,
      default: () => false
    },
    experience: {
      type: Object,
      required: false,
      default: () => null
    }
  },
  data() {
    return {
      onlineCategoryId: process.env.onlineId,
      isLoading: false,
      isExpanded: false,
      datesOption: {
        disabledDate: (time) => this.shouldDisableDate(time)
      },
      translations: {
        'es_ES': {
          from: 'Desde',
          per_person: 'Por persona',
          per_device: 'Por dispositivo',
          date: 'Fecha',
          persons: 'Personas',
          devices: 'Dispositivos',
          book: 'Reservar',
          book_now_pay_later: 'Reserva ahora / Paga después',
          reserve_copy: 'Personaliza tu experiencia: día, hora, tamaño de grupo, preferencias, y más.',
          inquiry: 'Consulta',
          missing_date: 'Seleccione una fecha',
          missing_group_size: 'Seleccione la cantidad de personas',
          not_enough_places: 'No hay cupos suficientes para la fecha seleccionada',
          validation_error: 'No pudimos completar el proceso, por favor inténtelo nuevamente',
          see_more: 'VER MÁS',
          show_less: 'MENOS'
        },
        'en_EN': {
          from: 'From',
          per_person: 'Per person',
          per_device: 'Per device',
          date: 'Date',
          persons: 'Group Size',
          devices: 'Devices',
          book: 'Book',
          book_now_pay_later: 'Book Now / Pay Later',
          reserve_copy: 'Customize your experience: day, time, group size, preferences, and more.',
          inquiry: 'Inquire',
          missing_date: 'Choose a date',
          missing_group_size: 'Choose a group size',
          not_enough_places: 'There are no available places for this day',
          validation_error: 'The process could not be completed. Please try again.',
          see_more: 'SEE MORE',
          show_less: 'SHOW LESS'
        }
      }
    };
  },
  computed: {
    ...mapGetters({
      availableHours: 'reserves/availableHours',
      hasAvailableHours: 'reserves/hasAvailableHours',
      reservePrice: 'reserves/reservePrice',
      availableDays: 'reserves/availableDays',
      holidaysArray: 'reserves/holidaysArray',
      authDialogVisible: 'authDialogVisible',
      willCheckout: 'reserves/willCheckout'
    }),
    loggedIn () {
      return this.$auth.loggedIn
    },
    priceLabel () {
      if(this.experience.price_type === 1 || this.groupSize != '') {
        return this.$lang.translate(this.translations, this.isOnline ? 'per_device' : 'per_person')
      }

      return this.$lang.translate(this.translations, 'from')
    },
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
    groupOptions () {
      if (!this.experience) return []

      const translations = {}

      if(this.isOnline) {
        translations.single = this.$lang.current().slug === 'es' ? 'dispositivo' : 'device',
        translations.multiple = this.$lang.current().slug === 'es' ? 'dispositivos' : 'devices'
      } else {
        translations.single = this.$lang.current().slug === 'es' ? 'persona' : 'person',
        translations.multiple = this.$lang.current().slug === 'es' ? 'personas' : 'people'
      }

      const groups = []
      for (
        let i = this.experience.min_quota;
        i <= this.experience.max_quota;
        i++
      ) {
        groups.push({
          label: `${i} ${i === 1 ? translations.single : translations.multiple}`,
          value: i
        })
      }

      return groups
    }
  },
  watch: {
    loggedIn (value) {
      if(value && this.willCheckout) {
        this.$router.push(`/${this.$lang.current().slug}/checkout`)
      }
    },
    authDialogVisible (value) {
      if(!value) {
        this.isLoading = false
        if(this.willCheckout) this.updateWillCheckout(false)
      }
    }
  },
  methods: {
    ...mapActions({
      getAvailableHours: 'reserves/getAvailableHours'
    }),
    ...mapMutations({
      setAuthDialogVisible: 'SET_AUTH_DIALOG_VISIBLE',
      setReserveField: 'reserves/SET_RESERVE_FIELD',
      updateWillCheckout: 'reserves/UPDATE_WILL_CHECKOUT'
    }),
    shouldDisableDate(time) {
      let since = new Date()
      since.setDate(since.getDate() + 2)
      if(time < since) return true
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
    validateForm() {
      if(this.reserveDate === '') {
        this.$message.warning(this.$lang.translate(this.translations, 'missing_date'))
        this.$refs.reserveDate.focus()
        return false
      }

      if(this.groupSize === '') {
        this.$message.warning(this.$lang.translate(this.translations, 'missing_group_size'))
        this.$refs.reserveGroupSize.focus()
        return false
      }

      return true
    },
    storageCheckoutData() {
      if(process.client) {
        const availableHours = JSON.stringify(this.$store.state.reserves.availableHours)
        const checkoutStep = JSON.stringify(this.$store.state.reserves.checkoutStep)
        const reserveExperience = JSON.stringify(this.$store.state.reserves.experience)
        const reserveForm = JSON.stringify(this.$store.state.reserves.form)

        localStorage.setItem('availableHours', availableHours)
        localStorage.setItem('checkoutStep', checkoutStep)
        localStorage.setItem('reserveExperience', reserveExperience)
        localStorage.setItem('reserveForm', reserveForm)
      }
    },
    async formSubmit (formName) {
      if(this.validateForm()) {
        this.isLoading = true

        try {
          const resp = await this.getAvailableHours()
          this.$log.debug(resp.response)

          if(this.hasAvailableHours === true) {
            this.storageCheckoutData()
            if(this.$auth.loggedIn) {
              this.isLoading = false
              return this.$router.push(`/${this.$lang.current().slug}/checkout`)
            } else {
              this.updateWillCheckout(true)
              this.setAuthDialogVisible(true)
            }
          } else {
            this.isLoading = false
            return this.$message.error(this.$lang.translate(this.translations, 'not_enough_places'))
          }
        } catch (error) {
          this.$log.error('getAvailableHours', error, error.response)
          this.isLoading = false
          return this.$message.error(this.$lang.translate(this.translations, 'validation_error'))
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  padding-top: 1.25rem;
}

.reserve-form {
  width: 100%;
  // max-width: 20rem;
  // max-width: 20rem;
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;

  @media screen and (min-width: 768px) {
    max-width: 23.5rem;
  }

  &--sticky {
    width: 460px;
    margin: auto;
    max-width: 100%;

    @media screen and (min-width: 768px) {
      width: 380px;
    }

    .el-form {
      padding-top: 0;
    }

    .reserve-form__price {
      width: 100%;
      cursor: pointer;
      margin-bottom: 0;
    }

    .reserve-form__inline {
      display: flex;
    }

    .reserve-form__vertical {
      display: none;
    }
  }

  &__price {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.2rem;
    user-select: none;
  }
}
</style>
