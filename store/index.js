const langs = [
  {
    iso_lang: 'es_ES',
    slug: 'es',
    code: 'ESP',
    label: 'Español'
  },
  {
    iso_lang: 'en_EN',
    slug: 'en',
    code: 'ENG',
    label: 'English'
  }
]

export const state = () => ({
  langs,
  currentLangCode: 'ESP',
  authDialogVisible: false
})

export const getters = {
  currentLang: (state) => {
    return state.langs.find(lang => lang.code === state.currentLangCode)
  },
  authDialogVisible: (state) => {
    return state.authDialogVisible
  }
}

export const mutations = {
  SET_AUTH_DIALOG_VISIBLE(state, value) {
    state.authDialogVisible = value
  },
  SET_LANG(state, langCode) {
    state.currentLangCode = langCode
  },
  SET_LANG_BY_SLUG(state, langSlug) {
    const code = state.langs.find(item => item.slug === langSlug)
    if(code) {
      state.currentLangCode = code.code
    }
  }
}