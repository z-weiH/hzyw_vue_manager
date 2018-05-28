import axios from 'axios'
import qs from 'qs' //formdata序列化
import {
  Message,
  MessageBox,
} from 'element-ui'
import Vue from 'vue'
import router from '../router'



axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


//设置全局的请求次数，以及配置请求的间隙
axios.defaults.retry = 3;
axios.defaults.retryDelay = 1000;

axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
  var config = err.config;
   // 判断是否是formdata格式
   // post 请求 使用 form Data 请求方式
   if (config.method === 'post' && config.mheaders !== true)
    config.data = qs.stringify(config.data);
  // If config does not exist or the retry option is not set, reject
  if (!config || !config.retry) return Promise.reject(err);

  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0;

  // Check if we've maxed out the total number of retries
  if (config.__retryCount >= config.retry) {
    // Reject with the error
    return Promise.reject(err);
  }

  // Increase the retry count
  config.__retryCount += 1;

  // Create new promise to handle exponential backoff
  var backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, config.retryDelay || 1);
  });

  // Return the promise in which recalls axios to retry the request
  return backoff.then(function () {
    return axios(config);
  });
});


// 响应拦截
axios.interceptors.response.use((res) => {
  if (res.data.code != '0000') {
    Message({
      type: 'error',
      message: res.data.description,
      duration: 5000,
      showClose: true
    });
    return Promise.reject(res);
  }
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
