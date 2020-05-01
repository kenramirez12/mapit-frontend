<template>
  <div v-if="reserve && reserve.status === 2">
    <ReserveHeader :experience="reserve.experience" />
    <div class="container py-8 md:py-12 px-4 mx-auto">
      <div class="flex flex-wrap">
        <div class="w-full md:w-2/6 md:order-2">
          <el-button
            @click="handleDownload()"
            icon="el-icon-download"
            size="small"
            class="md:hidden mb-8">
            {{ $lang.translate(translations, 'download_details') }}
          </el-button>
          <el-button
            @click="handleDownload()"
            icon="el-icon-download"
            class="hidden md:inline-block">
            {{ $lang.translate(translations, 'download_details') }}
          </el-button>
        </div>
        <div id="reserve-details" class="w-full md:w-4/6 md:pr-16 md:order-1">
          <div class="flex flex-wrap">
            <div class="w-full md:w-1/2 mb-6 md:mb-0 font-light">
              <span class="block">{{ $lang.translate(translations, 'starting_time') }}</span>
              <span class="block">{{ reserve.time }}</span>
              <span class="block">
                {{ $moment(reserve.date, 'YYYY-MM-DD').locale('es').format('ddd. DD MMM') }}
              </span>
            </div>
            <div class="w-full md:w-1/2 font-light">
              <span class="block">{{ $lang.translate(translations, 'ending_time') }}</span>
              <span class="block">
                {{ $moment(reserve.time, 'HH:mm').add(duration, 'hours').format('HH:mm') }}<br>
              </span>
              <span class="block">
                {{ $moment(reserve.date, 'YYYY-MM-DD').locale('es').format('ddd. DD MMM') }}
              </span>
            </div>
          </div>

          <hr class="my-3">

          <div class="flex flex-wrap mb-6">
            <div v-if="reserve.experience.host !== ''" class="w-full md:w-1/2 font-light mb-6">
              <p class="font-light mb-0">
                <span class="block">Wiser</span>
                {{ $lang.apiTranslate(reserve.experience.host.translations, 'fullname') }}
              </p>
            </div>
            <div class="w-full md:w-1/2 font-light mb-6">
              <span class="block">{{ $lang.translate(translations, 'language') }}</span>
              <span>{{ $lang.apiTranslate(reserve.experience.translations, 'languages') }}</span>
            </div>
            <div class="w-full md:w-1/2 font-light">
              <p>
                <span class="block" v-if="isOnline">{{ $lang.translate(translations, 'number_devices') }}</span>
                <span class="block" v-else>{{ $lang.translate(translations, 'group_size') }}</span>
                <span class="font-light">
                  {{ reserveGroupSize }}
                </span>
              </p>
            </div>
            <div v-if="reserveExtras" class="w-1/2 font-light mb-6">
              <span class="block">{{ $lang.translate(translations, 'additionals') }}</span>
              <span>{{ reserveExtras }}</span>
            </div>
          </div>
          <hr class="-mt-3 mb-3">
          <div class="flex flex-wrap mb-6">
            <div class="w-full md:w-1/2 font-light mb-6 md:mb-0">
              <span class="block">{{ $lang.translate(translations, 'destination') }}</span>
              <span>{{ reserve.experience.destination.name }}</span>
            </div>
            <div class="w-full md:w-1/2 font-light">
              <span class="block">{{ $lang.translate(translations, 'booking_code') }}</span>
              <span>{{ reserve.code.toUpperCase() }}</span>
            </div>
          </div>
          <div class="flex flex-wrap font-light mb-6">
            <div class="w-full md:w-1/2 mb-6 md:mb-0">
              <span class="block">{{ $lang.translate(translations, 'meeting_point') }}</span>
              <span>{{ $lang.apiTranslate(reserve.experience.translations, 'meeting_place') }}</span>
            </div>
            <div class="w-full md:w-1/2">
              <span class="block">{{ $lang.translate(translations, 'price') }}</span>
              <span>${{ reserve.payment.amount }}</span>
            </div>
          </div>
          <hr class="my-3">
          <div class="w-full">
            <p class="font-light">
              <span class="block">{{ $lang.translate(translations, 'bring') }}</span>
              <span>{{ $lang.apiTranslate(reserve.experience.translations, 'carry').join(', ') }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReserveHeader from '@/components/reserves/ReserveHeader'

export default {
  middleware: 'auth',
  async asyncData({ app, params, store, error }) {  
    try {
      const resp = await app.$axios.$get('/reserves/' + params.id)
      const reserve = resp.reserve

      return {
        reserve
      }
    } catch (error) {
      this.$log.error('error', error.response)
    }
  },
  components: {
    ReserveHeader
  },
  data() {
    return {
      onlineCategoryId: process.env.onlineId,
      html2canvas: null,
      doc: null,
      translations: {
        'es_ES': {
          starting_time: 'Hora de inicio',
          ending_time: 'Hora de finalización',
          group_size: 'Tamaño de grupo',
          number_devices: 'Cantidad de dispositivos',
          destination: 'Destino',
          booking_code: 'Código de reserva',
          bring: '¿Qué llevar?',
          price: 'Precio final',
          meeting_point: 'Punto de encuentro',
          language: 'Idioma',
          additionals: 'Servicios adicionales',
          download_details: 'Guardar detalles de la reserva',
          traveler: 'viajero',
          travelers: 'viajeros',
          you: 'Tú',
          traveler_you: 'Un viajero y tú',
          travelers_you: 'viajeros y tú',
          device: 'dispositivo',
          devices: 'dispositivos'
        },
        'en_EN': {
          starting_time: 'Starting time',
          ending_time: 'Ending time',
          group_size: 'Group size',
          number_devices: 'Number of devices',
          destination: 'Destination',
          booking_code: 'Booking code',
          bring: 'What to bring?',
          price: 'Price',
          meeting_point: 'Meeting point',
          language: 'Language',
          additionals: 'Additional services',
          download_details: 'Download booking details',
          traveler: 'traveler',
          travelers: 'travelers',
          you: 'You',
          traveler_you: 'A traveler and you',
          travelers_you: 'travelers and you',
          device: 'device',
          devices: 'devices'
        }
      }
    }
  },
  computed: {
    duration() {
      if(this.reserve.experience.translations[0].duration !== '') {
        return this.reserve.experience.translations[0].duration.split(' ')[0]
      } return null
    },
    isOnline () {
      if(!this.reserve || this.reserve.experience.categories.length === 0) return false

      let isOnline = false
      this.reserve.experience.categories.forEach(item => {
        if(item.id === parseInt(this.onlineCategoryId)) {
          isOnline = true
        }
      })

      return isOnline
    },
    reserveGroupSize() {
      if(this.reserve.group_size === 1) {
        return '1 ' + this.$lang.translate(this.translations, this.isOnline ? 'device' : 'traveler')
      } else {
        return this.reserve.group_size + ' ' + this.$lang.translate(this.translations, this.isOnline ? 'devices' : 'travelers')
      }
    },
    reserveExtras() {
      if(!this.reserve.extras) return ''
      
      const extras = []
      this.reserve.extras.forEach(item => {
        extras.push(this.$lang.apiTranslate(item.translations, 'title'))
      })

      return extras.join(', ')
    }
  },
  mounted() {
    if(this.reserve && this.reserve.status === 1) {
      return this.$router.push(`/${this.$lang.current().slug}/my/reserves/${this.reserve.code}/travelers-info`)
    }

    if(process.client) {
      const jsPDF = require('jspdf')
      this.doc = new jsPDF('portrait', 'mm', 'a4')
      this.html2canvas = require('html2canvas')
    }
  },
  methods: {
    handleDownload() {
      if(this.doc && this.html2canvas) {
        const reserveDetails = document.getElementById('reserve-details')
        const imageWidth = reserveDetails.clientWidth / 4
        const imageHeight = reserveDetails.clientHeight / 4


        this.html2canvas(reserveDetails, {scrollY: -window.scrollY}).then((canvas) => {
          let logo = new Image();
          logo.src = process.env.baseUrl + '/images/logo-pdf.png'

          this.doc.addImage(logo, 'png', 10, 10);

          const img = canvas.toDataURL("image/png");
          this.doc.text('Barranco bohemio: descubre el arte urbano y crea tu propio graffiti', 10, 35)
          this.doc.addImage(img, 'JPEG', 10, 50, imageWidth, imageHeight);
          this.doc.save(`mapit_reserve_${this.reserve.code}.pdf`);        
      })
      }
    }
  }
}
</script>
