export const state = () => ({
  destinations: null
})

export const getters = {
  destinations: (state) => {
    return state.destinations
  }
}

export const mutations = {
  SET_DESTINATIONS(state, payload) {
    state.destinations = payload
  }
}

export const actions = {
  async getDestinations ({commit}) {
    try {
      const resp = await this.$axios.$get('/destinations')
      commit('SET_DESTINATIONS', resp.destinations)
    } catch (error) {
      console.error(error)
    }
  }
}