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
      <div class="w-1/2 px-2">
        <el-form-item prop="country">
          <el-input
            v-model="formData.country"
            :placeholder="$lang.translate(translations, 'country')"
            class="shadow-input border-0" />
        </el-form-item>
      </div>
      <div class="w-1/2 px-2">
        <el-form-item prop="email">
          <el-input
            v-model="formData.email"
            :placeholder="$lang.translate(translations, 'email')"
            class="shadow-input border-0" />
        </el-form-item>
      </div>
      <div class="w-full px-2">
        <el-form-item prop="message">
          <el-input
            type="textarea"
            v-model="formData.message"
            :rows="4"
            :placeholder="$lang.translate(translations, 'message')"
            class="shadow-input border-0" />
        </el-form-item>
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
        type: '',
        experience: '',
        date: '',
        group_size: '',
        name: '',
        country: '',
        email: '',
        message: ''
      },
      translations: {
        es_ES: {
          name: 'NOMBRE',
          country: 'PAÍS',
          email: 'CORREO ELECTRÓNICO',
          message: 'MENSAJE',
          send: 'ENVIAR',
          field_required: 'Campo requerido',
          valid_email: 'Ingrese un email válido',
          submit_success: '¡Listo! hemos recibo tu mensaje y te responderemos pronto.',
          submit_failed: 'No pudimos enviar tu mensaje, por favor inténtelo nuevamente.',
          inquire: 'Hola, estoy interesado en la experiencia',
          reserve_1: 'Hola! Quisiera hacer una reserva para la experiencia',
          reserve_for: 'para',
          reserve_person: 'persona',
          reserve_persons: 'personas',
          reserve_2: 'Por favor, me podrían mandar un e-mail con los pasos que debo seguir para completar la solicitud de reserva. Gracias!'
        },
        en_EN: {
          name: 'NAME',
          country: 'COUNTRY',
          email: 'EMAIL',
          message: 'YOUR MESSAGE',
          send: 'SEND',
          field_required: 'Field required',
          valid_email: 'Enter a valid email',
          submit_success: 'Done! have received your message and we will get in touch soon.',
          submit_failed: 'We could not send your message, please try again.',
          inquire: 'Hi, I\'m interested in the experience',
          reserve_1: 'Hi! I would like to book the experience',
          reserve_for: 'for',
          reserve_person: 'person',
          reserve_persons: 'people',
          reserve_2: 'Please send me an e-mail with the steps I should follow to complete the booking request.'
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
        message: [
          { required: true, message: this.$lang.translate(this.translations, 'field_required'), trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    if(Object.keys(this.$route.query).length > 0) {
      if('type' in this.$route.query) {
        if(this.$route.query.type === 'inquire') {
          this.formData.type = this.$route.query.type
          this.formData.experience = this.$route.query.experience
          this.formData.message =  this.$lang.translate(this.translations, 'inquire') + ' ' + this.$route.query.experience
        }

        if(this.$route.query.type === 'reserve') {
          this.formData.type = this.$route.query.type
          this.formData.date = this.$route.query.date
          this.formData.group_size = this.$route.query.group_size
          this.formData.experience = this.$route.query.experience

          this.formData.message = `${this.$lang.translate(this.translations, 'reserve_1')} ${this.$route.query.experience}`
          
          if('group_size' in this.$route.query) {
            this.formData.message += ` ${this.$lang.translate(this.translations, 'reserve_for')} ${this.$route.query.group_size} `
            if(parseInt(this.$route.query.group_size) === 1) {
              this.formData.message += this.$lang.translate(this.translations, 'reserve_person')
            } else {
              this.formData.message += this.$lang.translate(this.translations, 'reserve_persons')
            }
          }

          this.formData.message += `.\n\n${this.$lang.translate(this.translations, 'reserve_2')}`
        }
      }
    }
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
        const resp = await this.$axios.post('/contact', this.formData)
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
      this.formData.country = ''
      this.formData.email = ''
      this.formData.message = ''
    }
  }
}
</script>
