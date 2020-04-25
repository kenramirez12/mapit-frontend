<template>
  <el-form
    ref="subscribeForm"
    :model="formData"
    :rules="formRules">
    <el-form-item prop="email">
      <el-input
        v-model="formData.email"
        :disabled="isLoading"
        :class="{'shadow-input' : !isLoading}"
        class="border-0"
        style="max-width:240px" />
    </el-form-item>
    <el-button
      v-loading="isLoading"
      @click="handleSubmit('subscribeForm')"
      size="small"
      type="primary"
      :class="{'shadow-input' : !isLoading}">
      {{ $lang.translate(translations, 'send') }} <i class="el-icon-right ml-1" />
    </el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      formData: {
        email: ''
      },
      translations: {
        es_ES: {
          send: 'Enviar',
          field_required: 'Ingrese su email',
          valid_email: 'Ingrese un email válido',
          subscribed: '¡Listo! gracias por suscribirte.',
          already_subscribed: 'Whoops, al parecer ya estabas suscrito.',
          error_subscribe: 'No pudimos realizar la suscripción. Por favor inténtelo nuevamente.'
        },
        en_EN: {
          send: 'Subscribe',
          field_required: 'Enter your email',
          valid_email: 'Enter a valid email',
          subscribed: 'Done! thank you for subscribe.',
          already_subscribed: 'Whoops, seems like you are already subscribed.',
          error_subscribe: 'We were unable to subscribe. Please try again.'
        }
      }
    }
  },
  computed: {
    formRules() {
      return {
        email: [
          { required: true, message: this.$lang.translate(this.translations, 'field_required'), trigger: 'blur' },
          { type: 'email', message: this.$lang.translate(this.translations, 'valid_email'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if(valid) {
          this.subscribe()
        }
      })
    },
    async subscribe() {
      this.isLoading = true

      try {
        const resp = await this.$axios.post('/subscribe', this.formData)
        this.isLoading = false
        if(resp.data.status === 'subscribed') {
          this.formData.email = ''
          this.$message.success(this.$lang.translate(this.translations, 'subscribed'))
        } else if(resp.data.status === 400 && resp.data.title === 'Member Exists') {
          this.$message.warning(this.$lang.translate(this.translations, 'already_subscribed'))
        } else {
          this.$message.error(this.$lang.translate(this.translations, 'error_subscribe'))
        }
      } catch (error) {
        console.error('subscribe', error)
        this.isLoading = false
        this.$message.error(this.$lang.translate(this.translations, 'error_subscribe'))
      }

    }
  }
}
</script>
