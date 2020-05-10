<template>
  <div
    v-loading="isLoading"
    :element-loading-text="loadingMessage"
    class="flex flex-col h-full px-6 md:px-4 md:px-0 pb-8 md:pb-4 md:pb-0 mt-8 md:mt-0">
    <span class="block mb-5 pb-3">
      {{ $lang.translate(translations, 'traveler') }}
    </span>
    <el-form :model="form" :rules="formRules" ref="clientDetailsForm">
      <div class="w-full md:pr-12 lg:w-2/3 lg:pr-0">
        <div class="flex flex-wrap -mx-4">
          <div class="w-full md:w-1/2 px-4">
            <div
              :class="{ 'has-value' : form.fullname !== '' }"
              class="input-underline"
              :data-placeholder="$lang.translate(translations, 'fullname')">
              <el-form-item prop="fullname" class="mb-0">
                <el-input type="text" v-model="form.fullname" />
              </el-form-item>
            </div>
          </div>
          <div class="w-full md:w-1/2 px-4">
            <div
              :class="{ 'has-value' : form.docNumber !== '' }"
              class="input-underline"
              :data-placeholder="$lang.translate(translations, 'doc_number')">
              <el-form-item prop="docNumber" class="mb-0">
                <el-input type="text" v-model="form.docNumber" />
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap -mx-4">
          <div class="w-full md:w-1/2 px-4">
            <div
              :class="{ 'has-value' : form.email !== '' }"
              class="input-underline"
              data-placeholder="E-mail">
              <el-form-item prop="email" class="mb-0">
                <input type="email" v-model="form.email">
              </el-form-item>
            </div>
          </div>
          <div class="w-full md:w-1/2 px-4">
            <div
              :class="{ 'has-value' : form.birthdate !== '' }"
              class="input-underline"
              :data-placeholder="$lang.translate(translations, 'birthdate')">
              <el-form-item prop="birthdate" class="mb-0">
                <input v-model="form.birthdate" maxlength="10">
              </el-form-item>
            </div>
          </div>
        </div>  
        <div class="flex flex-wrap -mx-4">
          <div class="w-full md:w-1/2 px-4">
            <div
              :class="{ 'has-value' : form.country !== '' }"
              class="input-underline"
              :data-placeholder="$lang.translate(translations, 'country')">
              <el-form-item prop="country" class="mb-0">
                <el-select
                  v-model="form.country"
                  filterable
                  placeholder=""
                  class="w-full">
                  <el-option
                    v-for="country in countries"
                    :key="country.code"
                    :label="country.name"
                    :value="country.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="w-full md:w-1/2 px-4">
            <div class="input-underline">
              <el-form-item prop="phone" class="custom-input-phone mb-0">
                <VuePhoneNumberInput
                  v-model="form.phone"
                  @update="setPhoneData"
                  :default-country-code="defaultCountryCode"
                  :translations="{
                    countrySelectorLabel: $lang.translate(translations, 'code'),
                    phoneNumberLabel: $lang.translate(translations, 'phone'),
                    example: $lang.translate(translations, 'example') + ': '
                  }"
                />
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap -mx-4">
          <div v-if="form.country !== 'PE'" class="w-full md:w-1/2 px-4">
            <div
              :class="{ 'has-value' : form.Date !== '' }"
              class="input-underline"
              :data-placeholder="$lang.translate(translations, 'arrival_date')"
              :data-helper="$lang.translate(translations, 'optional')">
              <el-date-picker
                v-model="form.Date"
                format="dd-MM-yyyy"
                value-format="yyyy-MM-dd"
                class="input-underline"
                type="date">
              </el-date-picker>
            </div>
          </div>
        </div>
        <div
          v-if="form.country !== 'PE'"
          class="my-4 py-2 px-3 self-start font-light"
          style="background:rgb(233, 255, 255);font-size:12px">
          {{ $lang.translate(translations, 'noArrivalDate') }}
        </div>
        <div class="block mt-4">
          <el-form-item prop="terms" class="mb-0">
            <el-checkbox v-model="form.terms" class="font-light flex items-center">
              <span style="white-space:normal">
                {{ $lang.translate(translations, 'terms') }} <a href="#" class="font-medium">{{ $lang.translate(translations, 'terms2') }}</a>
              </span>
            </el-checkbox>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div class="mt-auto pt-6">
      <el-button @click="handleSubmit('clientDetailsForm')" type="primary">
        {{ $lang.translate(translations, 'continue') }}
      </el-button>
    </div>
    <visanetForm
      v-if="sessionKey"
      :payment-id="paymentId"
      :session-token="sessionKey"
      :merchant-id="merchantId"
      :firstname="visanetFirstname"
      :lastname="visanetLastname"
      :purchase-number="reserveId"
      :amount="form.amount"
      :email="form.email" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import visanetForm from '~/components/checkout/visanetForm'

export default {
  components: { visanetForm },
  data() {
    const validateFullname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$lang.translate(this.translations, 'required_field')))
      } else {
        const splitted = value.split(' ')
        if(splitted.length <= 1 || splitted[splitted.length - 1].trim().length < 2) {
          callback(new Error(this.$lang.translate(this.translations, 'lastname_required')))
        } else {
          callback()
        }
      }
    }

    const validatePhone = (rule, value, callback) => {
      if(value === '' || this.phoneData === '') {
        callback(new Error(this.$lang.translate(this.translations, 'required_field')))
      } else if (this.phoneData.isValid === false) {
        callback(new Error(this.$lang.translate(this.translations, 'invalid_number')))
      } else {
        callback()
      }
    }

    const validateBirthdate = (rule, value, callback) => {
      if(value === '') {
        callback(new Error(this.$lang.translate(this.translations, 'required_field')))
      } else if(value.length < 10) {
        callback(new Error(this.$lang.translate(this.translations, 'invalid_date')))
      } else {
        const validateValue = value.split('/')
        const currentYear = new Date().getFullYear()

        if(parseInt(validateValue[0]) > 12) {
          callback(new Error(this.$lang.translate(this.translations, 'invalid_month')))
        } else if(parseInt(validateValue[1]) > 31) {
          callback(new Error(this.$lang.translate(this.translations, 'invalid_day')))
        } else if((currentYear - parseInt(validateValue[2])) < 18) {
          callback(new Error(this.$lang.translate(this.translations, 'invalid_year')))
        } else {
          callback()
        }
      }
    }

    return {
      validateFullname,
      validatePhone,
      validateBirthdate,
      isLoading: false,
      loadingMessage: '',
      translations: {
        'es_ES': {
          traveler: 'Viajero',
          noArrivalDate: 'En caso que aún no tengas la fecha, la puedes enviar después.',
          fullname: 'Nombre y Apellido',
          doc_number: 'Doc. de Identidad o Pasaporte',
          email: 'E-mail',
          birthdate: 'Fecha de nacimiento (mm/dd/aaaa)',
          country: 'País',
          code: 'Código',
          phone: 'Celular',
          arrival_date: 'Fecha de llegada al país',
          optional: 'Opcional',
          terms: 'Acepto los',
          terms2: 'términos y condiciones de privacidad y uso de datos',
          example: 'Ejemplo',
          continue: 'Continuar',
          required_field: 'Este campo es requerido',
          lastname_required: 'Ingrese su apellido',
          invalid_date: 'Ingrese una fecha válida',
          invalid_month: 'Ingrese un mes válido',
          invalid_day: 'Ingrese un día válido',
          invalid_year: 'Debes ser mayor de 18 años',
          invalid_email: 'Ingrese un e-mail válido',
          invalid_number: 'Ingrese un número válido',
          payment_window: 'Te re-direccionaremos al formulario de pago. Por favor, no cierre la ventana ni haga click en "Regresar"',
          reserve_failed: 'No pudimos procesar la reserva. Por favor inténtelo nuevamente.',
          wait: 'Espere unos segundos...'
        },
        'en_EN': {
          traveler: 'Traveler',
          noArrivalDate: 'In case you don\'t have the date yet, you can send it later',
          fullname: 'Full Name',
          doc_number: 'ID or Passport Number',
          email: 'E-mail',
          birthdate: 'Date of birth (mm/dd/yyyy)',
          country: 'Country',
          code: 'Code',
          phone: 'Phone',
          arrival_date: 'Date of entry to Peru',
          optional: 'Optional',
          terms: 'I accept the',
          terms2: 'Terms and Conditions and the Privacy Policy',
          example: 'i.e.',
          continue: 'Continue',
          required_field: 'Required field',
          lastname_required: 'Enter your last name',
          invalid_date: 'Enter a valid date',
          invalid_month: 'Enter a valid month',
          invalid_day: 'Enter a valid day',
          invalid_year: 'Traveler must be over 18 years old',
          invalid_email: 'Enter a valid email',
          invalid_number: 'Enter a valid number',
          payment_window: 'We will redirect you to the payment form. Please, do not close the window or click on "Go Back"',
          reserve_failed: 'We were unable to process the booking. Please try again.',
          wait: 'Please wait a few seconds...'
        }
      },
      phoneData: '',
      form: {
        fullname: '',
        email: '',
        phone: '',
        birthdate: '',
        country: '',
        docNumber: '',
        Date: '',
        terms: '',
        amount: ''
      },
      merchantId: process.env.visanetEnv === 'dev' ? process.env.devMerchantId : process.env.prodMerchantId,
      apiUrl: process.env.API_URL,
      sessionKey: '',
      expirationTime: '',
      paymentId: '',
      reserveId: ''
    }
  },
  computed: {
    ...mapState({
      countries: s => s.countries
    }),
    formRules() {
      return {
        fullname: [
          { required: true, message: this.$lang.translate(this.translations, 'required_field'), trigger: 'blur' },
          { validator: this.validateFullname, trigger: 'blur' }
        ],
        docNumber: [
          { required: true, message: this.$lang.translate(this.translations, 'required_field'), trigger: 'blur' }
        ],
        email: [
          { required: true, message: this.$lang.translate(this.translations, 'required_field'), trigger: 'blur' },
          { type: 'email', message: this.$lang.translate(this.translations, 'invalid_email'), trigger: 'blur' }
        ],
        birthdate: [
          { validator: this.validateBirthdate, trigger: 'blur' }
        ],
        country: [
          { required: true, message: this.$lang.translate(this.translations, 'required_field'), trigger: 'change' }
        ],
        phone: [
          { validator: this.validatePhone, trigger: 'blur' }
        ],
        terms: [
          { required: true, message: this.$lang.translate(this.translations, 'required_field'), trigger: 'change' }
        ]
      }
    },
    defaultCountryCode() {
      if(!this.$auth.loggedIn) return this.form.country
      if(
        this.$auth.$state.user.phone &&
        this.$auth.$state.user.phone.counstructor === Object &&
        'countryCode' in this.$auth.$state.user.phone) {
        return this.$auth.$state.user.phone.countryCode
      } else {
        return this.form.country
      }
    },
    visanetFirstname() {
      return this.form.fullname.split(' ')[0]
    },
    visanetLastname() {
      if(
        this.form.fullname === '' ||
        this.form.fullname.split(' ')[1] === undefined || 
        this.form.fullname.split(' ')[1] === '') {
        return ''
      } else {
        return this.form.fullname.split(' ')[1]
      }
    }
  },
  watch: {
    'form.country': {
      handler(newVal, oldVal) {
        this.setReserveField({ field: 'country', value: newVal })
      }
    },
    'form.birthdate': {
      handler(newVal, oldVal) {
        if(oldVal !== '' && newVal !== '') {
          if(newVal.length > oldVal.length) {
            if(newVal.length === 2 || newVal.length === 5) {
              this.form.birthdate = this.form.birthdate + '/'
            }
          }
        }
      }
    }
  },
  mounted () {
    this.setDefaultFields()
  },
  methods: {
    ...mapMutations({
      setReserveField: 'reserves/SET_RESERVE_FIELD'
    }),
    async createReserve(data) {
      try {
        const resp = await this.$axios.$post('/reserves/create', data)
        console.log('createReserve', resp)
        this.sessionKey = resp.payment_session.sessionKey
        this.expirationTime = resp.payment_session.expirationTime
        this.paymentId = resp.payment_uuid
        this.reserveId = resp.reserve_id + 300
        this.loadingMessage = this.$lang.translate(this.translations, 'payment_window')
        // this.triggerClickVisanet()
        // this.isLoading = false
      } catch (error) {
        this.isLoading = false
        this.$message.error(this.$lang.translate(this.translations, 'reserve_failed'))
      }
    },
    setPhoneData(callback) {
      this.phoneData = callback
    },
    setDefaultFields() {
      if (!this.$auth.loggedIn) return this.$router.push(`/${this.$lang.current().slug}`)

      const userData = this.$auth.$state.user
      this.form.fullname = userData.fullname
      this.form.email = userData.email
      this.form.phone = userData.phone && userData.phone.constructor === Object && 'nationalNumber' in userData.phone ? userData.nationalNumber : ''
      this.form.country = userData.country ? userData.country : ''

      this.setReserveField({ field: 'country', value: this.form.country })
    },
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        const amount = this.$store.getters['reserves/totalPrice']
        this.form.amount = amount

        const reserveDetails = this.$store.state.reserves.form

        if(valid) {
          const data = {
            experienceId: reserveDetails.experienceId,
            date: reserveDetails.date,
            time: reserveDetails.time,
            groupSize: reserveDetails.groupSize,
            fullname: this.form.fullname,
            docNumber: this.form.docNumber,
            country: this.form.country,
            phone: this.phoneData,
            birthdate: this.form.birthdate,
            Date: this.form.Date,
            amount: this.$store.getters['reserves/totalPrice'],
            email: reserveDetails.email,
            extras: reserveDetails.extras,
            message: reserveDetails.message
          }

          this.isLoading = true
          this.loadingMessage = this.$lang.translate(this.translations, 'wait')
          this.createReserve(data)
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .el-input__suffix {
    z-index: 99!important;
  }
</style>