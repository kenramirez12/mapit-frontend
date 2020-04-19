
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
        <el-input v-model="registerData.fullname" class="shadow-input border-0" :placeholder="$lang.translate(translations, 'fullname')" />
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="registerData.email" type="email" class="shadow-input border-0" :placeholder="$lang.translate(translations, 'email')" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="registerData.password" type="password" class="shadow-input border-0" :placeholder="$lang.translate(translations, 'password')" />
      </el-form-item>
      <el-button @click="onSubmit('registerForm')" class="shadow-primary w-full" type="primary">
        {{ $lang.translate(translations, 'register') }}
      </el-button>
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
    const validateFullname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$lang.translate(this.translations, 'required_field')))
      } else {
        const splitted = value.split(' ')
        if(splitted.length <= 1 || splitted[splitted.length - 1].trim().length < 2) {
          callback(new Error(this.$lang.translate(this.translations, 'required_lastname')))
        } else {
          callback()
        }
      }
    }

    return {
      validateFullname,
      isLoading: false,
      translations: {
        'es_ES': {
          fullname: 'Nombre y Apellido',
          email: 'Correo electrónico',
          password: 'Contraseña',
          register: 'Registrate',
          required_field: 'Este campo es requerido',
          required_lastname: 'Ingrese su apellido',
          valid_email: 'Ingrese un email válido'
        },
        'en_EN': {
          fullname: 'Nombre y Apellido',
          email: 'Email',
          password: 'Password',
          register: 'Register',
          required_field: 'Required field',
          required_lastname: 'Enter your last name',
          valid_email: 'Enter a valid email'
        }
      },
      registerData: {
        fullname: '',
        email: '',
        password: ''
      }
    }
  },
  computed: {
    registerFormRules() {
      return {
        fullname: [
          { required: true, message: this.$lang.translate(this.translations, 'required_field') },
          { validator: this.validateFullname, trigger: 'blur' }
        ],
        email: [
          { type: 'email', required: true, message: this.$lang.translate(this.translations, 'valid_email') }
        ],
        password: [
          { required: true, message: this.$lang.translate(this.translations, 'required_field') }
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
