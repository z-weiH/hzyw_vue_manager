// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 引入 element-ui
import ElementUI from 'element-ui'
// 添加 主题色
import './assets/style/element/index.css'
// 引入 axios
import axios from 'axios'
import './axios'
Vue.prototype.$http = axios;
// 引入 store
import store from './store'
// 引入 filter
import './filter'

// 装载 element ui
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
