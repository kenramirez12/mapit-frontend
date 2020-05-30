<template>
  <el-form
    :disabled="isLoading"
    ref="contactForm"
    :model="formData"
    :rules="rules">
    <div class="flex flex-wrap">
      <div class="w-full px-2">
        <el-form-item prop="name">
          <el-input
            v-model="formData.name"
            :placeholder="$lang.translate(translations, 'name')"
            class="shadow-input border-0" />
        </el-form-item>
      </div>
      <div class="w-full px-2">
        <el-form-item prop="dni">
          <el-input
            v-model="formData.dni"
            :placeholder="$lang.translate(translations, 'dni')"
            class="shadow-input border-0" />
        </el-form-item>
      </div>
      <div class="w-full md:w-1/2 px-2">
        <el-form-item prop="country">
          <el-input
            v-model="formData.country"
            :placeholder="$lang.translate(translations, 'country')"
            class="shadow-input border-0" />
        </el-form-item>
      </div>
      <div class="w-full md:w-1/2 px-2">
        <el-form-item prop="phone">
          <el-input
            v-model="formData.phone"
            :placeholder="$lang.translate(translations, 'phone')"
            class="shadow-input border-0" />
        </el-form-item>
      </div>
      <div class="w-full md:w-1/2 px-2">
        <el-form-item prop="email">
          <el-input
            v-model="formData.email"
            :placeholder="$lang.translate(translations, 'email')"
            class="shadow-input border-0" />
        </el-form-item>
      </div>
      <div class="w-full md:w-1/2 px-2">
        <el-form-item prop="code">
          <el-input
            v-model="formData.code"
            :placeholder="$lang.translate(translations, 'code')"
            :maxlength="6"
            class="shadow-input border-0" />
        </el-form-item>
      </div>
      <div class="w-full px-2">
        <el-form-item prop="details">
          <el-input
            type="textarea"
            v-model="formData.details"
            :rows="4"
            :placeholder="$lang.translate(translations, 'details')"
            class="shadow-input border-0" />
        </el-form-item>
      </div>
      <div class="mb-3 break-words px-2 leading-tight text-gray-500">
        <small>This site is protected by reCAPTCHA and the Google
          <a class="underline" href="https://policies.google.com/privacy">Privacy Policy</a> and
          <a class="underline" href="https://policies.google.com/terms">Terms of Service</a> apply.
        </small>
      </div>
      <div class="px-2">
        <el-button
          v-loading="isLoading"
          @click="handleSubmit('contactForm')"
          type="primary">
          <div class="flex items-center">
            {{ $lang.translate(translations, 'send') }}
            <img src="/images/contact/right-arrow.svg" class="ml-3">
          </div>
        </el-button>
      </div>
    </div>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      formData: {
        name: '',
        dni: '',
        country: '',
        phone: '',
        email: '',
        code: '',
        details: ''
      },
      translations: {
        es_ES: {
          name: 'NOMBRE Y APELLIDO',
          dni: 'DOC. DE IDENTIDAD O PASAPORTE',
          country: 'PAÍS',
          phone: 'CELULAR',
          email: 'CORREO ELECTRÓNICO',
          code: 'CÓDIGO DE RESERVA',
          details: 'DETALLE DEL RECLAMO',
          send: 'ENVIAR',
          field_required: 'Campo requerido',
          valid_email: 'Ingrese un email válido',
          submit_success: '¡Listo! hemos recibo tu reclamo y te responderemos pronto.',
          submit_failed: 'No pudimos enviar tu reclamo, por favor inténtelo nuevamente.',
          invalid_code: 'Ingrese un código válido'
        },
        en_EN: {
          name: 'NAME',
          dni: 'ID OR PASSPORT NUMBER',
          country: 'COUNTRY',
          phone: 'PHONE NUMBER',
          email: 'EMAIL',
          code: 'BOOKING CODE',
          details: 'CLAIM DETAIL',
          send: 'SEND',
          field_required: 'Field required',
          valid_email: 'Enter a valid email',
          submit_success: 'Done! have received your claim and we will get in touch soon.',
          submit_failed: 'We could not send your claim, please try again.',
          invalid_code: 'Enter a valid code'
        }
      }
    }
  },
  computed: {
    rules() {
      return {
        name: [
          { required: true, message: this.$lang.translate(this.translations, 'field_required'), trigger: 'blur' }
        ],
        country: [
          { required: true, message: this.$lang.translate(this.translations, 'field_required'), trigger: 'blur' }
        ],
        email: [
          { required: true, message: this.$lang.translate(this.translations, 'field_required'), trigger: 'blur' },
          { type: 'email', message: this.$lang.translate(this.translations, 'valid_email'), trigger: 'blur' }
        ],
        code: [
          { required: true, message: this.$lang.translate(this.translations, 'field_required'), trigger: 'blur' },
          { min: 6, max: 7, message: this.$lang.translate(this.translations, 'invalid_code'), trigger: 'blur' }
        ],
        details: [
          { required: true, message: this.$lang.translate(this.translations, 'field_required'), trigger: 'blur' }
        ]
      }
    }
  },
  async mounted() {
    await this.$recaptcha.init()
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if(valid) {
          this.submitForm()
        }
      })
    },
    async submitForm() {
      this.isLoading = true

      try {
        const token = await this.$recaptcha.execute('login')
        const data = this.formData
        data.token = token

        const resp = await this.$axios.post('/claim', data)
        this.isLoading = false
        this.resetForm()
        this.$message.success(this.$lang.translate(this.translations, 'submit_success'))
      } catch (error) {
        this.isLoading = false
        this.$message.error(this.$lang.translate(this.translations, 'submit_failed'))
      }
    },
    resetForm() {
      this.formData.name = ''
      this.formData.dni = ''
      this.formData.country = ''
      this.formData.phone = ''
      this.formData.email = ''
      this.formData.code = ''
      this.formData.details = ''
    }
  }
}
</script>
