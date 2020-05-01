<template>
  <el-form
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
        :placeholder="$lang.translate(translations, 'new_password_confirmation')" />
    </el-form-item>
    <el-button @click="handleSubmit('resetForm')" type="submit">Cambiar clave</el-button>
  </el-form>
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
        return callback(new Error('Campo requerido'))
      } else {
        if(value !== this.resetData.password) {
          return callback(new Error('Las contraseñas no coinciden'))
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
          new_password: 'Nueva contraseña',
          new_password_confirmation: 'Confirme la nueva contraseña'
        },
        en_EN: {
          new_password: 'New password',
          new_password_confirmation: 'Confirm new password'
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
      try {
        const resp = await this.$axios.post('/password/reset', data)
        this.$log.info(resp)
        this.$message.success('Listo papy')
        return this.$router.push(`/${this.$lang.current().slug}/login`)
      } catch (error) {
        this.$log.error('updatePassword', error, error.response)
        this.$message.error(error.response.data.message)
      }
    }
  }
}
</script>

<style>

</style>