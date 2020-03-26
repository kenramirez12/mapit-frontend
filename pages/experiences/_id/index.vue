<template>
  <div v-if="experience">
    <PageHeader
      :preTitle="experience.destination.title"
      :title="$lang.apiTranslate(experience.translations, 'title')"
      :image="$imagePath(experience.main_image.path)"
      contentClass="mr-6">
      <ExperienceReserveForm class="ml-5 " />
    </PageHeader>

    <div id="experience-container" class="relative">
      <div
        :class="{ show : showReserveFormSticky }"
        class="container reserve-container-fixed px-3">
          <div class="reserve-form-floating mt-3">
            <ExperienceReserveForm :sticky="true" />
          </div>
      </div>

      <div
        :class="{ fixed: navbarFixed, show: showNavbar }"
        class="experience-navbar">
        <div class="container px-3 mx-auto">
          <div class="experience-navbar__container">
            <div
              v-for="(section,n) in sections"
              :key="n"
              @click="currentSection = section.name"
              :class="{ active : currentSection === section.name }"
              class="experience-navbar__item">
              <span class="experience-navbar__label">{{ section.label }}</span>
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
      <TestimonialSection :experience="experience" />
    </div>
  </div>
</template>

<script>
import PageHeader from '~/components/PageHeader'
import OverviewSection from '~/components/experiences/OverviewSection'
import ActivitiesSection from '~/components/experiences/ActivitiesSection'
import ProgramSection from '~/components/experiences/ProgramSection'
import AdditionalInfoSection from '~/components/experiences/AdditionalInfoSection'
import SocialPointsSection from '~/components/experiences/SocialPointsSection'
import TestimonialSection from '~/components/experiences/TestimonialSection'
import ExperienceReserveForm from '~/components/experiences/reserveForm'

export default {
  head () {
    return {
      title: this.pageTitle
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
    return {
      showReserveFormSticky: false,
      navbarFixed: false,
      showNavbar: false,
      currentSection: 'overview',
      experience: null,
      sections: [
        {
          label: 'General',
          name: 'overview',
        },
        {
          label: 'Actividades',
          name: 'activities',
        },
        {
          label: 'Programa',
          name: 'program',
        },
        {
          label: 'Información Adicional',
          name: 'additional-info',
        },
        {
          label: 'Puntos Sociales',
          name: 'social-points',
        },
        {
          label: 'Opiniones',
          name: 'testimonials',
        }
      ]
    }
  },
  computed: {
    pageTitle () {
      let title = 'Map It'
      if(this.experience) {
        title += ` - ${this.translations.title}`
      }

      return title
    },
    translations () {
      if(!this.experience) return null
      const translations = this.experience.translations.find(item => {
        return item.iso_lang === this.$store.getters.currentLang.iso_lang
      })
  
      return translations
    }
  },
  async mounted() {
    await this.getExperience(this.$route.params.id)

    if(this.experience) {
      console.log('holaas')
      const experienceContainer = document.getElementById('experience-container')
  
      const experienceContainerIsScrolled = () => {
        const bounding = experienceContainer.getBoundingClientRect()
        return (bounding.height + bounding.y - window.innerHeight) <= 0
      }

      const overviewSection = document.getElementById('overview-section')
      const activitiesSection = document.getElementById('activities-section')
      const programSection = document.getElementById('program-section')
      const additionalInfoSection = document.getElementById('additional-info-section')
      const socialPointsSection = document.getElementById('social-points-section')
      const testimonialSection = document.getElementById('testimonials-section')

      const getActiveSection = () => {
        if(testimonialSection.getBoundingClientRect().top < 200) {
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
      }

      window.addEventListener('scroll', () => {
        const pageTop = window.window.pageYOffset

        if(pageTop > 600 && !this.showReserveFormSticky) {
          this.showReserveFormSticky = true
        } else if(pageTop <= 600 && this.showReserveFormSticky) {
          this.showReserveFormSticky = false
        }

        const currentSection = getActiveSection()
        if(currentSection) {
          if(this.currentSection !== currentSection) this.currentSection = currentSection
        }

        if(pageTop > 600) {
          this.navbarFixed = !experienceContainerIsScrolled()
          this.showNavbar = true
        } else {
          this.navbarFixed = false
          this.showNavbar = false
        }
      })
    }
  },
  methods: {
    async getExperience (experienceId) {
      try {
        const resp = await this.$axios.$get(`/experiences/${experienceId}`)
        this.experience = resp.experience
        console.log(resp)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .experience-navbar {
    position: absolute;
    bottom: 0;
    left: 0;
    padding-bottom: 2.5rem;
    width: 100%;
    z-index: 2;
    opacity: 0;
    background: linear-gradient(to top, var(--primary), transparent);
    transition: all 0.3s;

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
    z-index: 2;

    &.show {
      transform: translateX(0);
    }
  }

  .reserve-form-floating {
    position: absolute;
    right: 15px;
  }

  .experience-container {
    background: linear-gradient(90deg, #fff 55%, var(--primary) 55%);
  }
</style>