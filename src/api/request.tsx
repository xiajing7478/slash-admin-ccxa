import axios, { type AxiosResponse, type AxiosRequestConfig } from 'axios'
import { type ApiResponse } from '@/types/api'
import { serialize } from '@/utils'
import { message } from 'antd'
import authStore from '@/store/authStore'

axios.defaults.baseURL = import.meta.env.VITE_APP_BASEURLAPI
axios.defaults.timeout = 50000
axios.defaults.validateStatus = status => status >= 200 && status <= 500

// console.log('axios.defaults.baseURL', axios.defaults.baseURL)

type AxiosResponsePromise = AxiosResponse & ApiResponse

// 没有返回code的接口地址列表
const NotResCodes: string[] = ['/auth/oauth/token']

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const isToken = (config.headers || {}).isToken === false
    const token = authStore.getState().token || localStorage.getItem('authToken')
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
  (res: AxiosResponsePromise) => {
    const { status, data } = res
    const Message = data.msg || data?.message
    if (status === 401) {
      console.log('unauthorized, redirect to login')
      localStorage.removeItem('authToken')
      message.error('登录过期，请重新登录')
      window.location.href = '/login'
      return Promise.reject(new Error('Unauthorized'))
    }

    if (status !== 200 && message) {
      if (data.code !== 0 && !NotResCodes.find(item => res.config.url?.includes(item))) {
        message.error(Message)
      }
      return Promise.reject(new Error(Message))
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
