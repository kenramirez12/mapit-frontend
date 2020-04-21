<template>
  <ul class="header-menu ml-auto">
    <li
      v-for="(link, n) in links"
      :key="'link_' + n"
      :class="{ active : $route.name === `lang-${link}` }"
      class="header-menu__item">
      <a
        href="#"
        @click.prevent="$router.push(`/${$lang.current().slug}/${link}`)"
        class="header-menu__link">
        {{ $lang.translate(translations, link) }}
      </a>
    </li> 
    <li :class="{ active : $route.name === 'lang-blog' }" class="header-menu__item">
      <a href="https://medium.com/map-it-blog" target="_blank" class="header-menu__link">
        {{ $lang.translate(translations, 'blog') }}
      </a>
    </li>
    <FaqsDropdown />
    <UserDropdown :translations="translations" />
    <template v-for="(lang, n) in langs">
      <li
        v-if="$lang.current().iso_lang !== lang.iso_lang"
        :key="'lang_' + n"
        class="header-menu__item">
        <a href="#" @click.prevent="updateLang(lang)" class="header-menu__link">{{ lang.code }}</a>
      </li>
    </template>
  </ul>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import FaqsDropdown from '~/layouts/components/FaqsDropdown'
import UserDropdown from '~/layouts/components/UserDropdown'

export default {
  components: {
    FaqsDropdown,
    UserDropdown
  },
  data () {
    return {
      translations: {
        'es_ES': {
          experiences: 'Experiencias',
          destinations: 'Destinos',
          about: 'Quiénes somos',
          blog: 'Blog',
          faqs: 'FAQs',
          login: 'Iniciar sesión'
        },
        'en_EN': {
          experiences: 'Experiences',
          destinations: 'Destinations',
          about: 'About Us',
          blog: 'Blog',
          faqs: 'FAQs',
          login: 'Log In'
        }
      },
      links: ['experiences', 'destinations', 'about']
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
      this.setLang(lang.code)

      const dest = this.$route
      dest.params.lang = lang.slug
      this.$router.push(dest)
    }
  }
}
</script>

<style lang="scss">
  .header-menu {
    display: flex;
    border-bottom: 0!important;

    &__item {
      cursor: pointer;
      user-select: none;
      
      &.active {
        .header-menu__link {
          color: #303133;
          box-shadow: inset 0 2px 0px 0px var(--primary);
        }
      }
    }

    &__link {
      position: relative;
      display: flex;
      padding: 0 20px;
      font-size: 14px;
      color: #909399;
      border: 0;
      height: var(--header-height)!important;
      line-height: var(--header-height)!important;
      transition: all 0.25s;

      &:hover {
        color: #303133;
        box-shadow: inset 0 2px 0px 0px var(--primary);
      }
    }
  }
</style>
