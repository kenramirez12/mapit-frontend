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
          :placeholder="$lang.translate(translations, 'fullname')"
        />
      </el-form-item>
      <el-form-item prop="email">
        <el-input
          v-model="subscribeForm.email"
          class="shadow-input"
          :placeholder="$lang.translate(translations, 'email')"
        />
      </el-form-item>
      <el-button
        @click="trySubscribe"
        class="w-full"
        type="white">
        {{ $lang.translate(translations, 'btn') }}
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      translations: {
        'es_ES': {
          fullname: 'NOMBRE',
          email: 'EMAIL',
          btn: '¡QUIERO LA GUÍA!',
          required_field: 'Campo requerido',
          success_msg: '¡Ya lo tenemos! Lo estarás recibiendo pronto en tu correo electrónico.',
          error_msg: 'Algo salió mal, por favor inténtalo nuevamente.'
        },
        'en_EN': {
          fullname: 'FULLNAME',
          email: 'EMAIL',
          btn: 'I WANT THE GUIDE!',
          required_field: 'Required field',
          success_msg: 'We got it ! You will be receiving it shortly on your email address.',
          error_msg: 'Something went wrong, please try again.'
        }
      },
      subscribeForm: {
        fullname: '',
        email: ''
      }
    }
  },
  computed: {
    subscribeFormRules () {
      return {
        fullname: [
          { required: true, message: this.$lang.translate(this.translations, 'required_field'), trigger: 'blur' }
        ],
        email: [
          { type: 'email', required: true, message: this.$lang.translate(this.translations, 'required_field'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async subscribe () {
      try {
        const resp = await this.$axios.post('/subscribe-modal', this.subscribeForm)
        this.$message.success(this.$lang.translate(this.translations, 'success_msg'))
        this.$emit('closeSubscribeModal')
        this.$emit('updateLoading', false)
      } catch (error) {
        this.$message.error(this.$lang.translate(this.translations, 'error_msg'))
        this.$emit('updateLoading', false)
      }
    },
    trySubscribe () {
      this.$refs.subscribeForm.validate ((valid) => {
        if (valid) {
          this.$emit('updateLoading', true)
          this.subscribe()
        }
      })
    }
  }
}
</script>

<style>

</style>
