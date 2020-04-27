<template>
  <div class="faqs-dropdown py-0">
    <div class="faqs-search">
      <input
        type="text"
        v-model="searchInput"
        @keydown.esc="searchInput = ''"
        class="search-input"
        :placeholder="$lang.translate(translations, 'search')">
      <i class="el-icon-search" />
    </div>
    <div class="faqs-container">
      <FaqItem
        v-for="(faq, n) in filteredFaqs"
        :key="'faq_' + n"
        :faq="faq" />
    </div>
    <div class="faqs-footer py-6 px-4 text-center">
      <p class="font-bold text-sm">
        {{ $lang.translate(translations, 'not_found') }}
      </p>
      <el-button
        @click="$router.push(`/${$lang.current().lang}/contact`)"
        type="primary"
        plain
        class="mt-4">
        {{ $lang.translate(translations, 'contact_us') }}
      </el-button>
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
      faqs: this.$store.state.faqs,
      searchInput: '',
      translations: {
        'es_ES': {
          search: 'Buscar',
          not_found: '¿No encuentras tu duda aqui? Escríbenos.',
          contact_us: 'Contáctanos'
        },
        'en_EN': {
          search: 'Search',
          not_found: 'Can’t find your answer here? Contact us!',
          contact_us: 'Contact us'
        }
      }
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

  .faqs-container {
    padding: 1rem;
    height: calc(100% - 40px - 125px);
    overflow-y: auto;
    margin-bottom: auto;
    border-bottom: 1px solid #EBEEF5;
  }

  .faqs-footer {
    display: flex;
    height: 125px;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem 1rem;
    height: 125px;
  }

  .faqs-dropdown {
    display: flex;
    flex-direction: column;
    margin-top: 0!important;
    padding: 1rem 0 0;
    background-color: #fff;
    z-index: -999;
    transform-origin: center bottom;
    transform: scaleY(0);
    transition: all 0.3s;
    border: 1px solid #EBEEF5;
    cursor: default;
    border-top: 0;
    opacity: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 80px;
    width: 100%;
    height: calc(100vh - 79px);

    @media screen and (min-width: 768px) {
      transform-origin: center top;
      position: absolute;
      top: (var(--header-height) + 55px);
      left: unset;
      right: 0;
      bottom: unset;
      width: 400px;
      height: calc(100vh - var(--header-height) - 55px);
    }

    &.show {
      transform: scaleY(1);
      opacity: 1;
      z-index: 999;
    }
  }
</style>
