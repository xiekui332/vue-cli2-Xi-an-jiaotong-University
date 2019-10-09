// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import axios from './utils/axios.js'
import { store } from './store'
import VPrint from 'vue-print-nb'
import Print from "@/plugs/print"
import 'babel-polyfill';
import './assets/less/base.less'

Vue.prototype.$http = axios; // 调用方式this.$http
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Print);
Vue.use(VPrint);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
