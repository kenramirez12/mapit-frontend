<template>
  <div class="container mx-auto">
    <div class="w-1/4 mx-auto">
      <h1>Login</h1>
      <LoginForm />
    </div>
  </div>
</template>

<script>
import LoginForm from '~/components/LoginForm'

export default {
  components: { LoginForm }
}
</script>