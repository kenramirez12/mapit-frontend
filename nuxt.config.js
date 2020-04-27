require('dotenv').config()

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'MAP IT - Responsible travel in Peru',
    meta: [
      { charset: 'utf-8' },
      { property: 'og:type', content: 'website' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'og:image', name: 'og:image', content: process.env.BASE_URL + '/images/home/banner.jpg' },
      { hid: 'description', name: 'description', content: 'Find things to do in Peru: food tours, art tours, experiences with local communities, what to do at night, and much more.' },
      { hid: 'og:description', name: 'og:description', content: 'Find things to do in Peru: food tours, art tours, experiences with local communities, what to do at night, and much more.' },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/images/favicon.png' }
    ]
  },
  env: {
    baseUrl: process.env.BASE_URL,
    apiUrl: process.env.API_URL || 'http://127.0.0.1:8000/api',
    imageUrl: process.env.IMAGE_URL || 'http://127.0.0.1:8000',
    visanetMerchantId: process.env.VISANET_MERCHANT_ID,
    onlineId: process.env.ONLINE_ID
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
    { src: '@/plugins/fullpage.js', ssr: false },
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
    '@nuxtjs/moment'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv',
    '@nuxtjs/recaptcha'
  // 'fullpage-nuxt'
  ],
  recaptcha: {
    hideBadge: true,
    siteKey: '6LeBpe4UAAAAAEGnUNlJfxIdqheEJqzvX0txn_9V',
    version: 3
  },
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
