<template>
	<div class="tab-control">
    <!-- 这里只有文字不同，所以没必须用插槽 -->
		<div v-for="(item,index) in titles" class="tab-control-item" :class="{active: index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>  
    </div>
	</div>
</template>

<script>
	export default {
		name:"",
		components:{
		
		},
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      //关键就是索引
      itemClick(index) {
        this.currentIndex = index
        //将点击事件传出去，并且传递一个索引参数
        this.$emit('tabClick',index)
      }
    }
	}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    /*设置span的padding*/
    padding: 3px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    /*给span下边框设置颜色、大小*/
    border-bottom: 3px solid var(--color-tint);
  }
</style>