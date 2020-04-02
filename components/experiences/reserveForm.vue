<template>
  <div
    v-if="experience"
    v-loading="isLoading"
    :class="{ 'reserve-form--sticky': sticky }"
    class="reserve-form bg-white p-5 shadow-xl"
  >
    <div class="reserve-form__price">
      <span class="font-light">{{ $lang.translate(translations, experience.price_type === 1 || reserveForm.quota != '' ? 'per_person' : 'from') }}</span>
      <span class="block font-light text-4xl leading-none"
        >US$ {{ reservePrice }}</span
      >
    </div>
    <el-form
      ref="reserveForm"
      :model="reserveForm"
      :rules="reserveFormRules">
      <div class="reserve-form__inline">
        <div class="w-1/3 pr-2">
          <el-form-item prop="date" class="w-full mb-0">
            <el-date-picker
              v-model="reserveForm.date"
              prefix-icon=""
              clear-icon=""
              class="border-0 input-shadow"
              type="date"
              :picker-options="datesOption"
              :placeholder="$lang.translate(translations, 'date')"
            >
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="w-1/3 pr-2">
          <el-form-item prop="quota" class="w-full mb-0">
            <el-select
              v-model="reserveForm.quota"
              class="w-full border-0 input-shadow"
              :placeholder="$lang.translate(translations, 'persons')"
            >
              <el-option
                v-for="item in groupOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="w-1/3 pl-2">
          <el-button
            class="w-full submit-btn"
            type="primary"
            @click="formSubmit('reserveForm')"
          >
            {{ $lang.translate(translations, 'book') }}
          </el-button
          >
        </div>
      </div>
      <div class="reserve-form__vertical">
        <div class="w-1/2 pr-2">
          <el-form-item prop="date" class="w-full">
            <el-date-picker
              v-model="reserveForm.date"
              :picker-options="datesOption"
              class="border-0 input-shadow"
              type="date"
              :placeholder="$lang.translate(translations, 'date')"
            >
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="w-1/2 pl-2">
          <el-form-item prop="quota" class="w-full">
            <el-select
              v-model="reserveForm.quota"
              class="w-full border-0 input-shadow"
              :placeholder="$lang.translate(translations, 'persons')"
            >
              <el-option
                v-for="item in groupOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="w-full mt-2">
          <el-button
            class="w-full submit-btn text-sm font-normal"
            type="primary"
              @click="formSubmit('reserveForm')"
          >
            {{ $lang.translate(translations, 'book') }}
          </el-button>
        </div>
      </div>
    </el-form>
    <div
      class="w-full mt-6 pt-4 border-t border-black flex items-center justify-between"
    >
      <small class="font-light">
        {{ $lang.translate(translations, 'reserve_copy') }}
      </small>
      <el-button
        type="primary"
        size="small"
        plain
        class="py-2 ml-5 text-dark"
      >
        {{ $lang.translate(translations, 'inquiry') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    sticky: {
      type: Boolean,
      required: false,
      default: () => false
    },
    show: {
      type: Boolean,
      required: false,
      default: () => false
    },
    experience: {
      type: Object,
      required: false,
      default: () => null
    }
  },
  data() {
    return {
      isLoading: false,
      reserveForm: {
        date: '',
        quota: ''
      },
      reserveFormRules: {
        date: [
          { type: 'date', required: true, message: 'required', trigger: 'change' }
        ],
        quota: [
          { required: true, message: 'required', trigger: 'change' }
        ]
      },
      datesOption: {
        disabledDate: time => {
          return !this.availableDays.includes(time.getDay());
        }
      },
      translations: {
        'es_ES': {
          from: 'Desde',
          per_person: 'Por persona',
          date: 'Fecha',
          persons: 'Personas',
          book: 'Reservar',
          reserve_copy: 'Personaliza tu experiencia: día, hora, tamaño de grupo, preferencias, y más.',
          inquiry: 'Consulta'
        },
        'en_EN': {
          from: 'From',
          per_person: 'Per person',
          date: 'Date',
          persons: 'Group Size',
          book: 'Book',
          reserve_copy: 'Customize your experience: day, time, group size, preferences, and more.',
          inquiry: 'Inquire'
        }
      }
    };
  },
  computed: {
    groupOptions () {
      if (!this.experience) return []

      const groups = []
      for (
        let i = this.experience.min_quota;
        i <= this.experience.max_quota;
        i++
      ) {
        groups.push({
          label: `${i} ${i === 1 ? "persona" : "personas"}`,
          value: i
        })
      }

      return groups
    },
    reservePrice () {
      if(!this.experience) return null
      if(this.experience.price_type === 1) return this.experience.normal_price
      if(this.reserveForm.quota === '') return this.experience.min_price
      
      const possiblePrices = this.experience.group_prices
        .filter((item) => {
          return item.length >= this.reserveForm.quota
        })
        .sort((a,b) => {
          a.length-b.length
        })
      
      return parseInt(possiblePrices[0].price).toFixed(2)
    },
    availableDays () {
      if (!this.experience) return null

      const availableDays = []
      this.experience.schedules.forEach(item => {
        item.days.forEach(day => {
          if (!availableDays.includes(day)) {
            availableDays.push(day)
          }
        })
      })

      return availableDays
    }
  },
  methods: {
    ...mapMutations({
      setAuthDialogVisible: 'SET_AUTH_DIALOG_VISIBLE'
    }),
    formSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if(valid) {
          this.isLoading = true
          setTimeout(() => {
            this.isLoading = false
            if(!this.$auth.loggedIn) {
              this.setAuthDialogVisible(true)
            } else {
              alert('Procede a checkout')
            }
          }, 2000);
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  padding-top: 1.25rem;
}

.reserve-form {
  width: 100%;
  max-width: 23.5rem;
  margin-left: auto;

  &--sticky {
    .el-form {
      padding-top: 0;
    }

    .reserve-form__price {
      flex-direction: row;

      span:first-child {
        margin-right: 2rem;
      }
    }

    .reserve-form__inline {
      display: flex;
    }

    .reserve-form__vertical {
      display: none;
    }
  }

  &__price {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.2rem;
  }

  &__inline {
    display: none;
    flex-wrap: wrap;
  }

  &__vertical {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
