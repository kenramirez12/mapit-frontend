export const state = () => ({
  categories: null,
  currentCategory: ''
})

export const getters = {
  categories: (state) => {
    return state.categories
  },
  currentCategory: (state) => {
    return state.currentCategory
  }
}

export const mutations = {
  SET_CURRENT_CATEGORY(state, categoryId) {
    state.currentCategory = categoryId
  },
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
      return error
    }
  }
}