<template>
	<div class="shopCart">
    <!-- 导航 -->
   <nav-bar class="nav-bar">
     <div slot="center">购物车({{cartLength}})</div>
   </nav-bar> 
   <!-- 商品列表 -->
   <shop-cart-list/>
   <!-- 底部汇总 -->
   <shop-cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import shopCartList from './childComps/shopCartList.vue'
  import shopCartBottomBar from './childComps/shopCartBottomBar.vue'

  import {mapGetters} from 'vuex'

	export default {
		name:"",
		components:{
		  NavBar,
      shopCartList,
      shopCartBottomBar
		},
    computed: {
      //mapGetters辅助函数，将store中的getters映射到局部计算属性，括号中可以是数组和对象
      ...mapGetters(['cartLength'])
    }
	}
</script>

<style scoped>
  .shopCart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>