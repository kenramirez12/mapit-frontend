export const state = () => ({
  experience: null,
  form: {
    experienceId: '8',
    date: '',
    groupSize: '',
    time: '',
    extras: [],
    message: '',
    fullname: '',
    docNumber: '',
    email: '',
    birthdate: '',
    country: '',
    phone: '',
    arrivalDate: ''
  },
  willCheckout: false,
  checkoutStep: 1,
  availableHours: null
})

export const getters = {
  willCheckout: (state) => {
    return state.willCheckout
  },
  currentStep: (state) => {
    return state.checkoutStep
  },
  currentExperience: (state) => {
    return state.experience
  },
  igv: (state, getters) => {
    if(!state.experience) return null
    if(state.form.country === 'PE') {
      return getters.subpricePerPerson * 0.18
    } else return 0
  },
  reservePrice: (state) => {
    if(!state.experience) return null
    if(state.experience.price_type === 1) return state.experience.normal_price
    if(state.form.groupSize === '') return state.experience.min_price
    
    const possiblePrices = state.experience.group_prices
      .filter((item) => {
        return item.length >= state.form.groupSize
      })
      .sort((a,b) => {
        a.length-b.length
      })
    
    return parseInt(possiblePrices[0].price).toFixed(2)
  },
  subpricePerPerson: (state, getters) => {
    if(!state.experience) return null
    let price = parseFloat(getters.reservePrice)

    if(state.form.extras.length > 0) {
      state.experience.extras.forEach(extra => {
        if(state.form.extras.includes(extra.id)) {
          price += parseFloat(extra.price)
        }
      })
    }

    return price
  },
  pricePerPerson: (state, getters) => {
    if(!state.experience) return null
    return getters.subpricePerPerson + getters.igv
  },
  totalPrice: (state, getters) => {
    return getters.pricePerPerson * state.form.groupSize
  },
  availableDays: (state) => {
    if (!state.experience) return null

    const availableDays = []
    state.experience.schedules.forEach(item => {
      item.days.forEach(day => {
        if (!availableDays.includes(day)) {
          availableDays.push(day === 7 ? 0 : day)
        }
      })
    })

    return availableDays
  },
  holidaysArray: (state) => {
    if(!state.experience || !('holidays' in state.experience) || state.experience.holidays.length === 0) return null
    return state.experience.holidays.map(item => item.date)
  },
  availableHours: (state) => {
    return state.availableHours
  },
  hasAvailableHours: (state) => {
    if(state.availableHours === null || state.availableHours.length === 0) {
      return false
    }

    let flag =  false
    for(let i = 0; i < state.availableHours.length; i++) {
      if(state.availableHours[i].available_quota >= state.form.groupSize) {
        flag = true
      }
    }

    return flag
  }
}

export const mutations = {
  UPDATE_WILL_CHECKOUT(state, value) {
    state.willCheckout = value
  },
  SET_CHECKOUT_STEP(state, step) {
    state.checkoutStep = step
  },
  SET_EXPERIENCE(state, payload) {
    state.experience = payload
    state.form.experienceId = payload.id
  },
  SET_RESERVE_FIELD(state, data) {
    state.form[data.field] = data.value
  },
  RESET_FORM(state) {
    state.experience = null
    state.availableHours = null
    state.willCheckout = false
    state.checkoutStep = 1
    state.form.experienceId = ''
    state.form.date = ''
    state.form.groupSize = ''
    state.form.time = ''
    state.form.extras = []
  },
  SET_AVAILABLE_HOURS(state, payload) {
    state.availableHours = payload
  }
}

export const actions = {
  async getAvailableHours ({ state, commit }) {
    if(!state.form.experienceId) return false
    
    const data = {
      date: state.form.date,
      group_size: state.form.groupSize
    }

    try {
      const resp = await this.$axios.post(`/experiences/${state.form.experienceId}/reserve/available`, data)
      commit('SET_AVAILABLE_HOURS', resp.data.available_hours)
      return true
    } catch (error) {
      return false
    }
  }
}