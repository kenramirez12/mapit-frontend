export default ({ app, store }, inject) => {
  inject('lang', {
    translate (translations, translationProp) {
      const currentLang = store.getters.currentLang.iso_lang
      return translations[currentLang][translationProp]
    },
    apiTranslate (translations, translationProp) {
      const currentLang = store.getters.currentLang.iso_lang
      const translation = translations.find(item => item.iso_lang === currentLang)
      if(translation) {
        return translation[translationProp]
      }
    }
  })
}