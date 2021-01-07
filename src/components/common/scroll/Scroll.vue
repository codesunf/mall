<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

	export default {
		name:"",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
		data() {
      return {
        scroll: null
      }
    },
    mounted() {
      //document.querySelector('.wrapper')获取的wrapper可能拿到别的相同名字的元素，所以这里通过vue的ref拿到元素
      //dom更新完后才能初始化BScroll
      //创建better-scroll对象
      this.scroll=new BScroll(this.$refs.wrapper,{
        click: true,
        //由使用者决定要不要实时监听滚动
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
      })

      //监听滚动的位置
      if(this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll',position => {
          this.$emit('scroll',position)
        })
      }

      //监听上拉事件
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp',() => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      //又封装一遍，time=300表示没传第三个参数就使用默认值
      scrollTo(x,y,time=300) {
        this.scroll.scrollTo(x,y,time)
      },
      finishPullUp() {
        //调用finishPullUp()才会上拉再触发回调函数
        this.scroll.finishPullUp()
      },
      refresh(){
        //&& 逻辑与，依次判断是否条件成立，先执行前面一个条件，如果不成立，后面的代码不会执行
        //执行方法前一般先判断对象是否存在比较严谨
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    },

	}
</script>

<style scoped>

</style>