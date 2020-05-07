<template>
  <div
    v-loading="isLoggingOut"
    @click="handleClick()"
    class="responsive-navbar__item">
    <el-dropdown
      :disabled="isLoggingOut"
      v-if="loggedIn"
      @command="onCommandDropdown"
      trigger="click"
      placement="top-start">
      <div class="responsive-navbar__icon user-icon">
        <el-badge
          :hidden="user.incomplete_reserves === 0"
          :value="user.incomplete_reserves">
          <img :src="userAvatar">
        </el-badge>
      </div>
      <span class="responsive-navbar__label user-label">
        {{ user.fullname.split(' ')[0] }}
      </span>
      <el-dropdown-menu
        slot="dropdown"
        class="user-dropdown py-0">
        <el-dropdown-item command="profile">
          {{ this.$lang.translate(translations, 'profile') }}
        </el-dropdown-item>
        <el-dropdown-item command="reserves">
          <el-badge :hidden="user.incomplete_reserves === 0" is-dot class="badge__item">
            {{ this.$lang.translate(translations, 'booking_history') }}
          </el-badge>
        </el-dropdown-item>
        <el-dropdown-item command="favorites">
          {{ this.$lang.translate(translations, 'favorites') }}
        </el-dropdown-item>
        <hr>
        <el-dropdown-item
          command="logout"
          class="flex items-center">
          {{ this.$lang.translate(translations, 'logout') }}
          <i v-if="isLoggingOut" class="el-icon-loading ml-3" />
          <img v-else src="~/assets/images/logout-icon.svg" class="ml-3" style="height:16px">
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <template v-else>
      <div class="responsive-navbar__icon">
        <img
          :src="`/images/navbar/account-icon${$route.name === 'lang-login' ? '-primary' : ''}.svg`">
      </div>
      <span class="responsive-navbar__label">
        {{ $lang.translate(translations, 'login') }}
      </span>
    </template>
  </div>
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
          login: 'Ingresar',
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
    handleClick() {
      if(!this.loggedIn) {
        this.$router.push(`/${this.$lang.current().slug}/login`)
        // this.setAuthDialogVisible(true)
      }
    },
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

<style lang="scss" scoped>
  .user-icon {
    width: 26px;
    height: 26px;
    margin-bottom: .1rem;

    img {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
</style>