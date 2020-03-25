import Vue from 'vue'
const fn = path => {
  return process.env.imageUrl + path
}

Vue.prototype.$imagePath = fn
Vue.filter('imagePath', fn)
