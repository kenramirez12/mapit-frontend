<template>
  <div class="container px-5 mx-auto py-12 flex">
    <div
      v-loading="isLoading"
      class="flex flex-wrap my-auto w-full">
      <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
        <NewPasswordForm
          :email="formData.email"
          :token="formData.token" />
      </div>
    </div>
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
      isLoading: true,
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
      this.isLoading = true
      try {
        const resp = await this.$axios.get(`/password/find/${token}`)
        this.formData.token = resp.data.token
        this.formData.email = resp.data.email
        this.isLoading = false
      } catch (error) {
        this.$log.error('validateToken', error, error.response)
        this.$message.error(error.response.data.message)
        return this.$router.push(`/${this.$lang.current().slug}/login`)
        this.isLoading = false
      }
    }
  }
}
</script>

<style>

</style>