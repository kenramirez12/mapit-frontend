<template>
  <div v-loading="isLoading">
    <h1 class="text-2xl md:text-3xl lg:text-4xl leading-tight font-light mb-8 text-center">
      {{ $lang.translate(translations, 'update_password') }}
    </h1>
    <el-form
      @submit.native.prevent
      :model="resetData"
      :rules="resetFormRules"
      ref="resetForm">
      <el-form-item prop="password">
        <el-input
          v-model="resetData.password"
          type="password"
          :class="{ 'shadow-input' : !isLoading }"
          class="border-0"
          :placeholder="$lang.translate(translations, 'new_password')" />
      </el-form-item>
      <el-form-item prop="password_confirmation">
        <el-input
          v-model="resetData.password_confirmation"
          type="password"
          :class="{ 'shadow-input' : !isLoading }"
          class="border-0"
          @keyup.enter.native="handleSubmit('resetForm')"
          :placeholder="$lang.translate(translations, 'new_password_confirmation')" />
      </el-form-item>
      <el-button
        @click="handleSubmit('resetForm')"
        type="primary"
        class="w-full">
        {{ $lang.translate(translations, 'update_btn') }}
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    token: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  data() {
    const validateConfirmPassword = (rule, value, callback) => {
      if(!value) {
        return callback(new Error(this.$lang.translate(this.translations, 'required_field')))
      } else {
        if(value !== this.resetData.password) {
          return callback(new Error(this.$lang.translate(this.translations, 'password_not_match')))
        } else {
          return callback()
        }
      }
    }

    return {
      validateConfirmPassword,
      isLoading: false,
      translations: {
        es_ES: {
          update_password: `Actualizar<br>contraseña`,
          update_btn: 'Actualizar contraseña',
          new_password: 'Nueva contraseña',
          new_password_confirmation: 'Confirme la nueva contraseña',
          required_field: 'Campo requierdo',
          password_not_match: 'Las contraseñas no coinciden',
          password_updated: '¡Listo! tu contraseña ha sido actualizada'
        },
        en_EN: {
          update_password: `Update<br>password`,
          update_btn: 'Update password',
          new_password: 'New password',
          new_password_confirmation: 'Confirm new password',
          required_field: 'Required field',
          password_not_match: 'Passwords do not match',
          password_updated: 'Done! your password has been updated'
        }
      },
      resetData: {
        password: '',
        password_confirmation: '',
        email: '',
        token: ''
      }
    }
  },
  computed: {
    resetFormRules() {
      return {
        password: [
          { required: true, message: this.$lang.translate(this.translations, 'required_field'), trigger: 'blur' }
        ],
        password_confirmation: [
          { required: true, message: this.$lang.translate(this.translations, 'required_field'), trigger: 'blur' },
          { validator: this.validateConfirmPassword, trigger: 'blue' }
        ],
      }
    }
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if(valid) {
          const data = {
            ...this.resetData,
            email: this.email,
            token: this.token
          }
          this.updatePassword(data)
        }
      })
    },
    async updatePassword(data) {
      this.isLoading = true

      try {
        const resp = await this.$axios.post('/password/reset', data)
        this.$log.info(resp)
        this.$message.success(this.$lang.translate(this.translations, 'password_updated'))
        this.isLoading = false
        return this.$router.push(`/${this.$lang.current().slug}/login`)
      } catch (error) {
        this.$log.error('updatePassword', error, error.response)
        this.$message.error(error.response.data.message)
        this.isLoading = false
      }
    }
  }
}
</script>

<style>

</style>