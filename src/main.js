// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 添加 主题色
import './assets/style/element/index.css'
// 引入 axios
import axios from 'axios'
import './axios'
Vue.prototype.$http = axios;
// 引入 moment
import moment from 'moment'
Vue.prototype.$moment = moment;
// 线上 host
import host from './axios/host'
Vue.prototype.$host = host.target;

import Vtip from 'vtip';
import 'vtip/lib/index.min.css';
// 注册指令使用
Vue.use(Vtip.directive)

// 工具函数调用
Vue.prototype.$tip = Vtip.tip


// 引入jquery
// import $ from 'jquery';
//自定义指令
import './components/script/directive';


// 引入 store
import store from './store'
// 引入 filter
import './filter'

//if(process.env.NODE_ENV === 'development') {
// 引入 element-ui
let ElementUI = require('element-ui');
// 装载 element ui
Vue.use(ElementUI);
//}


/* eslint-disable no-new */
export default new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})