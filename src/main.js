import Vue from 'vue'
//只加载所有页面公共的组件，因为不可能所有网页放到App中，每个网页是独立的，只有每个网页中的组件才是加载进去的
import App from './App.vue'
//router里面定义了主要的一些页面的跳转，根据路由跳转到不同网页
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false

//自定义一个属性，加入到原型中，而这个属性是Vue实例，将Vue实例作为事件总线
Vue.prototype.$bus = new Vue()
//只要使用vue.use就会执行install函数，并且默认会传入Vue到install函数
Vue.use(toast)

//解决移动端300ms延迟
FastClick.attach(document.body)

//使用图片懒加载
Vue.use(VueLazyLoad,{
  //占位图片
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
