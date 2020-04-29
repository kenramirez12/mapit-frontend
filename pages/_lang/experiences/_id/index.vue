<template>
  <div v-if="experience" class="relative">
    <div class="responsive-floating">
      <el-dropdown
        trigger="click"
        class="w-full"
        @command="onCommandDropdown">
        <el-button class="w-full border-0 py-3 font-normal">
          <div class="flex relative mx-auto" style="max-width:460px">
            <span class="mx-auto">{{ sectionName }}</span>
            <i style="position:absolute;right:0" class="el-icon-arrow-down el-icon--right text-gray-600" />
          </div>
        </el-button>
        <el-dropdown-menu slot="dropdown" class="categories-dropdown py-0">
          <el-dropdown-item
            v-for="(section,n) in sections"
            :key="n"
            :class="{
              'border-b' : n <= sections.length,
              'text-primary' : section.name === currentSection
            }"
            :command="section.name"
            class="text-center py-1">
            {{ section.translations[$lang.current().iso_lang].label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <ExperienceReserveForm :experience="experience" :sticky="true" />
    </div>
    <PageHeader
      :preTitle="experience.destination.name"
      :title="$lang.apiTranslate(experience.translations, 'title')"
      :image="$imagePath(experience.banner_image.path)"
      class="pt-4 mt-12 md:mt-0"
      contentClass="mr-6">
      <ExperienceReserveForm :experience="experience" class="ml-5 page-header__booking" />
    </PageHeader>

    <div id="experience-container" class="relative">
      <div
        :class="{ show : showReserveFormSticky }"
        class="container reserve-container-fixed px-3">
          <div class="reserve-form-floating mt-3">
            <ExperienceReserveForm :experience="experience" :sticky="true" />
          </div>
      </div>

      <div
        v-if="experience"
        :class="{ fixed: navbarFixed, show: showNavbar }"
        class="experience-navbar">
        <div class="container px-3 mx-auto">
          <div class="experience-navbar__container">
            <div
              v-for="(section,n) in sections"
              :key="n"
              @click="navigateSection(section.name)"
              :class="{ active : currentSection === section.name }"
              class="experience-navbar__item">
              <span class="experience-navbar__label">{{ section.translations[$lang.current().iso_lang].label }}</span>
              <img v-if="currentSection === section.name" class="experience-navbar__arrow-current" src="~/assets/images/point-small-dark.svg">
              <img v-else class="experience-navbar__arrow" src="~/assets/images/small-dark-arrow.svg">
            </div>
          </div>
        </div>
      </div>
      <OverviewSection :experience="experience" />
      <ActivitiesSection :experience="experience" />
      <ProgramSection :experience="experience" />
      <AdditionalInfoSection :experience="experience" />
      <SocialPointsSection :experience="experience" />
      <TestimonialSection
        v-if="hasTestimonials"
        :testimonials="experience.testimonials" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import PageHeader from '~/components/PageHeader'
import OverviewSection from '~/components/experiences/OverviewSection'
import ActivitiesSection from '~/components/experiences/ActivitiesSection'
import ProgramSection from '~/components/experiences/ProgramSection'
import AdditionalInfoSection from '~/components/experiences/AdditionalInfoSection'
import SocialPointsSection from '~/components/experiences/SocialPointsSection'
import TestimonialSection from '~/components/experiences/TestimonialSection'
import ExperienceReserveForm from '~/components/experiences/reserveForm'

export default {
  async asyncData({ app, params, store, error, route }) {
    store.commit('reserves/RESET_FORM')

    try {
      let currentLang = ('lang' in route.params) ? route.params.lang : 'en'
      currentLang = currentLang === 'es' ? 'es_ES' : 'en_EN'

      const resp = await app.$axios.$get(`/experiences/${params.id}`)
      const experience = resp.experience
      store.commit('reserves/SET_EXPERIENCE', experience)

      const translations = experience.translations.find(item => item.iso_lang == currentLang)
      return {
        pageTitle: 'MAP IT - ' + translations.title,
        pageDescription: translations.description,
        pageImage: experience.main_image.path
      }
    } catch (error) {
      console.error(error)
    }
  },
  head () {
    return {
      title: this.pageTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.pageDescription },
        { hid: 'og:description', name: 'og:description', content: this.pageDescription },
        { property: 'og:image', content: this.$imagePath(this.pageImage) }
      ]
    }
  },
  components: {
    PageHeader,
    OverviewSection,
    ActivitiesSection,
    ProgramSection,
    AdditionalInfoSection,
    SocialPointsSection,
    TestimonialSection,
    ExperienceReserveForm
  },
  data() {
    const pageSections = [
      {
        translations: {
          es_ES: { label: 'General' },
          en_EN: { label: 'Overview' }
        },
        name: 'overview',
      },
      {
        translations: {
          es_ES: { label: 'Actividades' },
          en_EN: { label: 'Activities' }
        },
        name: 'activities',
      },
      {
        translations: {
          es_ES: { label: 'Programa' },
          en_EN: { label: 'Program' }
        },
        name: 'program',
      },
      {
        translations: {
          es_ES: { label: 'Información Adicional' },
          en_EN: { label: 'Additional Information' }
        },
        name: 'additional-info',
      },
      {
        translations: {
          es_ES: { label: 'Puntos Sociales' },
          en_EN: { label: 'Social Points' }
        },
        name: 'social-points',
      }
    ]

    return {
      pageSections,
      scrollWatching: false,
      showReserveFormSticky: false,
      navbarFixed: false,
      showNavbar: false,
      currentSection: 'overview'
    }
  },
  computed: {
    ...mapGetters({
      experience: 'reserves/currentExperience'
    }),
    hasTestimonials () {
      if(!this.experience) return null
      return ('testimonials' in this.experience && this.experience.testimonials.length > 0)
    },
    translations () {
      if(!this.experience) return null
      const translations = this.experience.translations.find(item => {
        return item.iso_lang === this.$store.getters.currentLang.iso_lang
      })
  
      return translations
    },
    sections () {
      const sections = this.pageSections

      if(this.hasTestimonials) {
        sections.push({
          translations: {
            es_ES: { label: 'Opiniones' },
            en_EN: { label: 'Reviews' }
          },
          name: 'testimonials'
        })
      }

      return sections
    },
    sectionName () {
      if(this.sections.length > 0) {
        const current = this.sections.find(item => {
          return item.name === this.currentSection
        })

        if(current) {
          return this.$lang.translate(current.translations, 'label')
        }

        return null
      }

      return null
    }
  },
  created() {
    if (process.client) {
      window.addEventListener('scroll', this.watchReserveAndNavbar)
    }
  },
  destroyed() {
    if (process.client) {
      window.removeEventListener('scroll', this.watchReserveAndNavbar)
    }
  },
  methods: {
    ...mapMutations({
      resetReserveForm: 'reserves/RESET_FORM',
      setExperience: 'reserves/SET_EXPERIENCE'
    }),
    watchReserveAndNavbar () {
      const pageTop = window.window.pageYOffset

      if(pageTop > 600 && !this.showReserveFormSticky) {
        this.showReserveFormSticky = true
      } else if(pageTop <= 600 && this.showReserveFormSticky) {
        this.showReserveFormSticky = false
      }

      const currentSection = this.getActiveSection()
      if(currentSection) {
        if(this.currentSection !== currentSection) this.currentSection = currentSection
      }

      if(pageTop > 600) {
        this.navbarFixed = !this.experienceContainerIsScrolled()
        this.showNavbar = true
      } else {
        this.navbarFixed = false
        this.showNavbar = false
      }
    },
    navigateSection (sectionName) {
      const sectionContainer = document.getElementById(`${sectionName}-section`)
      const offsetParent = sectionContainer.offsetParent

      window.scrollTo({ top: sectionContainer.offsetTop + offsetParent.offsetTop, behavior: 'smooth' });
    },
    experienceContainerIsScrolled () {
      const experienceContainer = document.getElementById('experience-container')
      const bounding = experienceContainer.getBoundingClientRect()

      return (bounding.height + bounding.y - window.innerHeight) <= 0
    },
    getActiveSection () {
      const overviewSection = document.getElementById('overview-section')
      const activitiesSection = document.getElementById('activities-section')
      const programSection = document.getElementById('program-section')
      const additionalInfoSection = document.getElementById('additional-info-section')
      const socialPointsSection = document.getElementById('social-points-section')
      const testimonialSection = document.getElementById('testimonials-section')

      if(testimonialSection && testimonialSection.getBoundingClientRect().top < 200) {
        return 'testimonials'
      } else if(socialPointsSection.getBoundingClientRect().top < 200) {
        return 'social-points'
      } else if(additionalInfoSection.getBoundingClientRect().top < 200) {
        return 'additional-info'
      } else if(programSection.getBoundingClientRect().top < 200) {
        return 'program'
      } else if(activitiesSection.getBoundingClientRect().top < 200) {
        return 'activities'
      } else if(overviewSection.getBoundingClientRect().top < 200) {
        return 'overview'
      } else {
        return null
      }
    },
    onCommandDropdown(command) {
      this.navigateSection(command)
    }
  }
}
</script>

<style lang="scss">
  .categories-dropdown {
    z-index: 9999!important;
    margin-top: 0!important;
    left: 0!important;
    right: 0!important;

    & > .popper__arrow {
      display: none!important;
    }
  }
</style>

<style lang="scss" scoped>
  .responsive-floating {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 2000;
    background-color: #fff;
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.1);

    @media screen and (min-width: 768px) {
      display: none;
    }
  }

  .page-header {
    &__booking {
      display: none;

      @media screen and (min-width: 768px) {
        display: flex;
      }
    }
  }

  .experience-navbar {
    display: none;
    position: absolute;
    bottom: 0;
    left: 0;
    padding-bottom: 2.5rem;
    width: 100%;
    z-index: 3;
    opacity: 0;
    transition: all 0.3s;
    background: linear-gradient(to top, #fff, transparent);

    @media screen and (min-width: 768px) {
      display: block;
    }

    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: #000;
      position: absolute;
      left: 0;
      right: 0;
      bottom: calc(2.5rem - 1px);
    }

    &.show {
      opacity: 1;
    }

    &.fixed {
      position: fixed;
    }

    &__container {
      display: flex;
      align-items: flex-end;
    }

    &__item {
      flex: 1;
      cursor: pointer;
      margin-bottom: -8px;
      transition: all 0.3s;

      &:not(.active):hover {
        .experience-navbar__label {
          transform: translateY(-.5rem);
        }
      }

      &.active {
        flex: 2;

        .experience-navbar__label {
          font-size: 1.5rem;
        }
      }
    }

    &__label {
      display: block;
      padding-bottom: .6rem;
      transition: all 0.3s;
    }

    &__arrow {
      height: 16px;

      &-current {
        height: 43px;
      }
    }
  }

  .reserve-container-fixed {
    position: sticky;
    margin: auto;
    top: 0;
    transform: translateX(100%);
    transition: all 0.3s;
    z-index: 9;
    display: none;

    @media screen and (min-width: 768px) {
      display: block;
    }

    &.show {
      transform: translateX(0);
    }
  }

  .reserve-form-floating {
    position: absolute;
    right: 15px;
  }

  .experience-container {
    @media screen and (min-width: 768px) {
      background: linear-gradient(90deg, #fff 55%, var(--primary) 55%);
    }
  }
</style>