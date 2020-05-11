<template>
  <el-dialog
    :visible.sync="isVisible"
    custom-class="auth-dialog">
    <!-- <el-button size="small" icon="el-icon-close" class="shadow" /> -->
    <div class="flex">
      <div class="auth-dialog__left">
        <div class="auth-hero">
          <div class="auth-hero__content">
            <h3 class="auth-hero__title" v-html="$lang.translate(translations, 'hero_title')" />
            <p class="auth-hero__copy" v-html="$lang.translate(translations, 'hero_copy')" />
          </div>
        </div>
      </div>
      <div class="auth-dialog__right">
        <el-tabs type="border-card" class="full">
          <el-tab-pane :label="$lang.translate(translations, 'login')">
            <LoginForm />
          </el-tab-pane>
          <el-tab-pane :label="$lang.translate(translations, 'register')">
            <RegisterForm />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import LoginForm from '~/components/auth/LoginForm'
import RegisterForm from '~/components/auth/RegisterForm'

export default {
  components: {
    LoginForm,
    RegisterForm
  },
  data () {
    return {
      isVisible: this.authDialogVisible,
      translations: {
        'es_ES': {
          hero_title: `Únete<br>hoy`,
          hero_copy: `Sé parte de la nueva<br>generación de viajeros`,
          login: 'Ingresar',
          register: 'Registrate'
        },
        'en_EN': {
          hero_title: `Join Us!`,
          hero_copy: `Be part of the next<br>generation of travelers`,
          login: 'Log in',
          register: 'Sign up'
        }
      }
    }
  },
  computed: {
    ...mapGetters(['authDialogVisible'])
  },
  watch: {
    authDialogVisible (value) {
      this.isVisible = value
    },
    isVisible (value) {
      if(!value) {
        this.setAuthDialogVisible(false)
      }
    }
  },
  methods: {
    ...mapMutations({
      setAuthDialogVisible: 'SET_AUTH_DIALOG_VISIBLE'
    })
  }
}
</script>

<style lang="scss">
  .el-dialog__headerbtn {
    z-index: 9;
    background: #fff;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    top: .9rem;
    right: .4rem;

    @media screen and (min-width: 768px) {
      width: 26px;
      height: 26px;
      top: .7rem;
      right: .5rem;
    }
  }
  
  .full.el-tabs {
    .el-tabs--border-card {
      box-shadow: 0 0 0!important;
    }

    .el-tabs__header {
      border-bottom: 0!important;
    }

    .el-tabs__nav {
      display: flex;
      width: 100%;
    }

    .el-tabs__item {
      flex: 1;
      width: 50%;
      margin: 0!important;
      text-align: center;
      border: 0!important;
      height: 50px;
      line-height: 50px;
      font-size: 90%;

      @media screen and (min-width: 768px) {
        font-size: 100%;
      }

      &:hover,
      &.is-active {
        color: #000 !important;
        font-weight: 400;
      }
    }
  }

  .auth-dialog {
    max-width: 480px;
    width: calc(100% - 60px);

    @media screen and (min-width: 830px) {
      max-width: unset;
      width: 960px;
    }

    &__left, &__right {
      flex: 1;
    }
    
    &__left {
      display: none;

      @media screen and (min-width: 830px) {
        display: block;
      }
    }
  }

  .auth-hero {
    height: 100%;

    &__content {
      height: 100%;
      padding: 2.5rem;
      padding-left: 3.5rem;
      color: #fff;
      background-image: url('/images/auth-bg.jpg');
      background-position: center;
      background-size: cover;
    }

    &__title {
      font-size: 4rem;
      line-height: 1;
      margin-bottom: 2rem;
      font-weight: 300;
    }

    &__copy {
      font-size: 1.2rem;
      font-weight: 300;
    }
  }
</style>
