<template>
	<tab-bar>
		<tab-bar-item link="/home">
			<!-- html标签中不能直接用别名，还需要加上~ -->
			<img src="~assets/img/tabbar/home.svg" slot="item-icon">
			<img src="~assets/img/tabbar/home_active.svg" slot="item-icon-active">
		<div slot="item-text">首页</div>
		</tab-bar-item>
		<tab-bar-item link="/category">
			<img src="~assets/img/tabbar/category.svg" slot="item-icon">
			<img src="~assets/img/tabbar/category_active.svg" slot="item-icon-active">
		<div slot="item-text">分类</div>
		</tab-bar-item>
		<tab-bar-item link="/shopcart">
			<img src="~assets/img/tabbar/shopcart.svg" slot="item-icon">
			<img src="~assets/img/tabbar/shopcart_active.svg" slot="item-icon-active">
		<div slot="item-text">购物车</div>
		</tab-bar-item>
		<tab-bar-item link="/profile">
			<img src="~assets/img/tabbar/profile.svg" slot="item-icon">
			<img src="~assets/img/tabbar/profile_active.svg" slot="item-icon-active">
		<div slot="item-text">我的</div>
		</tab-bar-item>
	</tab-bar>
</template>

<script>
	//import可以直接使用别名
	import TabBar from 'components/common/tabbar/TabBar'
	import TabBarItem from 'components/common/tabbar/TabBarItem'
	
	export default {
		name:"",
		components:{
			TabBar,
			TabBarItem
		}
	}
</script>

<style scoped>

</style>