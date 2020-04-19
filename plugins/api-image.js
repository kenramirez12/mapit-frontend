import Vue from 'vue'
const fn = path => {
  return process.env.imageUrl + path
}

Vue.prototype.$imagePath = fn
Vue.filter('imagePath', fn)

Vue.mixin({
  methods: {
    imageToBase64: (file) => {
      return new Promise((res, rej) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        
        fileReader.onload = (e) => {
          res(e.target.result)
        }
      })
    }
  }
})
