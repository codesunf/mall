<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem.vue'

	export default {
		name:"",
		components:{
		  GoodsListItem
		},
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
	}
</script>

<style scoped>
  .goods {
    display: flex;
    /*换行，先给子元素设置宽度，然后根据宽度展示一行显示几个*/
    flex-wrap: wrap;
    /*中间均等分，两边为中间的一半*/
    justify-content: space-around;
    /*微调*/
    padding: 2px;
  }
</style>