import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import Cloudbase from "@cloudbase/vue-provider";
Vue.use(Cloudbase, {
  env: "cloud1-8g67o253ae1b4cab"
});

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
