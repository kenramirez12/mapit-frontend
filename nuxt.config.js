require('dotenv').config()

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'MAP IT',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/images/favicon.png' }
    ]
  },
  env: {
    baseUrl: process.env.BASE_URL,
    apiUrl: process.env.API_URL || 'http://127.0.0.1:8000/api',
    imageUrl: process.env.IMAGE_URL || 'http://127.0.0.1:8000',
    visanetMerchantId: process.env.VISANET_MERCHANT_ID
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#37D7D7' },
  /*
  ** Global CSS
  */
  css: [
    // 'element-ui/lib/theme-chalk/index.css',
    '@/assets/scss/main.scss',
    'swiper/dist/css/swiper.css',
    'tailwindcss/dist/base.css',
    'tailwindcss/dist/components.css',
    'tailwindcss/dist/utilities.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    { src: '@/plugins/swiper.js', ssr: false },
    { src: '@/plugins/phone-code.js', ssr: false },
    '@/plugins/lang',
    '@/plugins/api-image',
    '@/plugins/skeleton'
  ],
  axios: {
    baseURL: process.env.API_URL || 'http://localhost:8000/api'
  },
  auth: {
    redirect: {
      home: false
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'access_token' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/user', method: 'get', propertyName: 'user' }
        },
        // tokenRequired: true,
        // tokenType: 'bearer'
        // autoFetchUser: true
      },
      facebook: {
        client_id: '562460637810420',
        userinfo_endpoint: 'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email',
        scope: ['public_profile', 'email'],
        redirect_uri:'http://localhost:3000/callback'
      }
    }
  },
  /*
  ** Nuxt.js dev-modules
  */
 buildModules: [
],
/*
** Nuxt.js modules
*/
modules: [
  '@nuxtjs/axios',
  '@nuxtjs/auth',
  '@nuxtjs/dotenv',
  'fullpage-nuxt'
  ],
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
