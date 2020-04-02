<template>
  <el-menu
    class="ml-auto header-menu"
    mode="horizontal"
    :router="true"
    :unique-opened="true">
    <el-menu-item :index="`/${$lang.current().slug}/experiences`" class="header-menu__item">{{ $lang.translate(translations, 'experiences') }}</el-menu-item>
    <el-menu-item :index="`/${$lang.current().slug}/destinations`" class="header-menu__item">{{ $lang.translate(translations, 'destinations') }}</el-menu-item>
    <el-menu-item :index="`/${$lang.current().slug}/about`" class="header-menu__item">{{ $lang.translate(translations, 'about') }}</el-menu-item>
    <el-menu-item :index="`/${$lang.current().slug}/blog`" class="header-menu__item">{{ $lang.translate(translations, 'blog') }}</el-menu-item>
    <el-menu-item :index="`/${$lang.current().slug}/faq`" class="header-menu__item">{{ $lang.translate(translations, 'faqs') }}</el-menu-item>
    <UserDropdown :translations="translations" />
    <template v-for="(lang, n) in langs">
      <el-menu-item
        v-if="$lang.current().iso_lang !== lang.iso_lang"
        :key="'lang_' + n"
        @click.native="updateLang(lang)"
        class="header-menu__item">
        {{ lang.code }}
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import UserDropdown from '~/layouts/components/UserDropdown'

export default {
  components: {
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
    border-bottom: 0!important;

    &__item {
      border: 0;
      height: var(--header-height)!important;
      line-height: var(--header-height)!important;

      &:hover {
        box-shadow: inset 0 3px 0px 0px var(--primary);
      }
    }
  }
</style>
