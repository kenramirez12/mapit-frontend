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
      <div class="mt-4 text-center">
        <a href="#" class="text-xs">
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
          incorrect_data: 'El correo y/o la contraseña son incorrectos.'
        },
        'en_EN': {
          email: 'Email',
          password: 'Password',
          login: 'Login',
          forgot_password: 'Forgot Password?',
          valid_email: 'Enter a valid email',
          valid_password: 'Enter your password',
          incorrect_data: 'Email or password does not match.'
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
  methods: {
    ...mapMutations({
      setAuthDialogVisible: 'SET_AUTH_DIALOG_VISIBLE'
    }),
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.tryLogin(this.loginData)
        }
      })
    },
    async tryLogin (data) {
      this.isLoading = true
      try {
        await this.$auth.loginWith('local', { data })
        this.setAuthDialogVisible(false)
        this.isLoading = false
      } catch(e) {
        if(process.env.NODE_ENV === 'dev') {
          console.error('LoginForm.tryLogin()', e)
        }
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
