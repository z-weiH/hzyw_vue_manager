import axios from 'axios'
import qs from 'qs' 

axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截
axios.interceptors.request.use((request) => {
    // post 请求 使用 form Data 请求方式
    if(request.method === 'post'){
        request.data = qs.stringify(request.data);
    }
    return request;
});

// 响应拦截
axios.interceptors.response.use((response) =>{
    return response.data;
});


export default axios