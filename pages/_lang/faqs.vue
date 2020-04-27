<template>
  <div>
    <div class="container py-12 mx-auto">
      <div class="flex flex-wrap items-center mb-4">
        <h1 class="text-3xl font-light mb-5 px-3">FAQs</h1>
        <div class="faqs-search ml-auto">
          <input
            type="text"
            v-model="searchInput"
            @keydown.esc="searchInput = ''"
            class="search-input"
            :placeholder="$lang.translate(translations, 'search')">
          <i class="el-icon-search" />
        </div>
      </div>
      <div class="container mx-auto -px-3">
        <div class="flex flex-wrap">
          <div
            v-for="(faq, n) in filteredFaqs"
            :key="'faq_' + n"
            class="w-1/2 px-3 mb-4">
            <FaqItem :faq="faq" class="h-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FaqItem from '@/components/shared/FaqItem'

export default {
  components: {
    FaqItem
  },
  data() {
    return {
      searchInput: '',
      faqs: this.$store.state.faqs,
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
          search: 'Buscar',
          updated_at: 'Última actualización 20/4/2020'
        },
        en_EN: {
          search: 'Search',
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
  },
  computed: {
    filteredFaqs() {
      const currentLang = this.$lang.current().iso_lang
      if(this.searchInput === '') return this.faqs[currentLang]

      return this.faqs[currentLang].filter(item => {
        return this.normalize(item.question).includes(this.searchInput.toLowerCase()) || this.normalize(item.answer).toLowerCase().includes(this.searchInput.toLowerCase())
      })
    }
  },
  methods: {
    normalize (string) {
      const from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç"
      const to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc"
      let mapping = {}
    
      for( let i = 0, j = from.length; i < j; i++ ) {
        mapping[ from.charAt( i ) ] = to.charAt( i )
      }

      const ret = []
      for( let i = 0, j = string.length; i < j; i++ ) {
        const c = string.charAt( i )
        if( mapping.hasOwnProperty( string.charAt( i ) ) ) {
          ret.push( mapping[ c ] )
        } else {
          ret.push( c )
        }

      }      
      return ret.join( '' ).toLowerCase()
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-input {
    width: 100%;
    font-size: 1.2rem;
    border-bottom: 2px solid #000;
    line-height: 2;
    transition: all 0.3s;
    padding-right: 2rem;

    &:focus {
      border-color: var(--primary);

      & + i {
        color: var(--primary);
      }
    }
  }

  .faqs-search {
    position: relative;
    height: 40px;
    padding: 0 1rem;
    margin-bottom: 1rem;

    i {
      position: absolute;
      font-size: 1.5rem;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      transition: all 0.3s;
    }
  }
</style>