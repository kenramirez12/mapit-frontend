<template>
  <div
    v-if="reserve"
    v-loading="isLoading">
    <ReserveHeader :experience="reserve.experience" />
    <div class="container relative pb-4 px-4 mx-auto">
      <div class="traveler-info__header">
        <div class="w-full md:pr-16">
          <h1 class="text-2xl md:text-3xl">{{ $lang.translate(translations, 'hello') }} {{ travelerName }},</h1>
          <p class="font-light text-sm">
            {{ $lang.translate(translations, 'info_required') }}
          </p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-2 md:pt-6 mt-6">
        <AdditionalTravelerForm
          v-for="n in (reserve.group_size - 1)"
          :ref="`additional_traveler_${n}`"
          :key="'traveler_' + n"
          :number="n"
          :attempts.sync="attempts"
          :default-country="reserve.details.traveler_country"
          @handle-validation="additionalTravelerValidation"
          :class="{
            'xl:mx-auto' : n % 2 === 0,
            'xl:mx-2' : n % 2 !== 0
          }"
          class="md:w-1/2 xl:w-5/12 mb-6 px-2 xl:px-0 md:pr-8 xl:pr-0 pb-6" />
      </div>
      <div class="block mb-8">
        <el-button type="primary" @click="handleSubmit()">
          {{ $lang.translate(translations, 'continue') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import ReserveHeader from '@/components/reserves/ReserveHeader'
import AdditionalTravelerForm from '~/components/reserves/AdditionalTravelerForm'

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
  components: {
    AdditionalTravelerForm,
    ReserveHeader
  },
  computed: {
    travelerName() {
      if(!this.reserve) return ''
      return this.reserve.details.traveler_fullname.split(' ')[0]
    }
  },
  data() {
    return {
      isLoading: false,
      attempts: 1,
      isValid: [],
      translations: {
        'es_ES': {
          booking_history: 'Historial de reservas',
          hello: 'Hola',
          info_required: 'Necesitamos los datos de tus acompañantes para finalizar la solicitud de compra.',
          all_fields_required: 'Tienes que llenar todos los campos.',
          continue: 'Continuar',
          reserve_confirmed: '¡Listo! Hemos confirmado tu reserva',
          reserve_error: 'No pudimos enviar la información, por favor inténtelo nuevamente'
        },
        'en_EN': {
          booking_history: 'Booking history',
          hello: 'Hi',
          info_required: 'We need your group\’s information to finish the booking process.',
          all_fields_required: 'All fields are required.',
          continue: 'Continue',
          reserve_confirmed: 'Your booking is now confirmed!',
          reserve_error: 'Your information could not be sent. Please try again.'
        }
      }
    }
  },
  watch: {
    isValid: {
      deep: true,
      handler(value) {
        if(!this.reserve) return null
        if(value.length === (this.reserve.group_size - 1)) {
          if(value.includes(0)) {
            this.$message.error(this.$lang.translate(this.translations, 'all_fields_required'))
          } else {
            this.trySubmit()
          }
        }
      }
    }
  },
  mounted() {
    if(!this.reserve || this.reserve.status === 0) {
      return this.$router.push(`/${this.$lang.current().slug}/my/reserves`)
    }

    if(this.reserve.status === 2) {
      return this.$router.push(`/${this.$lang.current().slug}/my/reserves/${this.reserve.code}`)
    }
  },
  methods: {
    handleSubmit() {
      this.isValid = []
      return this.attempts += 1
    },
    additionalTravelerValidation(value) {
      this.isValid.push(value ? 1: 0)
    },
    trySubmit() {
      this.updateReserveDetails()
    },
    async updateReserveDetails() {
      const data = {
        additional_travelers: []
      }

      for(let i = 1; i < this.reserve.group_size; i++) {
        data.additional_travelers.push(this.$refs[`additional_traveler_${i}`][0].travelerData)
      }

      this.isLoading = true
      try {
        const resp = await this.$axios.$put('/reserve-details/' + this.reserve.details.id, data)
        await this.$auth.fetchUser()
        this.isLoading = false
        this.$message.success(this.$lang.translate(this.translations, 'reserve_confirmed'))
        this.$router.push(`/${this.$lang.current().slug}/my/reserves/${this.reserve.code}`)
      } catch (error) {
        this.isLoading = false
        this.$message.error(this.$lang.translate(this.translations, 'reserve_error'))
        console.error(error)
        console.error(error.response)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .traveler-info {
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
      // position: sticky;
      // top: 0;
      z-index: 2;
      // box-shadow: 0 10px 10px rgba(255, 255, 255, 1);
      // border-bottom: 1px solid #e8e8e8;
    }
  }
</style>
