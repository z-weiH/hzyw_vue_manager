import axios from 'axios'
import qs from 'qs' 

axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截
axios.interceptors.request.use((request) => {
    return request;
});

// 响应拦截
axios.interceptors.response.use((response) =>{
    return response;
});


export default axios