import axios from 'axios'
import {
    Notification,
    Message
} from 'element-ui'
import $router from '../router/index' 
import { getSession,setSession } from './util'


const service = axios.create({
    baseURL: process.env.NODE_ENV === "development"?'':'http://10.49.7.111/', // 请求URL前缀。和/config/index.js文件中api配置及后台保持同步更改。
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
        return Promise.reject(err)
    }
)

// 添加 response 拦截器
service.interceptors.response.use(config => {
    // console.log(config)
    if(config.status==200){
        return config.data;
    }
    
    return config;
}, err => {
    console.log(err)
    if(err.response && err.response.status){
        if(err.response.status==401){
            setSession('token','');
            setSession('userName','');
            setSession('userid','');
            return  $router.push({ path:'/'})
        }

    }

    let config = err.config
    if(!config || !config.retry) return Promise.reject(err)
    config.__retryCount = config.__retryCount || 0;
    if(config.__retryCount >= config.retry) {
        return Promise.reject(err);
    }
    config.__retryCount += 1;

    let backoff = new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, config.retryDelay || 1)
    });

    return backoff.then(() => {
        return axios(config);
    });

    
    // return Promise.reject(err)
})


export default service