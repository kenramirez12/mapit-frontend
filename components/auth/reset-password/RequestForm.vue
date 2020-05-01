<template>
  <div v-loading="isLoading">
    <el-form
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
        Restablecer
      </el-button>
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
          valid_email: 'Ingrese un email válido'
        },
        en_EN: {
          email: 'Email',
          valid_email: 'Enter a valid email'
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
          this.requestResetPassword(this.resetData)
        }
      })
    },
    async requestResetPassword(data) {
      try {
        const resp = await this.$axios.post('/password/create', data)
        this.$emit('update-sent')
      } catch (error) {
        this.$log.error('requestResetPassword', error, error.response)
        this.$message.error('No se pudo enviar.')
      }
    }
  }
}
</script>

<style>

</style>