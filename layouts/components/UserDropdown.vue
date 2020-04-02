<template>
  <el-menu-item class="header-menu__item">
    <el-dropdown
      v-if="loggedIn"
      @command="onCommandDropdown"
      trigger="click"
      placement="bottom"
      :hide-on-click="false">
      <div class="flex items-center">
        <img
          v-if="user.from_social === 1 && user.avatar_url !== ''"
          :src="user.avatar_url"
          class="user-dropdown__avatar mr-3">
        <span class="block h-full user-dropdown__btn">{{ user.fullname }}</span>
      </div>
      <el-dropdown-menu
        slot="dropdown"
        class="user-dropdown py-0">
        <el-dropdown-item>Perfil</el-dropdown-item>
        <el-dropdown-item>Historial de reservas</el-dropdown-item>
        <el-dropdown-item>Favoritos</el-dropdown-item>
        <hr class="mt-4">
        <el-dropdown-item
          :disabled="isLoggingOut"
          command="logout"
          class="flex items-center">
          Cerrar sesión
          <i v-if="isLoggingOut" class="el-icon-loading ml-3" />
          <img v-else src="~/assets/images/logout-icon.svg" class="ml-3" style="height:16px">
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span
      v-else
      @click="setAuthDialogVisible(true)"
      class="block h-full">
      {{ $lang.translate(translations, 'login') }}
    </span>
  </el-menu-item>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    translations: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data () {
    return {
      isLoggingOut: false
    }
  },
  computed: {
    loggedIn () {
      return this.$auth.loggedIn
    },
    user () {
      return this.$auth.$state.user
    }
  },
  methods: {
    ...mapMutations({
      setAuthDialogVisible: 'SET_AUTH_DIALOG_VISIBLE'
    }),
    onCommandDropdown(command) {
      if (command === 'logout') {
        this.logout()
      }
    },
    async logout () {
      this.isLoggingOut = true
      try {
        await this.$auth.logout()
        this.isLoggingOut = false
      } catch (e) {
        this.isLoggingOut = false
        if(process.env.NODE_ENV === 'dev') {
          console.error('UserDropdown.logout()', e)
        }
        
        this.$message.error('No pudimos cerrar su sesión, por favor inténtelo nuevamente.');
      }
    }
  }
}
</script>

<style lang="scss">
  .user-dropdown {
    box-shadow: 0 0;
    border-radius: 0;
    margin-top: 0 !important;

    &__btn {
      color: #909399;
      transition: color 0.3s;

      &:hover {
        color: #000;
      }
    }

    &__avatar {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      object-fit: cover;
    }

    .popper__arrow {
      display: none;
    }
  }
</style>