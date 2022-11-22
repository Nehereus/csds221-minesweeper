//imports
  import vue from 'vue';
  import vuetify from 'vuetify';
  import router from 'vue-router';
  import paths from './routing.config';
  import app from './app.vue';

  /* import the fontawesome core */
  import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
//import toasted
import Toasted from 'vue-toasted';




//use
vue.use(Toasted)
  vue.use(router);
  vue.use(vuetify);
  vue.config.productionTip = false
  new vue({
    router: new router({routes: paths}),
    vuetify: new vuetify(),
    render: h => h(app)
  }).$mount('#app')
