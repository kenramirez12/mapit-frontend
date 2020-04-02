<template>
  <div class="container mx-auto">
    <RegisterForm />
  </div>
</template>

<script>
import LoginForm from '~/components/auth/LoginForm'
import RegisterForm from '~/components/auth/RegisterForm'

export default {
  components: {
    LoginForm,
    RegisterForm
  },
  data () {
    return {
      authDialogVisible: false
    }
  },
  methods: {
    updateVisible () {
      this.authDialogVisible = false
    }
  }
}
</script>
