import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from 'views/home/Home.vue'
import Category from 'views/category/Category.vue'
import Shopcart from 'views/shopcart/shopCart.vue'
import Profile from 'views/profile/Profile.vue'
import Detail from 'views/detail/Detail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/home',
    meta: {
      showTab: true//如果需要显示就加上这个
    }
  },
  {
    path:'/home',
    component:Home,
    meta: {
      showTab: true
    }
  },
  {
    path:'/category',
    component:Category,
    meta: {
      showTab: true
    }
  },
  {
    path:'/shopcart',
    component:Shopcart,
    meta: {
      showTab: true
    }
  },
  {
    path:'/profile',
    component:Profile,
    meta: {
      showTab: true
    }
  },
  {
    path:'/detail/:iid',
    component:Detail
  },
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
