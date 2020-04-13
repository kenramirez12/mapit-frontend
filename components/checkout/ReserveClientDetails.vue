<template>
  <div
    v-loading="isLoading"
    :element-loading-text="loadingMessage"
    class="flex flex-col h-full">
    <span class="block mb-5 pb-3">
      {{ $lang.translate(translations, 'traveler') }}
    </span>
    <el-form :model="form" :rules="formRules" ref="clientDetailsForm">
      <div class="w-2/3">
        <div class="flex -mx-4">
          <div class="w-1/2 px-4">
            <div
              :class="{ 'has-value' : form.fullname !== '' }"
              class="input-underline"
              data-placeholder="Nombre y Apellido">
              <el-form-item prop="fullname" class="mb-0">
                <el-input type="text" v-model="form.fullname" />
              </el-form-item>
            </div>
          </div>
          <div class="w-1/2 px-4">
            <div
              :class="{ 'has-value' : form.docNumber !== '' }"
              class="input-underline"
              data-placeholder="Doc. de Identidad o Pasaporte">
              <el-form-item prop="docNumber" class="mb-0">
                <el-input type="text" v-model="form.docNumber" />
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="flex -mx-4">
          <div class="w-1/2 px-4">
            <div
              :class="{ 'has-value' : form.email !== '' }"
              class="input-underline"
              data-placeholder="E-mail">
              <el-form-item prop="email" class="mb-0">
                <input type="email" v-model="form.email">
              </el-form-item>
            </div>
          </div>
          <div class="w-1/2 px-4">
            <div
              :class="{ 'has-value' : form.birthdate !== null }"
              class="input-underline"
              data-placeholder="Fecha de nacimiento">
              <el-form-item prop="birthdate" class="mb-0">
                <el-date-picker
                  v-model="form.birthdate"
                  format="dd-MM-yyyy"
                  value-format="yyyy-MM-dd"
                  class="input-underline"
                  type="date">
                </el-date-picker>
              </el-form-item>
            </div>
          </div>
        </div>  
        <div class="flex -mx-4">
          <div class="w-1/2 px-4">
            <div
              :class="{ 'has-value' : form.country !== '' }"
              class="input-underline"
              data-placeholder="País">
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
          <div class="w-1/2 px-4">
            <div class="input-underline">
              <el-form-item prop="phone" class="custom-input-phone mb-0">
                <VuePhoneNumberInput
                  v-model="form.phone"
                  @update="setPhoneData"
                  :default-country-code="form.country"
                  :translations="{ countrySelectorLabel: 'Código', phoneNumberLabel: 'Celular', example: 'Ejemplo: ' }"
                />
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="flex -mx-4">
          <div v-if="form.country !== 'PE'" class="w-1/2 px-4">
            <div
              :class="{ 'has-value' : form.Date !== '' }"
              class="input-underline"
              data-placeholder="Fecha de llegada al país"
              data-helper="Opcional">
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
        <div class="block mt-6">
          <el-form-item prop="terms" class="mb-0">
            <el-checkbox v-model="form.terms" class="font-light">Acepto los <a href="#" class="font-medium">términos y condiciones</a> de privacidad y uso de datos</el-checkbox>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div class="my-4 py-3 px-4 self-start font-light" style="background:rgb(233, 255, 255);font-size:14px">
      {{ $lang.translate(translations, 'noArrivalDate') }}
    </div>
    <div class="mt-auto">
      <el-button @click="handleSubmit('clientDetailsForm')" type="primary">Continuar</el-button>
    </div>
    <no-ssr>
      <form
        v-if="sessionKey"
        :action="`${apiUrl}/payments/${paymentId}/callback`"
        method="post"
        style="display:none">
        <script src="https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true"
        :data-sessiontoken="sessionKey"
        data-channel="web"
        :data-merchantid="merchantId"
        data-merchantlogo="img/comercio.png"
        data-formbuttoncolor="#D80000"
        :data-cardholdername="visanetFirstame"
        :data-cardholderlastname="visanetLastname"
        :data-purchasenumber="reserveId"
        :data-amount="form.amount"
        :data-cardholderemail="form.email"
        data-expirationminutes="10"
        data-timeouturl="timeout.html" />
      </form>
    </no-ssr>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    const validateFullname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Este campo es requerido'))
      } else {
        const splitted = value.split(' ')
        if(splitted.length <= 1 || splitted[splitted.length - 1].trim().length < 2) {
          callback(new Error('Ingrese su apellido'))
        } else {
          callback()
        }
      }
    }

    const validatePhone = (rule, value, callback) => {
      if(value === '' || this.phoneData === '') {
        callback(new Error('Este campo es requerido'))
      } else if (this.phoneData.isValid === false) {
        callback(new Error('Ingrese un número válido'))
      } else {
        callback()
      }
    }

    const validateBirthdate = (rule, value, callback) => {
      if(value === '') {
        callback(new Error('Este campo es requerido'))
      } else {
        callback()
      }
    }

    return {
      isLoading: false,
      loadingMessage: '',
      translations: {
        'es_ES': {
          traveler: 'Viajero',
          noArrivalDate: 'En caso que aún no tengas la fecha, la puedes enviar después.'
        },
        'en_EN': {
          traveler: 'Traveler',
          noArrivalDate: 'In case you don\'t have the date yet, you can send it later'
        }
      },
      phoneData: '',
      form: {
        fullname: '',
        email: '',
        phone: '',
        birthdate: null,
        country: '',
        docNumber: '',
        Date: '',
        terms: '',
        amount: ''
      },
      formRules: {
        fullname: [
          { required: true, message: 'Este campo es requerido', trigger: 'blur' },
          { validator: validateFullname, trigger: 'blur' }
        ],
        docNumber: [
          { required: true, message: 'Este campo es requerido', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Este campo es requerido', trigger: 'blur' },
          { type: 'email', message: 'Ingrese un e-mail válido', trigger: 'blur' }
        ],
        birthdate: [
          { validator: validateBirthdate, trigger: 'change' }
        ],
        country: [
          { required: true, message: 'Este campo es requerido', trigger: 'change' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        terms: [
          { required: true, message: 'Debes aceptar los términos y condiciones para continuar', trigger: 'change' }
        ]
      },
      merchantId: process.env.visanetMerchantId,
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
    visanetFirstame() {
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
  mounted () {
    this.setDefaultFields()
  },
  methods: {
    ...mapMutations({
      setReserveField: 'reserves/SET_RESERVE_FIELD'
    }),
    triggerClickVisanet() {
      let btnAppear = false
      let btnClicked = false
      setInterval(() => {
        const btn = document.querySelector('.start-js-btn')
        if(btn) {
          if(btnAppear && !btnClicked) {
            btnClicked = true
            btn.click()
          } else {
            btnAppear = true
          }
        }
      }, 500);
    },
    async createReserve(data) {
      try {
        const resp = await this.$axios.$post('/reserves/create', data)
        this.sessionKey = resp.payment_session.sessionKey
        this.expirationTime = resp.payment_session.expirationTime
        this.paymentId = resp.payment_uuid
        this.reserveId = resp.reserve_id + 100
        this.loadingMessage = 'La ventana de pago aparecerá en unos segundos...'
        this.triggerClickVisanet()
        // this.isLoading = false
      } catch (error) {
        this.isLoading = false
        this.$message.error('No pudimos procesar la reserva. Por favor inténtelo nuevamente.')
      }
    },
    setPhoneData(callback) {
      this.phoneData = callback
    },
    setDefaultFields() {
      if (!this.$auth.loggedIn) return this.$router.push(`/${this.$lang.current().slug}`)

      const userData = this.$auth.$state.user
      this.setReserveField('fullname', userData.fullname)
      this.setReserveField('phone', userData.phone)
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
            phone: this.phoneData.formattedNumber,
            birthdate: this.form.birthdate,
            Date: this.form.Date,
            amount: this.$store.getters['reserves/totalPrice'],
            email: reserveDetails.email,
            extras: reserveDetails.extras
          }

          this.isLoading = true
          this.loadingMessage = 'Espere unos segundos...'
          this.createReserve(data)
        }
      })
    }
  }
}
</script>
