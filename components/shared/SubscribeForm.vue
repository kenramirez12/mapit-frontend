<template>
  <div class="subscribe-modal__form">
    <el-form
      ref="subscribeForm"
      :model="subscribeForm"
      :rules="subscribeFormRules">
      <el-form-item prop="fullname">
        <el-input
          v-model="subscribeForm.fullname"
          class="shadow-input"
          placeholder="FULLNAME"
        />
      </el-form-item>
      <el-form-item prop="email">
        <el-input
          v-model="subscribeForm.email"
          class="shadow-input"
          placeholder="EMAIL"
        />
      </el-form-item>
      <el-button
        @click="subscribe"
        class="w-full"
        type="white">
        I WANT THE GUIDE!
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      subscribeForm: {
        fullname: '',
        email: ''
      },
      subscribeFormRules: {
        fullname: [{ required: true, message: 'Campo requerido', trigger: 'blur' }],
        email: [{ type: 'email', required: true, message: 'Campo requerido', trigger: 'blur' }]
      }
    }
  },
  methods: {
    subscribe () {
      this.$refs.subscribeForm.validate ((valid) => {
        if (valid) {
          alert('procede papu')
        } else {
          alert('no pasa nada papu')
        }
      })
    }
  }
}
</script>

<style>

</style>
