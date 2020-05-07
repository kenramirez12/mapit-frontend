
<template>
  <div class="container px-5 mx-auto py-12 flex">
    <div class="flex flex-wrap my-auto w-full">
      <div class="w-full sm:w-2/3 lg:w-1/3 mx-auto">
        <RegisterForm :show-login-link="true" />
      </div>
    </div>
  </div>
</template>

<script>
import RegisterForm from '~/components/auth/RegisterForm'

export default {
  middleware: 'guest',
  components: {
    RegisterForm
  },
  computed: {
    isLoggedIn() {
      return this.$auth.loggedIn
    }
  },
  watch: {
    isLoggedIn(value) {
      if(value) {
        this.$router.push(`/${this.$lang.current().slug}/experiences`)
      }
    }
  }
}
</script>
