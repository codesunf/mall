import {request,requestData} from './request.js'

export function getHomeMultidata() {
  return request({
    //向config中传递参数
    url: '/home/multidata'
  })
}

export function getHomeGoods(type,page) {
  return requestData({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}