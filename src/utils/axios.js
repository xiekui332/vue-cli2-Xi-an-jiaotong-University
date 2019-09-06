import axios from 'axios'
import {
    Notification,
    Message
} from 'element-ui'
import $router from '../router/index' 
import { getSession } from './util'


const service = axios.create({
    baseURL: process.env.NODE_ENV === "development"?'':'http://192.168.31.176:8081/', // 请求URL前缀。和/config/index.js文件中api配置及后台保持同步更改。
    timeout: 10000, // 超时
    withCredentials: true // 表示跨域请求时是否需要使用凭证，即cookie等验证信息。参考：https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/withCredentials
    
});

// 添加 request 拦截器

service.interceptors.request.use(
    
    config => {
        let token = getSession('token')
        if(token) {
            // console.log(JSON.parse(sessionStorage.getItem("token")))
            config.headers = {
                // "Authorization":"Bearer " + JSON.parse(sessionStorage.getItem("token")),
                'Content-Type':'application/json'
            }
        }else{
            $router.push({
                path:'/'
            })
        }
        return config;
    }, err => {
        console.log('请求失败')
        return Promise.reject(err)
    }
)

// 添加 response 拦截器
service.interceptors.response.use(config => {
    if(config.status==200){
        return config.data;
    }
    if(config.status==401){
      return  $router.push({ path:'/'})
    }
    return config;
}, err => {
    console.log('响应失败')
    return Promise.reject(err)
})

export default service