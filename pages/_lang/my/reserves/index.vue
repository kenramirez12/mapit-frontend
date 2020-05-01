<template>
  <div class="container pt-12 pb-4 px-4 mx-auto">
    <h1 class="mb-6 text-2xl md:text-3xl font-light px-2 md:px-0">
      {{ $lang.translate(translations, 'booking_history') }}
    </h1>
    <div class="pb-6">
      <ReservesTableList :reserves="reserves" />
    </div>
    <div
      v-if="reserves && pagination.lastPage > 1"
      class="block mb-6 pb-6">
      <el-pagination
        layout="prev, pager, next"
        :current-page.sync="pagination.page"
        :page-count="pagination.lastPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import ReservesTableList from '~/components/reserves/ReservesTableList'

export default {
  middleware: 'auth',
  async asyncData({ app, params, store, error }) {  
    try {
      const resp = await app.$axios.$get('/reserves')
      const reserves = resp.reserves.data
      const pagination = {
        page: resp.reserves.current_page,
        lastPage: resp.reserves.last_page
      }
      return {
        reserves,
        pagination
      }
    } catch (error) {
      this.$log.error('error', error.response)
    }
  },
  components: {
    ReservesTableList
  },
  data () {
    return {
      translations: {
        'es_ES': {
          booking_history: 'Historial de reservas'
        },
        'en_EN': {
          booking_history: 'Booking History'
        }
      }
    }
  },
  watch: {
    'pagination.page': {
      deep: true,
      handler (value) {
        this.getReserves(value)
      }
    }
  },
  methods: {
    async getReserves(page) {
      this.reserves = null
      try {
        const resp = await this.$axios.$get('/reserves?page=' + page)
        this.reserves = resp.reserves.data
        this.pagination.lastPage = resp.reserves.last_page
      } catch (error) {
        this.reserves = []
        this.lastPage = 1
        this.$log.error('getReserves', error, error.response)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .reserves-container {
    &__title {
      margin-bottom: 3rem;
    }
  }

  .requires-additional {
    &__icon {
      margin-left: .5rem;
  
      &::after {
        border-bottom: 0 !important;
      }
    }
  }
</style>
