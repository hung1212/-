import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
Vue.prototype.$http = axios
Vue.config.productionTip = false
import router from './router'
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
