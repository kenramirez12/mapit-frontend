
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
        <el-input
          v-model="registerData.password"
          @keypress.enter.native="onSubmit('registerForm')"
          type="password"
          class="shadow-input border-0"
          :placeholder="$lang.translate(translations, 'password')" />
      </el-form-item>
      <el-button @click="onSubmit('registerForm')" class="shadow-primary w-full" type="primary">
        {{ $lang.translate(translations, 'register') }}
      </el-button>
      <div v-if="showLoginLink" class="pt-5 text-center">
        <span class="font-light">
          {{ $lang.translate(translations, 'have_account') }}
        </span> 
        <a
          href="#"
          @click.prevent="$router.push(`/${$lang.current().slug}/login`)"
          class="underline">
          {{ $lang.translate(translations, 'sign_in') }}
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
import { mapMutations } from 'vuex'
import SocialLoginBtn from '~/components/auth/SocialLoginBtn'

export default {
  props: {
    showLoginLink: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
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
          valid_email: 'Ingrese un email válido',
          have_account: '¿Ya tienes una cuenta?',
          sign_in: 'Iniciar sesión',
          register_error: 'No pudimos procesar el registro, por favor inténtelo nuevamente.'
        },
        'en_EN': {
          fullname: 'Nombre y Apellido',
          email: 'Email',
          password: 'Password',
          register: 'Register',
          required_field: 'Required field',
          required_lastname: 'Enter your last name',
          valid_email: 'Enter a valid email',
          have_account: 'Already have an account?',
          sign_in: 'Sign in',
          register_error: 'We could not create your account, please try again.'
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
          { type: 'email', required: true, message: this.$lang.translate(this.translations, 'valid_email'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$lang.translate(this.translations, 'required_field'), trigger: 'blur' }
        ]
      }
    }
  },
  async mounted() {
    await this.$recaptcha.init()
  },
  methods: {
    ...mapMutations({
      setAuthDialogVisible: 'SET_AUTH_DIALOG_VISIBLE'
    }),
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.tryRegister()
        }
      })
    },
    async tryRegister () {
      this.isLoading = true
      const data = this.registerData

      try {
        const token = await this.$recaptcha.execute('login')
        data.token = token

        const resp = await this.$axios.post('/register', data)
        // this.$message.success('')
        const loginToken = await this.$recaptcha.execute('login')
        data.token = loginToken

        await this.$auth.loginWith('local', { data })
        this.setAuthDialogVisible(false)

        this.isLoading = false
      } catch(e) {
        this.$log.error('tryRegister.error: ', e)
        let error = this.$translate(this.translations, 'register_error')

        const errors = e && e.response && 'errors' in e.response.data ? e.response.data.errors : null
        if(errors) error = errors[Object.keys(errors)[0]][0]

        this.$message.error(error);
        this.isLoading = false
      }
    }
  }
}
</script>
