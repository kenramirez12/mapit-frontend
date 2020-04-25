<template>
  <div>
    <PageHeader
      pre-title="COVID 19"
      :translations="headerTranslations"
      image="/images/covid-bg.jpg"
      style="height:520px" />
    <div class="container px-4 py-12 mx-auto">
      <div class="flex flex-wrap">
        <div class="w-full pb-2 mb-8 text-sm font-light border-b">
          {{ $lang.translate(translations, 'updated_at') }}
        </div>
        <div class="w-7/12 font-light">
          <p class="mb-8">
            Peru is on lockdown and has been closed until April 30th (Dates subject to extend). The best update on the spread and numbers in Peru is the Ministry of Health of Peru (@Minsa_Peru on Twitter).  It is uncertain when travel restrictions will lift, that is why in Map It we have decided to pause experiences starting from March 16th until further notice.
          </p>
          <p class="mb-8">
            However, once the country’s borders re opens, travel restrictions are lifted and the landscape is suitable for tourism, we will continue offering our experiences. We are closely monitoring the situation to determine when. Besides, we are working hard to adapt our policies to best support you.
          </p>
          <p class="mb-8">
            To that end, we’ve made the following updates in our policies:
          </p>
          <p class="mb-8">
            1.	Offer full refunds or the possibility to reschedule all COVID-19 impacted bookings to travel from March 16th , 2020 until travel ban restrictions are lifted and borders are reopened in your country of origin and Peru. 
          </p>
          <p class="mb-8">
            2.	As we know, before this situation many of you had plans to travel and are rescheduling your trip to Peru. That is why Map It is offering a new booking method: “Book Now / Pay Later”, where you can book a spot in the experience of your choice, without having to make a payment and with the possibility of choosing the date later when you have your travel plans ready.
          </p>
          <h4 class="text-lg underline mb-4">Cancellations of the “Book Now/ Pay Later” bookings:</h4>
          <p class="mb-4">
            -	Cancellations made once the booking date is confirmed and the payment is made, will not get a refund. 
          </p>
          <p class="mb-8">
            -	If threat and spread of COVID-19 continues and interrupts your travel plans, you can reschedule free of charge or get travel credits for the value of your booking to use until 31st Dec, 2021.
          </p>
          <p class="mb-8">
            If you want to have a private experience or make any other changes, or make a cancellation, please contact info@mapit.pe.
          </p>
        </div>
        <div class="w-4/12 ml-auto pl-12">
          <div
            v-for="(step, n) in steps"
            :key="'step_' + n"
            class="flex mb-12">
            <span class="text-4xl font-light leading-none mr-6">{{ step.number }}</span>
            <p class="font-light">{{ $lang.translate(step.translations, 'content') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'

export default {
  components: {
    PageHeader
  },
  data() {
    return {
      headerTranslations: {
        es_ES: {
          title: 'Acerca de la actualización del brote de coronavirus'
        },
        en_EN: {
          title: 'About the coronavirus outbreak'
        }
      },
      translations: {
        es_ES: {
          updated_at: 'Última actualización 20/4/2020'
        },
        en_EN: {
          updated_at: 'Last updated 04/20/2020'
        }
      },
      steps: [
        {
          number: '01',
          translations: {
            es_ES: {
              content: 'Busca entre más de 60 experiencias en diferentes ciudades del Perú y elige tu favorita.'
            },
            en_EN: {
              content: 'Browse our 60+ experiences in many cities in Peru and choose your favorite one.'
            }
          }
        },
        {
          number: '02',
          translations: {
            es_ES: {
              content: 'Haz clic en el botón "Reserva ahora / Paga después", llena el formulario de contacto, ¡y listo! Te llegará un mail con la confirmación de la reserva. Tendrás hasta una semana antes de la hora de inicio de la experiencia para elegir la fecha.'
            },
            en_EN: {
              content: 'Click the “Book Now / Pay Later” button, fill the contact form and that’s it! You will receive a mail with your booking confirmation. You can pick your experience day up to one week before its starting time.'
            }
          }
        },
        {
          number: '03',
          translations: {
            es_ES: {
              content: 'Cuando tengas la fecha de tu viaje, confirma la fecha de reserva, y recibirás un enlace para realizar el pago.'
            },
            en_EN: {
              content: 'Once you have your travel plans ready, choose your experience day and make the payment through a link.'
            }
          }
        },
        {
          number: '04',
          translations: {
            es_ES: {
              content: '¡Disfruta!'
            },
            en_EN: {
              content: 'Enjoy!'
            }
          }
        }
      ]
    }
  }
}
</script>

<style>

</style>