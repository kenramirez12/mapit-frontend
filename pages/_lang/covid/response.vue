<template>
  <div class="container px-4 py-12 mx-auto">
    <div class="flex flex-wrap">
      <div class="w-full pb-2 mb-8 text-sm font-light">
        {{ $lang.translate(translations, 'updated_at') }}
      </div>
      <div class="w-full lg:w-6/12 font-light text-sm pr-10" v-html="$lang.translate(translations, 'content')" />
      <div class="w-full lg:w-6/12 ml-auto xl:pl-12">
        <TheSteps :steps="steps" />
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/shared/PageHeader'
import TheSteps from '@/components/shared/TheSteps'

export default {
  components: {
    PageHeader,
    TheSteps
  },
  data() {
    return {
      translations: {
        es_ES: {
          updated_at: 'Última actualización 12/05/2020',
          content: `
          <h2 class="text-xl md:text-2xl lg:text-3xl leading-tight mb-6">About the Coronavirus Outbreak</h2>
          <p class="mb-8">Hasta el 24 de mayo, las fronteras de Perú estarán cerradas (fechas sujetas a prórroga). La mejor actualización sobre la propagación del Coronavirus en Perú es el Ministerio de Salud de Perú (@Minsa_Peru en Twitter). No se sabe cuándo se levantarán las restricciones de viaje, es por eso que en Map It hemos decidido pausar nuestras experiencias a partir del 16 de marzo, hasta nuevo aviso.</p>
          <p class="mb-8">Sin embargo, una vez que se vuelvan a abrir las fronteras del país, se levanten las restricciones de viaje, y el panorama sea adecuado para el turismo, continuaremos ofreciendo nuestras experiencias. Estamos monitoreando de cerca la situación para determinar la fecha correspondiente. Además, seguimos trabajando arduamente para adaptar nuestras políticas, y así brindarle el mejor apoyo posible.</p>
          <p class="mb-8 text-xl md:text-2xl lg:text-3xl leading-tight">Con ese fin, hemos realizado las siguientes actualizaciones en nuestras políticas:</p>
          <p class="mb-8">1. Ofrecer reembolsos completos o la posibilidad de reprogramar todas las reservas afectadas por COVID-19 para viajar desde el 16 de marzo de 2020, hasta que se levanten las restricciones de prohibición de viaje, y se vuelvan a abrir las fronteras en su país de origen y en Perú.</p>
          <p class="mb-8">2. Como sabemos, antes de la actual coyuntura, muchos de ustedes tenían planes de viajar y están reprogramando su viaje a Perú. Es por eso que Map It ofrece una nueva modalidad de reserva: "Reserva ahora / Paga después", donde puede reservar un lugar en la experiencia que elija, sin tener que hacer el pago, y con la posibilidad de elegir la fecha más tarde cuando se definan sus planes de viaje.</p>
          <h4 class="text-xl md:text-2xl lg:text-3xl leading-tight mb-4">Cancelaciones para las reservas "Reserva ahora / Paga después":</h4>
          <p class="mb-8">- Las cancelaciones realizadas una vez confirmada la fecha de reserva y realizado el pago, no obtendrán ningún reembolso</p>
          <p class="mb-8">- Si la amenaza y propagación de COVID-19 continúa e interrumpe tus planes de viaje, puedes reprogramar sin cargo u obtener créditos de viaje por el monto de su reserva para usar hasta el 31 de diciembre de 2021.</p>
          <p class="mb-8">Si deseas tener una experiencia privada o realizar cualquier otro cambio, o hacer una cancelación, comunícate con info@mapit.pe</p>`
        },
        en_EN: {
          updated_at: 'Last updated 24/05/2020',
          content: `
          <h2 class="text-xl md:text-2xl lg:text-3xl leading-tight mb-4">About the Coronavirus Outbreak</h2>
          <p class="mb-8">Peru is on lockdown and has been closed until May 24th (dates subject to extend). The best update on the spread and numbers in Peru is the Ministry of Health of Peru (@Minsa_Peru on Twitter). It is uncertain when travel restrictions will lift, that is why in Map It we have decided to pause experiences starting from March 16th until further notice.</p>
          <p class="mb-8">However, once the country’s borders re opens, travel restrictions are lifted and the landscape is suitable for tourism, we will continue offering our experiences. We are closely monitoring the situation to determine when. Besides, we are working hard to adapt our policies to best support you.</p>
          <p class="mb-8 text-xl md:text-2xl lg:text-3xl leading-tight">To that end, we’ve made the following updates in our policies:</p>
          <p class="mb-8">1. Offer full refunds or the possibility to reschedule all COVID-19 impacted bookings to travel from March 16th , 2020 until travel ban restrictions are lifted and borders are reopened in your country of origin and Peru.</p>
          <p class="mb-8">2. As we know, before this situation many of you had plans to travel and are rescheduling your trip to Peru. That is why Map It is offering a new booking method: “Book Now / Pay Later”, where you can book a spot in the experience of your choice, without having to make a payment and with the possibility of choosing the date later when you have your travel plans ready.</p>
          <h4 class="mb-8 text-xl md:text-2xl lg:text-3xl leading-tight">Cancellations of the “Book Now/ Pay Later” bookings:</h4>
          <p class="mb-4">-	Cancellations made once the booking date is confirmed and the payment is made, will not get a refund.</p>
          <p class="mb-8">-	If threat and spread of COVID-19 continues and interrupts your travel plans, you can reschedule free of charge or get travel credits for the value of your booking to use until 31st Dec, 2021.</p>
          <p class="mb-8">If you want to have a private experience or make any other changes, or make a cancellation, please contact <a class="font-medium" href="mailto:info@mapit.pe">info@mapit.pe</a>.</p>`
        }
      },
      steps: [
        {
          number: '01',
          image: 'response/step-01.jpg',
          translations: {
            es_ES: {
              title: 'About the Coronavirus Outbreak',
              content: 'Busca entre más de 60 experiencias en diferentes ciudades del Perú y elige tu favorita.'
            },
            en_EN: {
              title: 'About the Coronavirus Outbreak',
              content: 'Browse our 60+ experiences in many cities in Peru and choose your favorite one.'
            }
          }
        },
        {
          number: '02',
          image: 'response/step-02.jpg',
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
          image: 'response/step-03.jpg',
          translations: {
            es_ES: {
              content: 'Cuando tengas la fecha de tu viaje, confirma la fecha de reserva, y recibirás un enlace para realizar el pago.'
            },
            en_EN: {
              content: 'Once you have your travel plans ready, choose your experience day and make the payment through a link.'
            }
          }
        }
      ]
    }
  }
}
</script>
