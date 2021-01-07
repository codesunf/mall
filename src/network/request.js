import axios from 'axios'

export function request(config) {
  //1、创建实例
  const instance = axios.create({
    baseURL:'http://123.207.32.32:8000',
    timeout:5000,
  })

  //2、拦截器
  //2.1、请求拦截
  instance.interceptors.request.use(config => {
    return config
  },err => {
    console.log(err)
  })

  //2.2、响应拦截
  // instance.interceptors.response.use(result => {
  //   return result.data
  // },err => {
  //   console.log(err)
  // })

  //3、发送网络请求，返回Promise
  return instance(config)
}

export function requestData(config) {
  const instance = axios.create({
    baseURL:'http://152.136.185.210:7878/api/m5',
    timeout:5000,
  })

  instance.interceptors.request.use(config => {
    return config
  },err => {
    console.log(err)
  })

  return instance(config)
}