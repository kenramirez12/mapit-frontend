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

export const state = () => ({
  experiences,
  destinations,
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