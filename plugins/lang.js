export default ({ app, store }, inject) => {
  inject('lang', {
    translate (translations, translationProp) {
      const currentLang = store.getters.currentLang.iso_lang
      return translations[currentLang][translationProp]
    }
  })
}