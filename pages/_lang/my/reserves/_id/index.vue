<template>
  <div v-if="reserve && reserve.status === 2">
    <div class="reserve-header" :style="`background-image:url(${$imagePath(reserve.experience.banner_image.path)})`">
      <div class="container flex items-center px-4 m-auto">
        <div class="block mr-3">
          <el-button
            circle
            icon="el-icon-arrow-left"
            @click="$router.push(`/${$lang.current().slug}/my/reserves`)" />
        </div>
        <h1 class="text-white text-3xl">
          {{ $lang.apiTranslate(reserve.experience.translations, 'title') }}
        </h1>
      </div>
    </div>
    <div class="container py-12 px-4 mx-auto">
      <div class="flex flex-wrap">
        <div class="w-4/6 pr-16">
          <div class="flex flex-wrap">
            <div class="w-1/2 font-light">
              <span class="block">{{ $lang.translate(translations, 'starting_time') }}</span>
              <span class="block">15:00</span>
              <span class="block">Lun. 26 ago.</span>
            </div>
            <div class="w-1/2 font-light">
              <span class="block">{{ $lang.translate(translations, 'ending_time') }}</span>
              <span class="block">15:00</span>
              <span class="block">Lun. 26 ago.</span>
            </div>
          </div>

          <hr class="my-3">

          <div class="flex flex-wrap mb-6">
            <div class="w-1/2 font-light">
              <p v-if="reserve.experience.host !== ''" class="font-light mb-0">
                <span class="block">Wiser</span>
                {{ $lang.apiTranslate(reserve.experience.host.translations, 'fullname') }}
              </p>
            </div>
            <div class="w-1/2 font-light">
              <span class="block">{{ $lang.translate(translations, 'language') }}</span>
              <span>{{ $lang.apiTranslate(reserve.experience.translations, 'languages') }}</span>
            </div>
          </div>
          <div class="flex flex-wrap">
            <div class="w-1/2 font-light">
              <p v-if="reserve.group_size > 1">
                <span class="block">{{ $lang.translate(translations, 'group_size') }}</span>
                <span class="font-light">
                  {{ reserveGroupSize }}
                </span>
              </p>
            </div>
            <div class="w-1/2 font-light">
              <span class="block">{{ $lang.translate(translations, 'additionals') }}</span>
              <span>{{ $lang.apiTranslate(reserve.experience.translations, 'carry').join(', ') }}</span>
            </div>
          </div>
          <hr class="my-3">
          <div class="flex flex-wrap mb-6">
            <div class="w-1/2 font-light">
              <span class="block">{{ $lang.translate(translations, 'destination') }}</span>
              <span>{{ reserve.experience.destination.name }}</span>
            </div>
            <div class="w-1/2 font-light">
              <span class="block">{{ $lang.translate(translations, 'booking_code') }}</span>
              <span>{{ reserve.code }}</span>
            </div>
          </div>
          <div class="flex flex-wrap font-light mb-6">
            <div class="w-1/2">
              <span class="block">{{ $lang.translate(translations, 'meeting_point') }}</span>
              <span>{{ $lang.apiTranslate(reserve.experience.translations, 'meeting_place') }}</span>
            </div>
            <div class="w-1/2">
              <span class="block">{{ $lang.translate(translations, 'price') }}</span>
              <span>$140.00</span>
            </div>
          </div>
          <hr class="my-3">
          <div class="w-full">
            <p class="font-light">
              <span class="block">{{ $lang.translate(translations, 'bring') }}</span>
              <span>Traductor</span>
            </p>
          </div>
        </div>
        <div class="w-2/6">
          <el-button icon="el-icon-download">
            {{ $lang.translate(translations, 'download_details') }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ app, params, store, error }) {  
    try {
      const resp = await app.$axios.$get('/reserves/' + params.id)
      const reserve = resp.reserve

      return {
        reserve
      }
    } catch (error) {
      console.error('error', error.response)
    }
  },
  data() {
    return {
      translations: {
        'es_ES': {
          starting_time: 'Hora de inicio',
          ending_time: 'Hora de finalización',
          group_size: 'Tamaño de grupo',
          destination: 'Destino',
          booking_code: 'Código de reserva',
          bring: '¿Qué llevar?',
          price: 'Precio final',
          meeting_point: 'Punto de encuentro',
          language: 'Idioma',
          additionals: 'Servicios adicionales',
          download_details: 'Guardar detalles de la reserva',
          you: 'Tú',
          traveler_you: 'Un viajero y tú',
          travelers_you: 'viajeros y tú'
        },
        'en_EN': {
          starting_time: 'Starting time',
          ending_time: 'Ending time',
          group_size: 'Group size',
          destination: 'Destination',
          booking_code: 'Booking code',
          bring: 'What to bring?',
          price: 'Price',
          meeting_point: 'Meeting point',
          language: 'Language',
          additionals: 'Additional services',
          download_details: 'Download booking details',
          you: 'You',
          traveler_you: 'A traveler and you',
          travelers_you: 'travelers and you'
        }
      }
    }
  },
  computed: {
    reserveGroupSize() {
      if(this.reserve.group_size === 1) {
        return this.$lang.translate(this.translations, 'you')
      } else if(this.reserve.group_size === 2) {
        return this.$lang.translate(this.translations, 'traveler_you')
      } else {
        return `${this.reserve.group_size - 1} ${this.$lang.translate(this.translations, 'travelers_you')}`
      }
    }
  },
  mounted() {
    if(this.reserve && this.reserve.status === 1) {
      return this.$router.push(`/${this.$lang.current().slug}/my/reserves/${this.reserve.code}/travelers-info`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .reserve-header {
    display: flex;
    background-size: cover;
    background-position: center;
    height: 230px;
  }
</style>
