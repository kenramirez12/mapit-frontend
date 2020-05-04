<template>
  <div v-loading="isLoading">
    <h1
      class="text-5xl leading-tight font-light mb-8"
      v-html="$lang.translate(translations, 'reset_password')" />
    <el-form
      @submit.native.prevent
      :model="resetData"
      :rules="resetFormRules"
      ref="requestResetForm">
      <el-form-item prop="email">
        <el-input
          v-model="resetData.email"
          type="email"
          :class="{ 'shadow-input' : !isLoading }"
          class="border-0"
          @keyup.enter.native="handleSubmit('requestResetForm')"
          :placeholder="$lang.translate(translations, 'email')" />
      </el-form-item>
      <el-button
        @click="handleSubmit('requestResetForm')"
        :class="{ 'shadow-primary' : !isLoading }"
        class="w-full"
        type="primary">
        {{ $lang.translate(translations, 'reset') }}
      </el-button>
      <div class="py-3 text-center">
        <a
          href="#"
          @click.prevent="$router.push(`/${$lang.current().slug}/login`)"
          class="underline">
          {{ $lang.translate(translations, 'back_to_login') }}
        </a>
      </div>
      <div class="mt-2 break-words px-0 md:px-5 text-center leading-tight text-gray-500">
        <small>This site is protected by reCAPTCHA and the Google 
          <a class="underline" href="https://policies.google.com/privacy">Privacy Policy</a> and
          <a class="underline" href="https://policies.google.com/terms">Terms of Service</a> apply.
        </small>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      translations: {
        es_ES: {
          email: 'Correo electrónico',
          valid_email: 'Ingrese un email válido',
          reset_password: `Estrablecer<br>contraseña`,
          reset: 'Restablecer',
          back_to_login: 'Volver a inicio de sesión',
          not_sent: 'No pudimos validar la información. Por favor inténtelo nuevamente.'
        },
        en_EN: {
          email: 'Email',
          valid_email: 'Enter a valid email',
          reset_password: `Reset<br>password`,
          reset: 'Reset',
          back_to_login: 'Back to log in',
          not_sent: 'We couldn\'t validate your information.Please try again.'
        }
      },
      resetData: {
        email: ''
      }
    }
  },
  computed: {
    resetFormRules() {
      return {
        email: [
          { type: 'email', required: true, message: this.$lang.translate(this.translations, 'valid_email'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if(valid) {
          return this.requestResetPassword(this.resetData)
        }
      })
    },
    async requestResetPassword(data) {
      this.isLoading = true
      try {
        const resp = await this.$axios.post('/password/create', data)
        this.$emit('update-sent', this.resetData.email)
        this.isLoading = false
      } catch (error) {
        this.$log.error('requestResetPassword', error, error.response)
        const apiError = error.response.data.message
        this.$message.error(apiError ? apiError : this.$lang.translate(this.translations, 'not_sent'))
        this.isLoading = false
      }
    }
  }
}
</script>

<style>

</style>