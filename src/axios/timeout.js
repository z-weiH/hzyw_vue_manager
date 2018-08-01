import app from '@/main.js'
let router = app.$router;
import { Message } from 'element-ui'

export default (code,callback) => {
  if(code === '8888') {
    router.push(`/login?returnUrl=${router.history.current.path}`);
    // 清除缓存
    sessionStorage.removeItem('loginInfo');
    sessionStorage.removeItem('menuInfoList');
    Message({
      type: 'error',
      message: '登录超时',
      showClose: true
    });
  }else{
    callback && callback();
  }
}