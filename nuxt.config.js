
module.exports = {
  ssr: true,
  telemetry: false,

  head: {
     htmlAttrs: {
        lang: 'ru',
      },
    title: 'Выбери свой продукт !',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
  ],
  
  loading: { color: '#3B8070' },

  plugins: [
  ],

  buildModules: [
  ],
 
  modules: [
    '@nuxtjs/axios'
  ],
 
  build: {
  
    extend (config, ctx) {
    }
  }
}
