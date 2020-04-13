
<template>
  <div v-loading="isLoading">
    <SocialLoginBtn social="facebook" />
    <SocialLoginBtn social="google" />
    <hr class="mb-4">
    <el-form
      :model="registerData"
      :rules="registerFormRules"
      ref="registerForm">
      <el-form-item prop="fullname">
        <el-input v-model="registerData.fullname" class="shadow-input border-0" placeholder="Nombres" />
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="registerData.email" type="email" class="shadow-input border-0" placeholder="Correo electrónico" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="registerData.password" type="password" class="shadow-input border-0" placeholder="Contraseña" />
      </el-form-item>
      <el-button @click="onSubmit('registerForm')" class="shadow-primary w-full" type="primary">Regístrate</el-button>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import SocialLoginBtn from '~/components/auth/SocialLoginBtn'

export default {
  components: {
    SocialLoginBtn
  },
  data () {
    return {
      isLoading: false,
      registerData: {
        fullname: '',
        email: '',
        password: ''
      },
      registerFormRules: {
        fullname: [
          { required: true, message: 'Ingrese su nombre' }
        ],
        email: [
          { type: 'email', required: true, message: 'Ingrese un email válido' }
        ],
        password: [
          { required: true, message: 'Ingrese su contraseña' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations({
      setAuthDialogVisible: 'SET_AUTH_DIALOG_VISIBLE'
    }),
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.tryRegister(this.registerData)
        }
      })
    },
    async tryRegister (data) {
      this.isLoading = true
      try {
        await this.$axios.post('/register', data)

        await this.$auth.loginWith('local', { data })
        this.setAuthDialogVisible(false)

        this.isLoading = false
      } catch(e) {
        console.error('RegisterForm.tryRegister()', e.response)
        let error = 'No pudimos procesar el registro, por favor inténtelo nuevamente.'

        const errors = 'errors' in e.response.data ? e.response.data.errors : null
        if(errors) error = errors[Object.keys(errors)[0]][0]

        this.$message.error(error);
        this.isLoading = false
      }
    }
  }
}
</script>
