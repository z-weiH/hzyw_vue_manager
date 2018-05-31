import axios from 'axios'
import qs from 'qs' //formdata序列化
import {
  Message,
  MessageBox,
} from 'element-ui'
import Vue from 'vue'
import router from '../router'



axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// 请求拦截
axios.interceptors.request.use((config) => {
  // 判断是否是formdata格式
  // post 请求 使用 form Data 请求方式
  let token='';
  if(JSON.parse(localStorage.getItem('loginInfo')))
    token= JSON.parse(localStorage.getItem('loginInfo')).token;
  config.headers['token'] = token;
  if (config.method === 'post' && config.mheaders !== true) {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 响应拦截
axios.interceptors.response.use((res) => {
  // 联调的时候下面这段开启
  if (res.data.code != '0000') {
    Message({
      type: 'error',
      message: res.data.description,
      duration: 5000,
      showClose: true
    });
    return Promise.reject(res);
  }
  // end
  return res.data;
}, (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        Message({
          type: 'error',
          message: '用户发出的请求有错误',
          duration: 5000
        });
        break;
      case 404:
        Message({
          type: 'error',
          message: '请求不存在',
          duration: 5000
        });
        break;
      case 500:
        Message({
          type: 'error',
          message: '服务器发生错误',
          duration: 5000
        });
        break;
      default :
        Message({
          type: 'error',
          message: '网络出错，请稍候再次尝试',
          duration: 5000
        });
        break;
    }
  }
  return Promise.reject(error);
});




export default axios
