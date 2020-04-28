const sortFilters = [
  {
    value: 'min_price',
    sort: 'ASC',
    translations: {
      'es_ES': {
        label: 'Precio - menor a mayor'
      },
      'en_EN': {
        label: 'Price - low to high'
      }
    }
  },
  {
    value: 'max_price',
    sort: 'DESC',
    translations: {
      'es_ES': {
        label: 'Precio - mayor a menor'
      },
      'en_EN': {
        label: 'Price - high to low'
      }
    }
  },
  {
    value: 'on_sale',
    sort: 'DESC',
    translations: {
      'es_ES': {
        label: 'En oferta'
      },
      'en_EN': {
        label: 'On sale'
      }
    }
  }
]
export const state = () => ({
  sortFilters,
  filters: {
    category: '',
    destination: '',
    sort: '',
    page: 1
  }
})

export const getters = {
  filters: (state) => {
    return state.filters
  },
  selectedSort: (state) => {
    if(state.filters.sort !== '') {
      const current = state.sortFilters.find(item => {
        return item.value === state.filters.sort
      })

      if(!current) return null

      const resp = {}
      resp.sort = current.sort
      resp.sort_by = current.value

      return resp
    }

    return null
  }
}

export const mutations = {
  SET_FILTER(state, data) {
    state.filters[data.prop] = data.value
  },
  RESET_FILTERS(state) {
    state.filters.category = ''
    state.filters.destination = ''
    state.filters.sort = ''
    state.filters.page = 1
  }
}

export const actions = {
  async getExperiences ({}, params) {
    try {
      const resp = await this.$axios.$get('/experiences', { params })
      return resp.data
    } catch (error) {
      console.error(error)
      return null
    }
  }
}