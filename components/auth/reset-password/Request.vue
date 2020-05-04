<template>
  <div>
    <EmailSent v-if="requestSent" :email="email" />
    <PasswordResetRequestForm v-else @update-sent="updateSent" />
  </div>
</template>

<script>
import EmailSent from '@/components/auth/reset-password/EmailSent'
import PasswordResetRequestForm from '@/components/auth/reset-password/RequestForm'

export default {
  components: {
    EmailSent,
    PasswordResetRequestForm
  },
  data() {
    return {
      requestSent: false,
      isLoading: false,
      email: ''
    }
  },
  methods: {
    updateSent(email) {
      this.requestSent = true
      this.email = email
    }
  }
}
</script>

<style>

</style>