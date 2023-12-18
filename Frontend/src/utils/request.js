import axios from 'axios'

/**
 * 创建axios实例
 */
const host = 'http://47.97.187.64:8080'
const service = axios.create({
  baseURL: host,
  timeout: '3000'
})

/**
 * 响应拦截
 */
service.interceptors.response.use(
  (res) => {
    res.headers['Access-Control-Allow-Origin'] = '*'
    return res
  },
  (err) => {
    return Promise.reject(err)
  }
)

/**
 * 封装请求函数
 */
const request = (options) => {
  //以post方式发起get请求
  if (options.method == 'get') {
    options.params = options.data
  }
  return service(options)
}

export default request
