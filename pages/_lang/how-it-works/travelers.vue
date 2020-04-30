<template>
  <div class="overflow-hidden">
    <full-page ref="fullpage" :options="options" id="fullpage">
      <div class="section">
        <TravelersIntro />
      </div>
      <div class="section">
        <TravelersSlider />
      </div>
    </full-page>
  </div>
</template>

<script>
import TravelersIntro from '@/components/how-it-works/travelers/TravelersIntro'
import TravelersSlider from '@/components/how-it-works/travelers/TravelersSlider'

export default {
  components: {
    TravelersIntro,
    TravelersSlider
  },
  data() {
    return {
      options: {
        licenseKey: 'YOUR_KEY_HEERE',
        menu: '#menu',
        anchors: ['info', 'steps'],
        // paddingTop: '100px',
      }
    }
  },
  mounted() {
    setTimeout(() => {
      console.log(this.$refs.fullpage.$fullpage)
      this.$refs.fullpage.$fullpage.update()
    }, 2000);
  },
  methods: {
    // moveNext(){
    //   this.$refs.example.$fullpage.moveNext(); //Move to the next page
    // }
  }
}
</script>

<style lang="scss" scoped>
  .section {
    @media screen and (min-width: 768px) {
      padding-top: 100px;
    }
  }
</style>