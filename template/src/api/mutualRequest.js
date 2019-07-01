import axios from 'axios'

// 互斥请求
const mAxios = axios.create()

let pending = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let CancelToken = axios.CancelToken
let removePending = (config) => {
  for (let p in pending) {
    if (pending[p].u === config.url + '&' + config.method) { // 当当前请求在数组中存在时执行函数体
      pending[p].f() // 执行取消操作
      pending.splice(p, 1) // 把这条记录从数组中移除
    }
  }
}

let removeAllPending = () => {
  for (let p of pending) {
    p.f()
  }
  pending.length = 0
}

// 添加请求拦截器
mAxios.interceptors.request.use(config => {
  // removePending(config); //在一个ajax发送前执行一下取消操作
  removeAllPending()
  config.cancelToken = new CancelToken((c) => {
    // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
    pending.push({ u: config.url + '&' + config.method, f: c })
  })
  return config
},
error => {
  return Promise.reject(error)
})

// 添加响应拦截器
mAxios.interceptors.response.use(response => {
  removePending(response.config) // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
  return response
},
error => {
  return Promise.reject(error) // 返回一个空对象，主要是防止控制台报错
}
)

export default mAxios
