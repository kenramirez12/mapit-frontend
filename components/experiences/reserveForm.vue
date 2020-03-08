<template>
  <div
    :class="{ 'reserve-form--sticky' : sticky }"
    class="reserve-form bg-white p-5 shadow-xl">
      <div class="reserve-form__price">
        <span class="font-light">Desde</span>
        <span class="block font-light text-3xl leading-none">US$ 80.00</span>
      </div>
      <el-form>
        <div class="reserve-form__inline">
          <div class="w-1/3 pr-2">
            <el-form-item class="w-full mb-0">
              <el-date-picker
                v-model="value1"
                prefix-icon=""
                clear-icon=""
                class="border-0 input-shadow"
                type="date"
                placeholder="Fecha">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="w-1/3">
            <el-select
              v-model="value"
              class="w-full border-0 input-shadow"
              placeholder="Personas">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="w-1/3 pl-2">
            <el-button class="w-full submit-btn" type="primary">Reservar</el-button>
          </div>
        </div>
        <div class="reserve-form__vertical">
          <div class="w-1/2 pr-2">
            <el-form-item class="w-full">
              <el-date-picker
                v-model="value1"
                class="border-0 input-shadow"
                type="date"
                placeholder="Fecha">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="w-1/2 pl-2">
            <el-select
              v-model="value"
              class="w-full border-0 input-shadow"
              placeholder="Personas">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="w-full mt-2">
            <el-button class="w-full submit-btn" type="primary">Reservar</el-button>
          </div>
          <div class="w-full mt-6 pt-4 border-t border-black flex items-center justify-between">
            <small class="font-light">Personaliza tu experiencia: día, hora, tamaño de grupo, preferencias, y más.</small>
            <el-button
              type="primary"
              size="small"
              plain
              class="py-2 ml-5 text-dark">
              Consulta
            </el-button>
          </div>
        </div>
      </el-form>
  </div>
 </template>
 
 <script>
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
     }
   },
   data() {
    return {
      value1: '',
      value: '',
      options: [
        {label: '1 persona', value: '1 persona' },
        {label: '2 personas', value: '2 personas' },
        {label: '3 personas', value: '3 personas' }
      ]
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

  .submit-btn {
    transition: all 0.3s;
    box-shadow: 0px 0px 20px #37D7D7;

    &:hover {
      box-shadow: 0px 0px 10px #37D7D7;
    }
  }

  .input-shadow {
    transition: all 0.3s;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  
    &:hover {
      box-shadow: 0 0 5px rgba(0, 0, 0, .15);
    }
  }
</style>