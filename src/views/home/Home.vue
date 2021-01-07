<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" @click.native="tabBackTop" ref="tabControl1" class="tab-controll" v-show="isTabFixed"/>
		
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad"/>
      <home-recommend-view :recommend="recommend"/>
      <home-feature-view/>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"/>
      <goods-list :goods="showGoods" ref="goodList"/>
    </scroll>

    <!-- 监听组件原生事件需要加上native修饰符 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
	</div>
</template>

<script>
  //完全公共组件
	import NavBar from 'components/common/navbar/NavBar'
  //业务公共组件
  import TabControl from 'components/content/tabcontrol/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'

  //子组件
	import HomeSwiper from './childcomps/HomeSwiper'
	import HomeRecommendView from './childcomps/HomeRecommendView.vue'
	import HomeFeatureView from './childcomps/HomeFeatureView.vue'
  import Scroll from 'components/common/scroll/Scroll'

  //方法
	import {getHomeMultidata,getHomeGoods} from 'network/home'
  import {itemListenerMixin,backTopMixin} from 'common/mixin'

	export default {
		name:"",
		components:{
      //注册完全公共组件
			NavBar,
      //注册业务公共组件
      TabControl,
      GoodsList,

      //注册子组件
			HomeSwiper,
			HomeRecommendView,
			HomeFeatureView,
      Scroll,
		},
    mixins: [itemListenerMixin,backTopMixin],
		data() {
			return {
				//保存请求的数据
				banner: [],
				recommend: [],
				goods: {
          'pop': {
              page: 0,
              list: []
          },
          'new': {
              page: 0,
              list: []
          },
          'sell': {
              page: 0,
              list: []
          }
        },
        currentType:'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
			}
		},
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
		//组件创建好后就发送网络请求
    //created中只写逻辑，具体代码可以放到methods中
    //注意：created是组件创建完后调用，但是组件还没有挂载模板，意味着在这里使用不了模板中的元素，应该到mounted中去拿
		created() {
      //请求多个数据
			this.getHomeMultidata()

      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
			
		},
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      //回来时刷新一下
      this.refresh()
    },
    deactivated() {
      //记录离开时候的位置
      this.saveY = this.$refs.scroll.getScrollY()

      //取消全局事件监听
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    methods: {
      /*
      * 事件监听相关方法
      */
      //切换选项卡
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType='pop'
            break
          case 1:
            this.currentType='new'
            break
          case 2:
            this.currentType='sell'
            break
        }
        //让两个tabControll保持一致
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

      tabBackTop() {
        //切换选项卡时返回初始位置
        this.$refs.scroll.scrollTo(0,-this.$refs.tabControl2.$el.offsetTop,0)
      },

      //监听滚动
      contentScroll(position) {
        //判断backTop是否显示
        this.isShowBackTop = (-position.y) > 1000

        //决定tabControll是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },

      //加载更多商品
      loadMore() {
        this.getHomeGoods(this.currentType)
      },

      //监听轮播图加载完
      //this.$refs.tabControll.$el.offsetTop获取的offsetTop不准确，因为图片还没加载完，一般大图加载慢，所以可以只监听大图
      swiperImageLoad() {
        //获取tabControl的offsetTop
        //所有组件都有一个属性：$el，用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },


      /*
      * 网络请求相关方法
      */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          //箭头函数里的this往上找作用域，找到的是created()中的this，而created()中的this就是组件对象
          this.banner = res.data.data.banner.list
          this.recommend = res.data.data.recommend.list
        })
      },

      getHomeGoods(type) {
        //获取page
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          //保存数据
          //...语法将数组进行解析成一个个元素，然后一个一个添加到另外一个数组中，跟for循环效果一样
          this.goods[type].list.push(...res.data.data.list)
          //保存数据后将页码加1
          this.goods[type].page += 1

          //实现每次上拉加载数据
          this.$refs.scroll.finishPullUp()
        })
      }
    },
	}
</script>

<!-- scoped表示在当前组件的作用域起效果 -->
<style scoped>
	/*给网页添加上padding解决轮播图不占位*/
	#home {
    /*vh：viewport height视口高度*/
    height: 100vh;
    position: relative;
	}

	.home-nav {
		background-color: var(--color-tint);
		color: #fff;

    /*加入better-scroll后不需要fixed，一般原生滚动才需要*/
		/*position: fixed;
    top: 0;
		left: 0;
		right: 0;
		z-index: 9;*/
	}

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
