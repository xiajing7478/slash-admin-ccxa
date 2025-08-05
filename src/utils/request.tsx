import axios, { type AxiosResponse } from 'axios'
import { serialize } from '@/utils'
import { message } from 'antd'

axios.defaults.baseURL = import.meta.env.VITE_APP_BASEURLAPI
axios.defaults.timeout = 50000
axios.defaults.validateStatus = status => status >= 200 && status < 500

axios.interceptors.request.use(
  config => {
    const isToken = (config.headers || {}).isToken === false
    const token = localStorage.getItem('access_token')
    if (token && !isToken) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    if (config.method === 'post' && config.headers.serialize) {
      config.data = serialize(config.data)
      delete config.data.serialize
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

axios.interceptors.response.use(
  (res: AxiosResponse) => {
    const { status, data } = res
    const Message = data.msg || data?.message
    if (status === 401) {
      localStorage.removeItem('access_token')
      message.error('登录过期，请重新登录')
      window.location.href = '/login'
      return Promise.reject(new Error('Unauthorized'))
    }
    if ((status !== 200 || res.data.code !== 0) && message) {
      message.error(Message)
    }
    return res.data || {}
  },
  error => {
    // 处理其他网络错误或服务器错误
    const Message = error.response?.data?.msg || error.response?.data?.message || '请求失败'
    message.error(Message)
    return Promise.reject(new Error(error))
  },
)

export default axios
