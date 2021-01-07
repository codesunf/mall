<template>
	<swiper>
			<swiper-item v-for="item in banner">
				<a :href="item.link">
					<img :src="item.image" @load="imageLoad">
				</a>
			</swiper-item>
		</swiper>
</template>

<script>
	import {Swiper,SwiperItem} from 'components/common/swiper'

	export default {
		name:"",
		props: {
			//对外开放属性，传入数据
			banner: {
				type: Array,
				//类型为对象或数组时，默认值必须是一个函数
				default() {
					return []
				}
			}
		},
		data() {
			return {
				isLoad: false
			}
		},
		components:{
			Swiper,
			SwiperItem
		},
		methods: {
			imageLoad() {
				//让事件只发送一次
				if(!this.isLoad){
					this.$emit('swiperImageLoad')
					this.isLoad=true
				}
			}
		}
	}
</script>

<style scoped>

</style>