<template>
  <el-menu class="ml-auto header-menu" mode="horizontal" :router="true">
    <el-menu-item index="/experiences" class="header-menu__item">{{ $lang.translate(translations, 'experiences') }}</el-menu-item>
    <el-menu-item index="/destinations" class="header-menu__item">{{ $lang.translate(translations, 'destinations') }}</el-menu-item>
    <el-menu-item index="/about" class="header-menu__item">{{ $lang.translate(translations, 'about') }}</el-menu-item>
    <el-menu-item index="/blog" class="header-menu__item">{{ $lang.translate(translations, 'blog') }}</el-menu-item>
    <el-menu-item index="/faq" class="header-menu__item">{{ $lang.translate(translations, 'faqs') }}</el-menu-item>
    <el-menu-item index="/login" class="header-menu__item">{{ $lang.translate(translations, 'login') }}</el-menu-item>
    <template v-for="(lang, n) in langs">
      <el-menu-item
        :key="'lang_' + n"
        v-if="currentLang.iso_lang !== lang.iso_lang"
        @click.native="setLang(lang.code)"
        class="header-menu__item">
        {{ lang.code }}
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
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
    }),

    ...mapGetters(['currentLang'])
  },
  methods: {
    ...mapMutations(['setLang'])
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