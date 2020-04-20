<template>
  <div>
    <FaqsList :class="{ show : showFaqsDropdown }" />
    <div class="responsive-navbar">
      <div class="responsive-navbar__list">
        <div
          @click="$router.push(`/${$lang.current().slug}/experiences`)"
          class="responsive-navbar__item">
          <div class="responsive-navbar__icon">
            <img
              :src="`/images/navbar/experiences-icon${$route.name === 'lang-experiences' ? '-primary' : ''}.svg`">
          </div>
          <span class="responsive-navbar__label">
            {{ $lang.translate(translations, 'experiences') }}
          </span>
        </div>
        <div
          @click="$router.push(`/${$lang.current().slug}/destinations`)"
          class="responsive-navbar__item">
          <div class="responsive-navbar__icon">
            <img
              :src="`/images/navbar/destinations-icon${$route.name === 'lang-destinations' ? '-primary' : ''}.svg`">
          </div>
          <span class="responsive-navbar__label">
            {{ $lang.translate(translations, 'destinations') }}
          </span>
        </div>
        <div
          class="responsive-navbar__item"
          @click="showFaqsDropdown = !showFaqsDropdown">
          <div class="responsive-navbar__icon">
            <img
              :src="`/images/navbar/faqs-icon${showFaqsDropdown ? '-primary' : ''}.svg`">
          </div>
          <span class="responsive-navbar__label">FAQs</span>
        </div>
        <NavbarUserDropdown />
      </div>
      <el-dropdown
        trigger="click"
        placement="top-end"
        @visible-change="(value) => moreVisible = value"
        @command="onCommandDropdown">
        <div class="more-btn__container">
          <el-button
            icon="el-icon-more"
            circle
            :class="{ active: moreVisible }"
            class="more-btn" />
        </div>
        <el-dropdown-menu
          slot="dropdown"
          class="user-dropdown py-0">
          <el-dropdown-item command="home">
            Home
          </el-dropdown-item>
          <el-dropdown-item command="about">
            About Us
          </el-dropdown-item>
          <el-dropdown-item command="blog">
            Blog
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import NavbarUserDropdown from '@/layouts/components/NavbarUserDropdown'
import FaqsList from '@/layouts/components/FaqsList'

export default {
  components: {
    NavbarUserDropdown,
    FaqsList
  },
  data() {
    return {
      showFaqsDropdown: false,
      moreVisible: false,
      translations:  {
        es_ES: {
          experiences: 'Experiencias',
          destinations: 'Destinos',
          login: 'Ingresar'
        },
        en_EN: {
          experiences: 'Experiences',
          destinations: 'Destinations',
          login: 'Log in'
        }
      }
    }
  },
  methods: {
    onCommandDropdown(value) {
      const langSlug = this.$lang.current().slug

      switch (value) {
        case 'home':
          return this.$router.push(`/${langSlug}/`)
          break;
        case 'about':
          return this.$router.push(`/${langSlug}/about`)
          break;
      
        default:
          break;
      }
    }
  }
}
</script>

<style lang="scss">
  .more-btn {
    font-size: 1.7rem;
    padding: 0!important;
    transform: rotate(90deg);
    border: 0;
    padding: 5px;
    width: 40px;
    height: 40px;
    margin-left: auto;
    color: #9f9f9f;

    &:focus, &:hover, &:active {
      background: transparent;
    }

    &.active {
      color: var(--primary);
    }

    &__container {
      display: flex;
      height: 80px;
      align-items: center;
    }
  }
</style>

<style lang="scss">
  .responsive-navbar {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%;
    height: 80px;
    background-color: #fff;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    z-index: 99;
    padding-left: .5rem;

    @media screen and (min-width: 768px) {
      display: none;
    }

    &__list {
      display: flex;
      width: calc(100% - 40px);
      height: 80px;
    }

    &__item {
      flex: 1;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__icon {
      width: 22px;
      height: 22px;
      margin-right: auto;
      margin-left: auto;
      margin-bottom: .5rem;

      img {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
      }
    }

    &__label {
      white-space: nowrap;
      font-weight: 300 !important;
      font-size: 11px !important;
      color: #000 !important;
    }
  }
</style>