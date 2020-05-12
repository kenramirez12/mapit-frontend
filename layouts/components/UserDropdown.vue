<template>
  <li class="header-menu__item">
    <el-dropdown
      v-loading="isLoggingOut"
      :disabled="isLoggingOut"
      v-if="loggedIn"
      @command="onCommandDropdown"
      trigger="click"
      placement="bottom">
      <div class="header-menu__link flex items-center">
        <el-badge
          :hidden="user.incomplete_reserves === 0"
          :value="user.incomplete_reserves">
          <img
            :src="userAvatar"
            class="user-dropdown__avatar">
        </el-badge>
        <span class="block h-full user-dropdown__btn">
          {{ user.fullname }}
        </span>
      </div>
      <el-dropdown-menu
        slot="dropdown"
        class="user-dropdown py-0">
        <el-dropdown-item command="profile">
          {{ this.$lang.translate(translations, 'profile') }}
        </el-dropdown-item>
        <el-dropdown-item command="bookings">
          <el-badge :hidden="user.incomplete_reserves === 0" is-dot class="badge__item">
            {{ this.$lang.translate(translations, 'booking_history') }}
          </el-badge>
        </el-dropdown-item>
        <el-dropdown-item command="favorites">
          {{ this.$lang.translate(translations, 'favorites') }}
        </el-dropdown-item>
        <hr class="mt-4">
        <el-dropdown-item
          command="logout"
          class="flex items-center">
          {{ this.$lang.translate(translations, 'logout') }}
          <i v-if="isLoggingOut" class="el-icon-loading ml-3" />
          <img v-else src="~/assets/images/logout-icon.svg" class="ml-3" style="height:16px">
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <a
      v-else
      href="#"
      @click.prevent="setAuthDialogVisible(true)"
      class="header-menu__link">
      {{ $lang.translate(translations, 'login') }}
    </a>
  </li>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      isLoggingOut: false,
      translations: {
        'es_ES': {
          profile: 'Perfil',
          booking_history: 'Historial de reservas',
          favorites: 'Favoritos',
          login: 'Iniciar sesión',
          logout: 'Cerrar sesión'
        },
        'en_EN': {
          profile: 'Profile',
          booking_history: 'Booking history',
          favorites: 'Favorites',
          login: 'Sign in',
          logout: 'Sign out'
        }
      }
    }
  },
  computed: {
    loggedIn () {
      return this.$auth.loggedIn
    },
    user () {
      return this.$auth.$state.user
    },
    userAvatar() {
      if(this.user.avatar !== null) {
        return this.$imagePath(this.user.avatar.path)
      } else if(this.user.avatar_url) {
        return this.user.avatar_url
      } else {
        return '/images/default-avatar.png'
      }
    }
  },
  methods: {
    ...mapMutations({
      setAuthDialogVisible: 'SET_AUTH_DIALOG_VISIBLE'
    }),
    onCommandDropdown(command) {
      if (command === 'logout') {
        this.logout()
      } else {
        this.$router.push(`/${this.$lang.current().slug}/my/${command}`)
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
          this.$log.error('UserDropdown.logout()', e)
        }
        
        this.$message.error('No pudimos cerrar su sesión, por favor inténtelo nuevamente.');
      }
    }
  }
}
</script>

<style lang="scss">
  .badge {
    &__item {
      .el-badge__content {
        top: 10px;
        right: 0!important;
      }
    }
  }

  .user-dropdown {
    box-shadow: 0 0;
    border-radius: 0;
    margin-top: 0 !important;

    &__btn {
      color: #909399;
      transition: color 0.3s;
      display: none;
      margin-right: 0;

      @media screen and (min-width: 920px) {
        margin-left: .75rem;
        display: block;
      }

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