<template>
  <el-form
    :ref="`additional_traveler_${number}`"
    :model="travelerData"
    :rules="travelerRules">
    <span class="block mb-3 text-lg md:text-xl">
      {{ $lang.translate(translations, 'traveler') }} #{{ number }}
    </span>
    <div class="flex flex-wrap -mx-3">
      <div class="w-full lg:w-1/2 px-3">
        <div
          :class="{ 'has-value' : travelerData.fullname !== '' }"
          class="input-underline"
          :data-placeholder="$lang.translate(translations, 'fullname')">
          <el-form-item prop="fullname">
            <input type="text" v-model="travelerData.fullname">
          </el-form-item>
        </div>
      </div>
      <div class="w-full lg:w-1/2 px-3">
        <div
          :class="{ 'has-value' : travelerData.docNumber !== '' }"
          class="input-underline"
          :data-placeholder="$lang.translate(translations, 'doc_number')">
          <el-form-item prop="docNumber">
            <input type="text" v-model="travelerData.docNumber">
          </el-form-item>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3">
      <div class="w-full lg:w-1/2 px-3">
        <div
          :class="{ 'has-value' : travelerData.email !== '' }"
          class="input-underline"
          data-placeholder="E-mail">
          <el-form-item prop="email">
            <input type="email" v-model="travelerData.email">
          </el-form-item>
        </div>
      </div>
      <div class="w-full lg:w-1/2 px-3">
        <div
          :class="{ 'has-value' : travelerData.country !== '' }"
          class="input-underline"
          :data-placeholder="$lang.translate(translations, 'country')">
          <el-form-item prop="country">
            <el-select
              v-model="travelerData.country"
              filterable
              placeholder=""
              class="w-full">
              <el-option
                v-for="country in countries"
                :key="country.code"
                :label="country.name"
                :value="country.code">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
    </div>
  </el-form>
</template>

<script>
export default {
  props: {
    number: {
      type: Number,
      required: true
    },
    attempts: {
      type: Number,
      required: true,
      default: () => 1
    },
    defaultCountry: {
      type: String,
      required: false
    }
  },
  data() {
    const validateFullname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$lang.translate(this.translations, 'field_required')))
      } else {
        const splitted = value.split(' ')
        if(splitted.length <= 1 || splitted[splitted.length - 1].trim().length < 2) {
          callback(new Error(this.$lang.translate(this.translations, 'lastname_required')))
        } else {
          callback()
        }
      }
    }

    return {
      validateFullname,
      travelerData: {
        fullname: '',
        docNumber: '',
        email: '',
        country: this.defaultCountry ? this.defaultCountry : ''
      },
      translations: {
        'es_ES': {
          traveler: 'Viajero',
          field_required: 'Este campo es requerido',
          valid_email: 'Ingrese un e-mail válido',
          lastname_required: 'Ingrese su apellido',
          fullname: 'Nombre y Apellido',
          doc_number: 'Doc. de Identidad o Pasaporte',
          email: 'E-mail',
          country: 'País'
        },
        'en_EN': {
          traveler: 'Traveler',
          field_required: 'This field is required',
          valid_email: 'Enter a valid email',
          lastname_required: 'Enter your last name',
          fullname: 'Full Name',
          doc_number: 'ID or Passport Number',
          email: 'E-mail',
          country: 'Country'
        }
      }
    }
  },
  computed: {
    countries() {
      return this.$store.state.countries
    },
    fieldRequired() {
      return this.$lang.translate(this.translations, 'field_required')
    },
    validEmail() {
      return this.$lang.translate(this.translations, 'valid_email')
    },
    travelerRules() {
      return {
        fullname: [
          { required: true, message: this.fieldRequired, trigger: 'blur' },
          { validator: this.validateFullname, trigger: 'blur' }
        ],
        docNumber: [
          { required: true, message: this.fieldRequired, trigger: 'blur' }
        ],
        email: [
          { required: true, message: this.fieldRequired, trigger: 'blur' },
          { type: 'email', message: this.validEmail, trigger: 'blur' }
        ],
        country: [
          { required: true, message: this.fieldRequired, trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    attempts(value) {
      this.validate(`additional_traveler_${this.number}`)
    }
  },
  methods: {
    validate(formName) {
      this.$refs[formName].validate(valid => {
        this.$emit('handle-validation', valid)
      })
    }
  }
}
</script>
