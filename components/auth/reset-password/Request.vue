<template>
  <div>
    <EmailSent v-if="requestSent" />
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
      isLoading: false
    }
  },
  methods: {
    updateSent() {
      this.requestSent = true
    }
  }
}
</script>

<style>

</style>