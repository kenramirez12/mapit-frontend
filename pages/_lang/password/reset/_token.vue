<template>
  <div>
    <NewPasswordForm
      :email="formData.email"
      :token="formData.token" />
  </div>
</template>

<script>
import NewPasswordForm from '@/components/auth/reset-password/NewPasswordForm'

export default {
  middleware: 'guest',
  components: {
    NewPasswordForm
  },
  data() {
    return {
      formData: {
        token: '',
        email: ''
      }
    }
  },
  mounted() {
    if(!this.$route.params.token) {
      return this.$router.push(`/${this.$lang.current().slug}/login`)
    } else {
      this.validateToken(this.$route.params.token)
    }
  },
  methods: {
    async validateToken(token) {
      try {
        const resp = await this.$axios.get(`/password/find/${token}`)
        console.log(resp)
        this.formData.token = resp.data.token
        this.formData.email = resp.data.email
      } catch (error) {
        this.$log.error('validateToken', error, error.response)
        this.$message.error(error.response.data.message)
        return this.$router.push(`/${this.$lang.current().slug}/login`)
      }
    }
  }
}
</script>

<style>

</style>