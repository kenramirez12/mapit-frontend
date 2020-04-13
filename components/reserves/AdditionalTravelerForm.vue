<template>
  <el-form
    :ref="`additional_traveler_${number}`"
    :model="travelerData"
    :rules="travelerRules">
    <span class="block mb-3 text-xl">{{ number }}. Viajero</span>
    <div class="flex -mx-3">
      <div class="w-1/2 px-3">
        <div
          :class="{ 'has-value' : travelerData.fullname !== '' }"
          class="input-underline"
          data-placeholder="Nombres y Apellidos">
          <el-form-item prop="fullname">
            <input type="text" v-model="travelerData.fullname">
          </el-form-item>
        </div>
      </div>
      <div class="w-1/2 px-3">
        <div
          :class="{ 'has-value' : travelerData.docNumber !== '' }"
          class="input-underline"
          data-placeholder="Doc. de Identidad o Pasaporte">
          <el-form-item prop="docNumber">
            <input type="text" v-model="travelerData.docNumber">
          </el-form-item>
        </div>
      </div>
    </div>
    <div class="flex -mx-3">
      <div class="w-1/2 px-3">
        <div
          :class="{ 'has-value' : travelerData.email !== '' }"
          class="input-underline"
          data-placeholder="E-mail">
          <el-form-item prop="email">
            <input type="email" v-model="travelerData.email">
          </el-form-item>
        </div>
      </div>
      <div class="w-1/2 px-3">
        <div
          :class="{ 'has-value' : travelerData.country !== '' }"
          class="input-underline"
          data-placeholder="País">
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
        callback(new Error('Este campo es requerido'))
      } else {
        const splitted = value.split(' ')
        if(splitted.length <= 1 || splitted[splitted.length - 1].trim().length < 2) {
          callback(new Error('Ingrese su apellido'))
        } else {
          callback()
        }
      }
    }

    return {
      travelerData: {
        fullname: '',
        docNumber: '',
        email: '',
        country: this.defaultCountry ? this.defaultCountry : ''
      },
      travelerRules: {
        fullname: [
          { required: true, message: 'Este campo es requerido', trigger: 'blur' },
          { validator: validateFullname, trigger: 'blur' }
        ],
        docNumber: [
          { required: true, message: 'Este campo es requerido', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Este campo es requerido', trigger: 'blur' },
          { type: 'email', message: 'Ingrese un e-mail válido', trigger: 'blur' }
        ],
        country: [
          { required: true, message: 'Este campo es requerido', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    countries() {
      return this.$store.state.countries
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
