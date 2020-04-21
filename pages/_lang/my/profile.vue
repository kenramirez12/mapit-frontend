<template>
  <div v-loading="isLoading" class="flex flex-col">
    <div class="container mx-auto py-8 inline-block">
      <div class="w-full flex items-center justify-between mb-8 md:mb-10 mt-6">
        <h3 class="text-4xl font-light">
          {{ $lang.translate(translations, 'profile') }}
        </h3>
        <a
          href="#"
          @click.prevent="isEditing = true"
          class="link-underline text-xl">
          <span>{{ $lang.translate(translations, 'edit') }}</span>
          <img src="/images/edit-icon.svg" class="ml-4">
        </a>
      </div>
      <div v-if="user" class="flex flex-wrap">
        <div class="w-1/3 flex">
          <div class="ml-auto flex flex-col">
            <el-upload
              v-loading="avatarLoading"
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-change="avatarUpload">
              <img v-if="userAvatar" :src="userAvatar" class="avatar">
              <i class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <el-button
              v-if="avatarChanged"
              type="primary"
              size="small"
              class="mx-auto mt-2"
              @click="updateAvatar">
              {{ $lang.translate(translations, 'save') }}
            </el-button>
            <a
              v-if="avatarChanged"
              href="#"
              @click.prevent="clearAvatarChanged"
              class="link-underline block mt-2 mx-auto text-sm">
              <span>{{ $lang.translate(translations, 'cancel') }}</span>
            </a>
          </div>
        </div>
        <div class="w-1/4 mx-auto">
          <el-form ref="profileForm" :model="formData" :rules="formRules">
            <div
              v-if="isEditing"
              :class="{ 'has-value' : formData.fullname !== '' }"
              class="input-underline"
              :data-placeholder="$lang.translate(translations, 'fullname')">
              <el-form-item prop="fullname" class="mb-8">
                <el-input v-model="formData.fullname" />
              </el-form-item>
            </div>
            <div v-else class="el-form-item mb-8">
              <span class="font-light">
                {{ user.fullname }}
              </span>
            </div>
            
            <div
              v-if="isEditing"
              :class="{ 'has-value' : formData.country !== '' }"
              class="input-underline"
              :data-placeholder="$lang.translate(translations, 'country')">
              <el-form-item prop="country" class="mb-8">
                <el-select
                  v-model="formData.country"
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
            <div v-else class="el-form-item mb-8">
              <span v-if="user.country" class="font-light">
                {{ currentCountry }}
              </span>
              <span v-else class="font-light text-gray-500">
                {{ $lang.translate(translations, 'missing_country') }}
              </span>
            </div>
            <div
               v-if="isEditing"
              :class="{ 'has-value' : formData.email !== '' }"
              class="input-underline mb-0"
              :data-placeholder="'Email'">
              <el-form-item prop="email" class="mb-8">
                <el-input v-model="formData.email" :disabled="true" />
              </el-form-item>
            </div>
            <div v-else class="el-form-item mb-8">
              <span class="font-light">
                {{ user.email }}
              </span>
            </div>
            <div v-if="isEditing" class="input-underline mb-0">
              <el-form-item prop="phone" class="custom-input-phone mb-8">
                <VuePhoneNumberInput
                  v-model="formData.phone"
                  @update="setPhoneData"
                  :default-country-code="defaultCountryCode"
                  :translations="{
                    countrySelectorLabel: $lang.translate(translations, 'code'),
                    phoneNumberLabel: $lang.translate(translations, 'phone'),
                    example: $lang.translate(translations, 'example')
                  }"
                />
              </el-form-item>
            </div>
            <div v-else class="el-form-item mb-8">
              <span v-if="user.phone" class="font-light">
                {{ user.phone.formatInternational }}
              </span>
              <span v-else class="font-light text-gray-500">
                {{ $lang.translate(translations, 'missing_phone') }}
              </span>
            </div>
            <div v-if="isEditing" class="mt-8">
              <el-button type="primary" @click="handleSubmit">
                {{ $lang.translate(translations, 'save') }}
              </el-button>
              <el-button @click="cancelEditing">
                {{ $lang.translate(translations, 'cancel') }}
              </el-button>
            </div>
            <div v-else class="block relative">
              <img src="/images/social-points-icon.svg" class="social-points-icon">
              <span class="font-light">
                {{ $lang.translate(translations, 'social_points') }}
              </span>
              <span class="block text-5xl">
                {{ user.social_points }} pt
              </span>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const validatePhone = (rule, value, callback) => {
      if(value === '' || this.phoneData.isValid) {
        callback()
      } else {
        callback(new Error(this.$lang.translate(this.translations, 'invalid_number')))
      }
    }

    return {
      validatePhone,
      phoneData: '',
      avatarChanged: false,
      isLoading: false,
      avatarLoading: false,
      isEditing: false,
      avatar: '',
      translations: {
        es_ES: {
          profile: 'Perfil',
          edit: 'Editar Perfil',
          save: 'Guardar',
          cancel: 'Cancelar',
          fullname: 'Nombre y Apellido',
          country: 'País',
          code: 'Código',
          phone: 'Celular',
          example: 'Ejemplo',
          social_points: 'Puntos sociales',
          required_field: 'Campo requerido',
          invalid_number: 'Ingrese un número válido',
          missing_phone: 'Teléfono no especificado',
          missing_country: 'País no especificado'
        },
        en_EN: {
          profile: 'Profile',
          edit: 'Edit Profile',
          save: 'Save',
          cancel: 'Cancel',
          fullname: 'Full Name',
          country: 'Country',
          code: 'Code',
          phone: 'Phone',
          example: 'i.e.',
          social_points: 'Social Points',
          required_field: 'Required field',
          invalid_number: 'Enter a valid number',
          missing_phone: 'Country: missing information',
          missing_country: 'Phone: missing information'
        }
      },
      formData: {
        fullname: this.$auth.$state.user ? this.$auth.$state.user.fullname : '',
        country: this.$auth.$state.user ? this.$auth.$state.user.country : '',
        email: this.$auth.$state.user ? this.$auth.$state.user.email : '',
        phone: this.$auth.$state.user && this.$auth.$state.user.phone && 'nationalNumber' in this.$auth.$state.user.phone ? this.$auth.$state.user.phone.nationalNumber : ''
      }
    }
  },
  computed: {
    formRules() {
      return {
        fullname: [
          { required: true, message: this.$lang.translate(this.translations, 'required_field'), trigger: 'blur' }
        ],
        phone: [
          { validator: this.validatePhone, trigger: 'blur' }
        ]
      }
    },
    countries() {
      return this.$store.state.countries
    },
    user() {
      return this.$auth.$state.user
    },
    userAvatar() {
      if(this.avatar != '') {
        return this.avatar
      } else if(this.user.avatar !== null) {
        return this.$imagePath(this.user.avatar.path)
      } else if(this.user.avatar_url) {
        return this.user.avatar_url
      } else {
        return ''
      }
    },
    currentCountry() {
      if(this.user.country && this.user.country !== '') {
        const current = this.countries.find(item => item.code === this.user.country)
        return current ? current.name : ''
      }

      return ''
    },
    defaultCountryCode() {
      if(!this.user) return this.formData.country
      if(
        this.user.phone &&
        this.user.phone.counstructor === Object &&
        'countryCode' in this.user.phone) {
        return this.user.phone.countryCode
      } else {
        return this.formData.country
      }
    }
  },
  watch: {
    user(value) {
      if(value) {
        this.formData.fullname = value.fullname
        this.formData.country = value.country
        this.formData.fullname = value.fullname
        this.formData.fullname = value.fullname
      }
    }
  },
  methods: {
    async updateAvatar() {
      if(this.avatar === '') return null
      this.isLoading = true
      try {
        const resp = await this.$axios.put('/user/avatar', { avatar: this.avatar })
        await this.$auth.fetchUser()
        this.isEditing = false
        this.isLoading = false
        this.avatarChanged = false
        this.avatar = ''
      } catch (error) {
        console.error(error.response)
        this.$message.error('No pudimos actualizar tu foto de perfil, inténtealo nuevamente un unos minutos.')
        this.isEditing = false
        this.isLoading = false
      }
    },
    setPhoneData(callback) {
      this.phoneData = callback
    },
    async updateProfile(data) {
      this.isLoading = true
      try {
        const resp = await this.$axios.put('/user', data)
        await this.$auth.fetchUser()
        this.isEditing = false
        this.isLoading = false
      } catch (error) {
        console.error(error.response)
        this.$message.error('No pudimos actualizar la información de tu perfil.')
        this.isEditing = false
        this.isLoading = false
      }
    },
    handleSubmit() {
      this.$refs.profileForm.validate(valid => {
        if(valid) {
          const data = {
            fullname: this.formData.fullname,
            country: this.formData.country,
            phone: this.formData.phone !== '' ? this.phoneData : ''
          }

          this.updateProfile(data)
        }
      })
    },
    cancelEditing() {
      this.formData.fullname = this.$auth.$state.user.fullname
      this.formData.country = this.$auth.$state.user.country
      this.formData.email = this.$auth.$state.user.email
      this.formData.phone = this.$auth.$state.user.phone && 'nationalNumber' in this.$auth.$state.user.phone ? this.$auth.$state.user.phone.nationalNumber : ''
      this.isEditing = false
      this.avatarChanged = false
      this.avatar = ''
    },
    clearAvatarChanged() {
      this.avatarChanged = false,
      this.avatar = ''
    },
    avatarUpload(file) {
      this.avatarLoading = true

      this.imageToBase64(file.raw)
        .then(resp => {
          this.avatar = resp
          this.avatarLoading = false
          this.avatarChanged = true
        })
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('La imagen debe estar en formato JPG!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('La imagen excede los 2MB!');
      // }
      // return isJPG && isLt2M;
    }
  }
}
</script>

<style>
  .el-input.is-disabled .el-input__inner {
    background: transparent!important;
  }
</style>

<style lang="scss" scoped>
  .social-points-icon {
    width: 60px;
    position: absolute;
    top: 10px;
    left: -90px;
  }
  .avatar-uploader {
    position: relative;
    
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    
    .el-upload:hover {
      border-color: #409EFF;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    border-radius: 50%;
    background-color: #efefef;
    transition: all 0.2s;

    &:hover {
      opacity: .8;
    }
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
    border-radius: 50%;
    object-fit: cover;
    position: absolute;
    transition: all .3s;

    &:hover {
      opacity: .1;
    }
  }
</style>