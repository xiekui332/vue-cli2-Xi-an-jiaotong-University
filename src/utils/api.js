
import service from './axios'
import QS from 'qs'

export const handleLogin = (params) => {
    return new Promise((resolve, reject) => {
        service.post('/api/user/login', params)
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
    
}