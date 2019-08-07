import axios from 'axios'
import {
    Notification,
    Message
} from 'element-ui'
import $router from '../router/index' 
import { getSession } from './util'
 
const $http = axios.create({
    baseURL: '', // 请求URL前缀。和/config/index.js文件中api配置及后台保持同步更改。
    timeout: 5000, // 超时
    responseType: 'json', // 返回数据格式
    withCredentials: true // 表示跨域请求时是否需要使用凭证，即cookie等验证信息。参考：https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/withCredentials
    
});

// 添加【请求】拦截器
$http.interceptors.request.use(function (config) {  
    // 在发送请求之前做些什么
    config.data = JSON.stringify(config.data); // 序列化后的 JSON 字符串.
    let token = getSession('token')
    if(!token) {
        $router.push({
            path:'/'
        })
    }
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
});

// 添加【响应】拦截器
$http.interceptors.response.use(function (response) {

    if (!response.data) {
        return;
    } 
    return response.data  
}, function (error) { 
    // 对响应错误做点什么
    var status = (error.response && error.response.status) || '';
    var statusText = (error.response && error.response.statusText) || '';

    if (status !== 200) { 
    }
    return Promise.reject(error.response)
});

export default $http
