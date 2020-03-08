<template>
  <div>
    <PageHeader
      title="Prepara chocolate artesanal, chicha de jora y adornos de cerámica"
      subtitle="Cusco"
      contentClass="mr-6">
      <ExperienceReserveForm class="ml-5" />
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
              <img v-if="currentSection === section.name" class="experience-navbar__arrow-current" src="~/assets/images/point-small-dark.svg" alt="">
              <img v-else class="experience-navbar__arrow" src="~/assets/images/small-dark-arrow.svg" alt="">
            </div>
          </div>
        </div>
      </div>
      <OverviewSection />
      <ActivitiesSection />
      <ProgramSection />
      <AdditionalInfoSection />
      <SocialPointsSection />
      <TestimonialSection />
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
  mounted() {
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
      if(testimonialSection.getBoundingClientRect().top < 100) {
        return 'testimonials'
      } else if(socialPointsSection.getBoundingClientRect().top < 100) {
        return 'social-points'
      } else if(additionalInfoSection.getBoundingClientRect().top < 100) {
        return 'additional-info'
      } else if(programSection.getBoundingClientRect().top < 100) {
        return 'program'
      } else if(activitiesSection.getBoundingClientRect().top < 100) {
        return 'activities'
      } else if(overviewSection.getBoundingClientRect().top < 100) {
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
}
</script>

<style lang="scss" scoped>
  .experience-navbar {
    position: absolute;
    bottom: 2.5rem;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #000;
    z-index: 2;
    opacity: 0;
    transition: all 0.3s;

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