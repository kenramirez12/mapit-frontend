<template>
  <div class="overflow-hidden">
    <full-page ref="fullpage" :options="options" id="fullpage">
      <div class="section header-section fp-auto-height">
        <HeaderDialog />
        <AppHeader />
      </div>
      <div class="section">
        <TravelersIntro />
      </div>
      <div class="section">
        <TravelersSlider />
      </div>
      <div class="section footer-section fp-auto-height">
        <AppFooter />
      </div>
    </full-page>
  </div>
</template>

<script>
import HeaderDialog from '@/layouts/components/HeaderDialog'
import AppHeader from '@/layouts/components/AppHeader'
import AppFooter from '@/layouts/components/AppFooter'
import TravelersIntro from '@/components/how-it-works/travelers/TravelersIntro'
import TravelersSlider from '@/components/how-it-works/travelers/TravelersSlider'

export default {
  components: {
    HeaderDialog,
    AppHeader,
    AppFooter,
    TravelersIntro,
    TravelersSlider
  },
  data() {
    return {
      translations: {
        es_ES: {
          covid_policies: 'Sobre nuestras experiencias online y nuestra respuesta al COVID-19.',
          click: 'Clic aquí'
        },
        en_EN: {
          covid_policies: 'Learn about our online experiences and our COVID-19 response.',
          click: 'Click here'
        }
      },
      options: {
        licenseKey: 'YOUR_KEY_HEERE',
        menu: '#menu',
        scrollingSpeed: 500,
        anchors: ['header', 'info', 'steps', 'footer'],
        // fitToSection: false
        responsiveWidth: 1025,
        // scrollBar: true,
        // normalScrollElements: "#footer"
        // onLeave: (origin, destination, direction) => {
        //   if( destination.isLast ) {
        //     console.log('ola')
        //     this.$refs.fullpage.api.setFitToSection(false)
        //     // this.$refs.fullpage.api.reBuild()
        //   } else {
        //     this.$refs.fullpage.api.setFitToSection(true)
        //   }
        // }
        // onLeave: (origin, destination, direction) => {
        //   if( destination.isLast ) {
        //     this.$refs.fullpage.api.setAutoScrolling(false)
        //     this.$refs.fullpage.api.setFitToSection(false)
        //     // this.$refs.fullpage.api.reBuild()
        //   } else {
        //     this.$refs.fullpage.api.setAutoScrolling(true)
        //     this.$refs.fullpage.api.setFitToSection(true)
        //   }
        // }
      }
    }
  },
  mounted() {
    // setTimeout(() => {
    //   console.log(this.$refs.fullpage.$fullpage)
    //   this.$refs.fullpage.$fullpage.update()
    // }, 2000);
  },
  methods: {
    // moveNext(){
    //   this.$refs.example.$fullpage.moveNext(); //Move to the next page
    // }
  }
}
</script>

<style lang="scss">
  .fp-tableCell {    
    @media screen and (max-width: 1023px) {
      height: auto!important;
    }
  }

  // .header-section,
  .footer-section {
    @media screen and (max-width: 1024px) {
      display: none!important;
    }
  }
</style>

<style lang="scss" scoped>
  .section {
    @media screen and (max-width: 1023px) {
      height: auto!important;
    }
  }
</style>