<template>
  <div>
    <FaqsList :class="{ show : showFaqsDropdown }" />
    <div class="responsive-navbar">
      <el-dropdown
        trigger="click"
        placement="top-start"
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
          <el-dropdown-item command="blog">
            Blog
          </el-dropdown-item>
          <el-dropdown-item command="faqs">
            FAQs
          </el-dropdown-item>
          <template v-for="(lang, n) in langs">
            <el-dropdown-item
              v-if="$lang.current().iso_lang !== lang.iso_lang"
              :key="'lang_' + n"
              :command="lang.slug"
              divided>
              {{ lang.code }}
            </el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="responsive-navbar__list">
        <div
          @click="$router.push(`/${$lang.current().slug}`)"
          class="responsive-navbar__item">
          <div class="responsive-navbar__icon">
            <img
              :src="`/images/navbar/experiences-icon${$route.name === 'lang' ? '-primary' : ''}.svg`">
          </div>
          <span class="responsive-navbar__label">
            {{ $lang.translate(translations, 'home') }}
          </span>
        </div>
        <div
          @click="$router.push(`/${$lang.current().slug}/experiences`)"
          class="responsive-navbar__item">
          <div class="responsive-navbar__icon">
            <img
              :src="`/images/navbar/destinations-icon${$route.name === 'lang-experiences' ? '-primary' : ''}.svg`">
          </div>
          <span class="responsive-navbar__label">
            {{ $lang.translate(translations, 'experiences') }}
          </span>
        </div>
        <div
          class="responsive-navbar__item"
          @click="$router.push(`/${$lang.current().slug}/about`)">
          <div class="responsive-navbar__icon">
            <img
              :src="`/images/navbar/faqs-icon${showFaqsDropdown ? '-primary' : ''}.svg`">
          </div>
          <span class="responsive-navbar__label">
            {{ $lang.translate(translations, 'about') }}
          </span>
        </div>
        <NavbarUserDropdown />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
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
          home: 'Inicio',
          experiences: 'Experiencias',
          destinations: 'Destinos',
          about: 'About',
          login: 'Ingresar'
        },
        en_EN: {
          home: 'Home',
          experiences: 'Experiences',
          destinations: 'Destinations',
          about: 'About',
          login: 'Log in'
        }
      }
    }
  },
  computed: {
    ...mapState({
      langs: s => s.langs
    })
  },
  methods: {
    ...mapMutations({
      setLang: 'SET_LANG'
    }),
    updateLang (lang) {
      const current = this.langs.find(item => {
        return item.slug === lang
      })

      if(current) {
        this.setLang(current.code)
  
        const dest = this.$route
        dest.params.lang = lang
        this.$router.push(dest)
      }
    },
    onCommandDropdown(value) {
      const langSlug = this.$lang.current().slug

      switch (value) {
        case 'home':
          return this.$router.push(`/${langSlug}/`)
          break;
        case 'about':
          return this.$router.push(`/${langSlug}/about`)
          break;
        case 'faqs':
          return this.$router.push(`/${langSlug}/faqs`)
          break;
        case 'es':
          return this.updateLang('es')
          break;
        case 'en':
          return this.updateLang('en')
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
      height: 65px;
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
    height: 65px;
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
      height: 65px;
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
        margin: auto;
      }
    }

    &__label {
      white-space: nowrap;
      font-weight: 300 !important;
      font-size: 10px !important;
      color: #000 !important;

      @media screen and (min-width: 520px) {
        font-size: 11px !important;
      }
    }
  }
</style>