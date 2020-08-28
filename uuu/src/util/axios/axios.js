// 引入axios库
import axios from 'axios'
// 重新实例化一个axios
let http = axios.create({
    baseURL:'/api'
})


// 拦截器之请求拦截 
// http.interceptors.request.use((req)=>{
//     // 获取本地存储中的token
//     // let authorization=''
//     // authorization=sessionStorage.getItem('userInfo')?JSON.parse(sessionStorage.getItem('userInfo')).token:''
//     // req.headers.authorization=authorization
//     return req
// })



// 拦截器之响应拦截
http.interceptors.response.use((res)=>{
    return res.data
})

// 导出封装好的模块
export default http