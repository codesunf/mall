import {requestData} from './request.js'

export function getDetail(iid) {
  return requestData({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return requestData({
    url: '/recommend'
  })
}

//服务器返回的数据先封装到一个类中，目的就是通过一个类将复杂数据整合到一起
export class Goods {
  constructor(iteminfo,columns,services) {
    this.title = iteminfo.title
    this.desc = iteminfo.desc
    this.newPrice = iteminfo.price
    this.oldPrice = iteminfo.oldPrice
    this.discount = iteminfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = iteminfo.lowNowPrice
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}

export class GoodsParam {
  constructor(info,rule) {
    //imgaes可能没有值
    this.image = info.iamges ? info.images[0] : ''
    this.infos = info.set
    this.rule = rule
  }
}