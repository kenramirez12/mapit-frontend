<template>
  <div v-loading="isLoading">
    <SocialLoginBtn social="facebook" />
    <SocialLoginBtn social="google" />
    <hr class="mb-4">
    <el-form
      :model="loginData"
      :rules="loginFormRules"
      ref="loginForm">
      <el-form-item prop="email">
        <el-input
          v-model="loginData.email"
          type="email"
          :class="{ 'shadow-input' : !isLoading }"
          class="border-0"
          :placeholder="$lang.translate(translations, 'email')" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginData.password"
          @keypress.enter.native="onSubmit('loginForm')"
          type="password"
          :class="{ 'shadow-input' : !isLoading }"
          class="border-0"
          :placeholder="$lang.translate(translations, 'password')" />
      </el-form-item>
      <el-button
        @click="onSubmit('loginForm')"
        :class="{ 'shadow-primary' : !isLoading }"
        class="w-full"
        type="primary">
        {{ $lang.translate(translations, 'login') }}
      </el-button>
      <div v-if="showRegisterLink" class="pt-5 text-center">
        <span class="font-light">
          {{ $lang.translate(translations, 'havent_account') }}
        </span> 
        <a
          href="#"
          @click.prevent="$router.push(`/${$lang.current().slug}/signup`)"
          class="underline">
          {{ $lang.translate(translations, 'register') }}
        </a>
      </div>
      <div class="mt-2 break-words px-0 md:px-5 text-center leading-tight text-gray-500">
        <small>This site is protected by reCAPTCHA and the Google 
          <a class="underline" href="https://policies.google.com/privacy">Privacy Policy</a> and
          <a class="underline" href="https://policies.google.com/terms">Terms of Service</a> apply.
        </small>
      </div>
      <div class="mt-4 text-center">
        <a href="#" class="text-sm">
          {{ $lang.translate(translations, 'forgot_password') }}
        </a>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import SocialLoginBtn from '~/components/auth/SocialLoginBtn'

export default {
  props: {
    showRegisterLink: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  components: {
    SocialLoginBtn
  },
  data () {
    return {
      isLoading: false,
      translations: {
        'es_ES': {
          email: 'Correo electrónico',
          password: 'Contraseña',
          login: 'Ingresar',
          forgot_password: '¿Olvidaste tu contraseña?',
          valid_email: 'Ingrese un email válido',
          valid_password: 'Ingrese su contraseña',
          incorrect_data: 'El correo y/o la contraseña son incorrectos.',
          havent_account: '¿No tienes cuenta?',
          register: 'Regístrate'
        },
        'en_EN': {
          email: 'Email',
          password: 'Password',
          login: 'Login',
          forgot_password: 'Forgot Password?',
          valid_email: 'Enter a valid email',
          valid_password: 'Enter your password',
          incorrect_data: 'Email or password does not match.',
          havent_account: 'Don’t have an account?',
          register: 'Sign up'
        }
      },
      loginData: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    loginFormRules() {
      return {
        email: [
          { type: 'email', required: true, message: this.$lang.translate(this.translations, 'valid_email') }
        ],
        password: [
          { required: true, message: this.$lang.translate(this.translations, 'valid_password') }
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
          this.tryLogin()
        }
      })
    },
    async tryLogin () {
      this.isLoading = true
      const data = this.loginData

      try {
        const token = await this.$recaptcha.execute('login')
        data.token = token

        await this.$auth.loginWith('local', { data })
        this.setAuthDialogVisible(false)
        this.isLoading = false
      } catch(e) {
        this.$log.error('tryLogin.error: ', e, e.response)
        this.isLoading = false
        this.$message.error(this.$lang.translate(this.translations, 'incorrect_data'));
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  $--color-primary: #37D7D7 !default;

  .shadow-input {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;

    &:hover, &:focus {
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }
  }

  .shadow-primary {
    box-shadow: 0 0 10px rgba($--color-primary, 0.7);
    transition: all 0.3s;

    &:hover, &:focus {
      box-shadow: 0 0 5px rgba($--color-primary, 0.9);
    }
  }
</style>
