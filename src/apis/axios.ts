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
    return response?.data ?? response
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export const jindai3adminInstance = axios.create({
  baseURL: '/jindai3admin',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
jindai3adminInstance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，例如添加token
    // const token = localStorage.getItem('token')
    const token ='eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhkODUxM2YzLWU2OWUtNDg3Zi04NjkzLWM4ZDc1MzkyNGRlMCIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MzQ2NDYwMjksImV4cCI6NDg5MDQwNjAyOX0.shQEhW8_ov7PFHMRKeVNaW-6yPa4WlM_Iysl369z1pzLc8Q36xED-oyyqaXB3rp5Qd2q7BGFb4sbRdPH23x4Y-e53jkEkoV_AjXMwRwh6Bj7ZeU75b3RlmFA9NMwgwe18ehsYd0uNUJWhjwTxv4OBwsRxh7nrnpWlWJRHDaAnEloO6h93F6YLsxz7ujEL5Kmqvyqt3V5bJR8h3SjIbZNv1ElmonkAzM7Fz1am_gRpr0nAQmi926K8fUSaguqb_d0ltYBjhmm9J-NYRw0XHhb1rFaGulMKzrarNyKzjet9AM5g_nCcf56exd4RFCBAv5LoKGZUtD-VXocuE8ahHYI4A'
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
jindai3adminInstance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response?.data ?? response
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)


export default instance
