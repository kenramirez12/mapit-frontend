<template>
  <el-menu class="ml-auto header-menu" mode="horizontal" :router="true">
    <el-menu-item index="/experiences" class="header-menu__item">Experiences</el-menu-item>
    <el-menu-item index="/destinations" class="header-menu__item">Destinations</el-menu-item>
    <el-menu-item class="header-menu__item">About Us</el-menu-item>
    <el-menu-item class="header-menu__item">FAQs</el-menu-item>
    <el-menu-item class="header-menu__item">Iniciar sesión</el-menu-item>
    <el-menu-item class="header-menu__item">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ currentLang.code }}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(lang, n) in langs"
            :key="'lang_' + n"
            @click.native="setLang(lang.code)">
            {{ lang.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
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
        box-shadow: inset 0 6px 0px 0px var(--primary);
      }
    }
  }
</style>