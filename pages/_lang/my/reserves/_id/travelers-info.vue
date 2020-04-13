<template>
  <div
    v-if="reserve"
    v-loading="isLoading"
    class="container relative pb-4 mx-auto">
    <el-breadcrumb class="mt-6 p-4 bg-gray-100" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: `/${$lang.current().slug}/my/reserves` }">Historial de reservas</el-breadcrumb-item>
      <el-breadcrumb-item>
        {{ $lang.apiTranslate(reserve.experience.translations, 'title') }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="traveler-info__header">
      <div class="w-6/12 pr-16">
        <h1 class="text-3xl">Hola {{ travelerName }},</h1>
        <p class="font-light text-sm">Necesitamos los datos de tus acompañantes <template v-if="!reserve.traveler_arrival_date">y tu fecha de llegada al país</template> para finalizar la solicitud de compra.</p>
      </div>
      <div class="w-4/12 ml-2 mr-auto">
        <div
          :class="{ 'has-value' : arrivalForm.arrivalRules !== '' }"
          class="input-underline mt-8 mb-2"
          style="width:220px!important"
          data-placeholder="Fecha de llegada al país">
          <el-form ref="arrivalForm" :model="arrivalForm" :rules="arrivalRules">
            <el-form-item prop="arrivalDate">
              <el-date-picker
                v-model="arrivalForm.arrivalDate"
                :clearable="false"
                :picker-options="arrivalOptions"
                class="input-underline"
                type="date">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap -mx-2 pt-6 mt-6">
      <AdditionalTravelerForm
        v-for="n in 3"
        :ref="`additional_traveler_${n}`"
        :key="'traveler_' + n"
        :number="n"
        :attempts.sync="attempts"
        :default-country="reserve.details.traveler_country"
        @handle-validation="additionalTravelerValidation"
        :class="{
          'mx-auto' : n % 2 === 0,
          'mx-2' : n % 2 !== 0
        }"
        class="w-4/12 mb-6 pb-6" />
    </div>
    <div class="block mb-8">
      <el-button type="primary" @click="handleSubmit()">Continuar</el-button>
    </div>
  </div>
</template>

<script>
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
    AdditionalTravelerForm
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
      arrivalForm: {
        arrivalDate: ''
      },
      arrivalRules: {
        arrivalDate: [
          { required: true, type: 'date', message: 'Este campo es requerido', trigger: 'change' }
        ]
      },
      attempts: 1,
      isValid: [],
      arrivalOptions: {
        disabledDate: (time) => {
          return time < new Date()
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
            this.$message.error('Tienes que llenar todos los campos.')
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
      this.$refs.arrivalForm.validate()
      return this.attempts += 1
    },
    additionalTravelerValidation(value) {
      this.isValid.push(value ? 1: 0)
    },
    trySubmit() {
      this.$refs.arrivalForm.validate(valid => {
        if(!valid) {
          return this.$message.error('Selecciona la fecha de llegada al país.')
        } else {
          this.updateReserveDetails()
        }
      })
    },
    async updateReserveDetails() {
      const data = {
        traveler_arrival_date: this.arrivalForm.arrivalDate,
        additional_travelers: []
      }

      for(let i = 1; i < this.reserve.group_size; i++) {
        data.additional_travelers.push(this.$refs[`additional_traveler_${i}`][0].travelerData)
      }

      this.isLoading = true
      try {
        const resp = await this.$axios.$put('/reserve-details/' + this.reserve.details.id, data)
        this.isLoading = false
        this.$message.success('¡Listo! Hemos confirmado tu reserva')
        this.$router.push(`/${this.$lang.current().slug}/my/reserves/${this.reserve.code}`)
      } catch (error) {
        this.isLoading = false
        this.$message.error('No pudimos enviar la información, por favor inténtelo nuevamente')
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
