<template>
  <el-dialog
    :visible.sync="isVisible"
    custom-class="auth-dialog">
    <div class="flex">
      <div class="w-1/2">
        <div class="auth-hero">
          <div class="auth-hero__content">
            <h3 class="auth-hero__title">Únete<br>hoy</h3>
            <p class="auth-hero__copy">Sé parte de la nueva<br>generación de viajeros.</p>
          </div>
        </div>
      </div>
      <div class="w-1/2">
        <el-tabs type="border-card" class="full">
          <el-tab-pane label="Ingresar">
            <LoginForm />
          </el-tab-pane>
          <el-tab-pane label="Regístrate">
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
      isVisible: this.authDialogVisible
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
      text-align: center;
      border: 0!important;
      height: 50px;
      line-height: 50px;

      &:hover,
      &.is-active {
        color: #000 !important;
        font-weight: 400;
      }
    }
  }

  .auth-dialog {
    max-width: 960px;
    width: calc(100% - 60px);  
  }

  .auth-hero {
    height: 100%;

    &__content {
      height: 100%;
      padding: 2.5rem;
      padding-left: 3.5rem;
      color: #fff;
      background-image: url('/images/auth-form-bg.jpg');
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
