<template>
	<div class="tab-bar-item" @click="itemClick">
		<!-- 在插槽外面包裹一层div，将给插槽的属性给div，通过改变div属性来控制插槽状态 -->
		<div v-if="!isActive"><slot name="item-icon"></slot></div>
		<div v-else><slot name="item-icon-active"></slot></div>
		<div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
	export default {
		name:"",
		//给tab-bar-item添加属性
		props: {
			link:String,
			activeColor:{
				type: String,
				default:'red'
			}
		},
		data(){
			return {
				
			}
		},
		computed:{
			isActive(){
				//判断点击路径和全部的路径是否相等，indexOf()方法找不到就是-1
				return this.$route.path.indexOf(this.link) !== -1
			},
			activeStyle(){
				return this.isActive ? {color:this.activeColor} : {}
			}
		},
		methods:{
			itemClick(){
				this.$router.replace(this.link)
			}
		}
	}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  /*tabbar一般高度为49px*/
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
	width: 24px;
	height: 24px;
	margin-top: 3px;
	/*去除图片下边默认多出的3个像素*/
	vertical-align: middle;
	margin-bottom: 2px;
}
</style>