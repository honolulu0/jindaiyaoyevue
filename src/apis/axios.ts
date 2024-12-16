import axios from 'axios'

// 创建axios实例
const instance = axios.create({
  baseURL: '/', // 基础URL
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，例如添加token
    // const token = localStorage.getItem('token')
    const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjo0ODg0NDExOTgzLCJpYXQiOjE3MzA4MTE5ODMsImp0aSI6IjQ3MjliYWQ2MzNlYTRiYjVhODFhZWY5MWQ3ZGJmYmU3IiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImlzX3Rlc3QiOnRydWV9._-theAO7px2yqvRXny7rtiYXdNblsIoD6Rmg8Tb1uus'
    if (token) {
      config.headers.Authorization = `JWT ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance
