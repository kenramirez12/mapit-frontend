
<template>
  <el-form
    ref="contactForm"
    :model="formData"
    :rules="rules"
    :disabled="isLoading">
    <div class="flex flex-wrap -mx-2">
      <div class="w-full px-2">
        <el-form-item prop="name">
          <el-input
            v-model="formData.name"
            :placeholder="$lang.translate(translations, 'name')"
            class="border-0 shadow-input" />
        </el-form-item>
      </div>
    </div>
    <div class="flex flex-wrap -mx-2">
      <div class="w-1/2 px-2">
        <el-form-item prop="category">
          <el-select
            v-model="formData.category"
            :placeholder="$lang.translate(translations, 'category')"
            class="border-0 shadow-input w-full">
            <template v-if="categories && categories.length > 0">
              <el-option
                v-for="category in categories"
                :key="category.id"
                :value="$lang.apiTranslate(category.translations, 'name')">
              </el-option>
            </template>
            <el-option value="Other category" />
          </el-select>
        </el-form-item>
      </div>
      <div class="w-1/2 px-2">
        <el-form-item prop="city">
          <el-input
            v-model="formData.city"
            :placeholder="$lang.translate(translations, 'city')"
            class="border-0 shadow-input" />
        </el-form-item>
      </div>
    </div>
    <div class="flex flex-wrap -mx-2">
      <div class="w-1/2 px-2">
        <el-form-item prop="phone">
          <el-input v-model="formData.phone" placeholder="PHONE" class="border-0 shadow-input" />
        </el-form-item>
      </div>
      <div class="w-1/2 px-2">
        <el-form-item prop="email">
          <el-input
            v-model="formData.email"
            :placeholder="$lang.translate(translations, 'email')"
            class="border-0 shadow-input" />
        </el-form-item>
      </div>
    </div>
    <div class="flex flex-wrap -mx-2">
      <div class="w-full px-2">
        <el-form-item prop="message">
          <el-input
            v-model="formData.message"
            type="textarea"
            :rows="4"
            :placeholder="$lang.translate(translations, 'message')"
            class="border-0 shadow-input" />
        </el-form-item>
      </div>
    </div>
    <el-button
      @click="handleSubmit('contactForm')"
      v-loading="isLoading"
      type="primary">
      <div class="flex items-center">
        {{ $lang.translate(translations, 'send') }}
        <img src="/images/contact/right-arrow.svg" class="ml-3">
      </div>
    </el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      formData: {
        name: '',
        category: '',
        city: '',
        phone: '',
        email: '',
        message: ''
      },
      translations: {
        es_ES: {
          name: 'NOMBRE',
          category: 'TIPO DE EXPERIENCIA',
          other_category: 'OTRA CATEGORÍA',
          city: 'CIUDAD',
          phone: 'TELÉFONO',
          email: 'E-MAIL',
          message: 'MENSAJE',
          send: 'ENVIAR',
          required_field: 'Campo requerido',
          valid_email: 'Ingrese un email válido',
          send_error: 'No pudimos enviar tu información. Por favor inténtelo nuevamente.'
        },
        en_EN: {
          name: 'NAME',
          category: 'TYPE OF EXPERIENCE',
          other_category: 'OTHER CATEGORY',
          city: 'CITY',
          phone: 'PHONE',
          email: 'CORREO ELECTRÓNICO',
          message: 'TELL US',
          send: 'SEND',
          required_field: 'Required field',
          valid_email: 'Enter a valid email',
          send_error: 'No pudimos enviar tu información. Por favor inténtelo nuevamente.'
        }
      }
    }
  },
  computed: {
    rules() {
      return {
        name: [
          { required: true, message: this.$lang.translate(this.translations, 'required_field'), trigger: 'blur' }
        ],
        category: [
          { required: true, message: this.$lang.translate(this.translations, 'required_field'), trigger: 'change' }
        ],
        city: [
          { required: true, message: this.$lang.translate(this.translations, 'required_field'), trigger: 'blur' }
        ],
        phone: [
          { required: true, message: this.$lang.translate(this.translations, 'required_field'), trigger: 'blur' }
        ],
        email: [
          { required: true, message: this.$lang.translate(this.translations, 'required_field'), trigger: 'blur' },
          { type: 'email', message: this.$lang.translate(this.translations, 'valid_email'), trigger: 'blur' },
        ],
        message: [
          { required: true, message: this.$lang.translate(this.translations, 'required_field'), trigger: 'blur' }
        ]
      }
    },
    categories() {
      return this.$store.state.categories.categories
    }
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if(valid) {
          sendForm()
        }
      })
    },
    async sendForm() {
      this.isLoading = true

      try {
        const resp = await this.$axios.post('/contact/host')
        this.isLoading = false
      } catch (error) {
        this.$message.error(this.$lang.translate(translations, 'send_error'))
        this.isLoading = false
      }
    }
  }
}
</script>

<style>

</style>