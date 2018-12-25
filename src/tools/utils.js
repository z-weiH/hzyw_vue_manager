import Vue from 'vue'
import qs from 'qs'

// 获取url中-key对应的value
/*****
 *@param _type:key名称
 *@param _url: 地址string片段
 */
const getUrlParam = (_type, _url) => {
  var url = _url || window.location.href
  if (new RegExp('.*\\b' + _type + '\\b(\\s*=([^&]+)).*', 'gi').test(url)) {
    return RegExp.$2
  } else {
    return null
  }
}

Vue.prototype.$getUrlParam = getUrlParam
