<template>
  <div class="container px-5 mx-auto py-12 flex">
    <div class="flex flex-wrap my-auto w-full">
      <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
        <RequestResetPassword />
      </div>
    </div>
  </div>
</template>

<script>
import RequestResetPassword from '@/components/auth/reset-password/Request'

export default {
  middleware: 'guest',
  components: {
    RequestResetPassword
  }
}
</script>

<style>

</style>