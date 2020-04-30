<template>
  <div>
    <PageHeader
      :translations="headerTranslations"
      image="/images/about/banner.jpg" />
    <div class="container mx-auto px-4 md:pt-16">
      <AboutSection />
      <WhyMapitSection />
      <TeamSection />
      <SocialImpactSection />
    </div>
    <WiserSection />
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import AboutSection from '@/components/about/AboutSection'
import WhyMapitSection from '@/components/about/WhyMapitSection'
import TeamSection from '@/components/about/TeamSection'
import SocialImpactSection from '@/components/about/SocialImpactSection'
import WiserSection from '@/components/about/WiserSection'

export default {
  components: {
    PageHeader,
    AboutSection,
    WhyMapitSection,
    TeamSection,
    SocialImpactSection,
    WiserSection
  },
  data() {
    return {
      headerTranslations: {
        es_ES: {
          title:'Quiénes Somos'
        },
        en_EN: {
          title:'About Us'
        },
      }
    }
  }
}
</script>
