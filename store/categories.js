export const state = () => ({
  categories: null
})

export const getters = {
  categories: (state) => {
    return state.categories
  }
}

export const mutations = {
  SET_CATEGORIES_LIST(state, payload) {
    state.categories = payload
  }
}

export const actions = {
  async getCategories({commit}) {
    try {
      const resp = await this.$axios.$get('/categories')
      commit('SET_CATEGORIES_LIST', resp.categories)
    } catch (error) {
      console.error(error)
    }
  }
}