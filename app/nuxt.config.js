module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [{innerHTML: `gapi.client.init({
      apiKey: 'AIzaSyAU3DJEHQa62-gVE24F2mmvmfutW8M0OXs',
      clientId: '951188458290-nl1vl4d0evp017sh8ae2q3cmrlnbm9nq.apps.googleusercontent.com',
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"],
      scope: "https://www.googleapis.com/auth/tasks.readonly"
    })`},{src: 'https://apis.google.com/js/api.js', defer: true, async: true, onload: "this.onload=function(){};handleClientLoad()", onreadystatechange: "if (this.readyState === 'complete') this.onload()"}]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      config.node = {
        fs: "empty",
        child_process : 'empty',
        net : 'empty',
        tls: 'empty',
        readline: 'empty'
      };
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}



// 722835941202-b45c6jlvsj6ibbjln255o9323onhcif2.apps.googleusercontent.com
// AIzaSyDPsX5s3B_tMcpHEWeVRi2zKsXoLShzJgQ