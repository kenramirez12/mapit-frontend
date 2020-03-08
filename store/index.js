const langs = [
  {
    iso_lang: 'es_ES',
    code: 'ESP',
    label: 'Español'
  },
  {
    iso_lang: 'en_EN',
    code: 'ENG',
    label: 'English'
  }
]

const experiences = [
  { label: 'Adventure', value: 'Adventure' },
  { label: 'Nature', value: 'Nature' },
  { label: 'Art & Music', value: 'Art & Music' },
]

const destinations = [
  { label: 'Cusco', value: 'Cusco' },
  { label: 'Lima', value: 'Lima' },
]

const categories = [
  { label: 'Adventure', value: 'adv' },
  { label: 'Nature', value: 'nat' },
  { label: 'Art & Music', value: 'art' },
  { label: 'Andean Traditions', value: 'and' },
  { label: 'Food&Drinks', value: 'food' }
]

export const state = () => ({
  experiences,
  destinations,
  categories,
  langs,
  currentLangCode: 'ESP'
})

export const getters = {
  currentLang: (state) => {
    return state.langs.find(lang => lang.code === state.currentLangCode)
  }
}

export const mutations = {
  setLang(state, langCode) {
    state.currentLangCode = langCode
  }
}