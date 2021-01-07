<template>
  <div class="detail">
    <!-- 事件可以大写是因为emit里是啥，这里就是啥 -->
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!-- 属性：topImages 传入值：top-images。因为html标签属性不区分大小写，这里写 :topImages="" 大写的会变成小写-->
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>

<script>
  import DetailNavBar from './childCompos/DetailNavBar.vue'
  import DetailSwiper from './childCompos/DetailSwiper.vue'
  import DetailBaseInfo from './childCompos/DetailBaseInfo.vue'
  import DetailShopInfo from './childCompos/DetailShopInfo.vue'
  import DetailGoodsInfo from './childCompos/DetailGoodsInfo.vue'
  import DetailParamInfo from './childCompos/DetailParamInfo.vue'
  import DetailCommentInfo from './childCompos/DetailCommentInfo.vue'
  import DetailBottomBar from './childCompos/DetailBottomBar.vue'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'
  import {itemListenerMixin,backTopMixin} from 'common/mixin'
  import {debounce} from 'common/utils'

  //将vuex的actions中的方法映射过来
  import {mapActions} from 'vuex'

	export default {
		name:"Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar
    },
    mixins: [itemListenerMixin,backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getthemeTopY: null,
        currentIndex: 0
      }
    },
    created() {
      //保存传入的iid
      this.iid = this.$route.params.iid

      //根据iid请求详情数据
      getDetail(this.iid).then(res => {
        const data = res.data.result
        //获取顶部图片的轮播数据
        this.topImages = data.itemInfo.topImages

        //获取商品信息数据
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        //店铺信息
        this.shop = new Shop(data.shopInfo)

        //商品的详情数据
        this.detailInfo = data.detailInfo

        //获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        //取出评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        //给getthemeTopY赋值的操作进行防抖
        this.getthemeTopY = debounce(() => {
          //将前面的值替换，让themeTopYs只有一组值
          this.themeTopYs = []

          //图片加载完成后才获取高度
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

          //手动添加一个最大值，方便下面判断
          this.themeTopYs.push(Number.MAX_VALUE)
        },100)
      })

      //请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.data.list
      })
    },
    methods: {
      ...mapActions(['addCart']),

      imageLoad() {
        this.refresh()
        this.getthemeTopY()
      },

      titleClick(index) {
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500)
      },

      contentScroll(position) {
        //获取y值
        const positionY = -position.y

        //positionY和themeTopYs中的值对比
        let length = this.themeTopYs.length
        for (let i = 0; i < length-1; i++) {
          //第一种判断方式：最后一个值单独判断
          // if (this.currentIndex !== i && (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i])) {
          //   this.currentIndex = i
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }

          //第二种方式：手动在最后多加一个最大值，i < length-1最后一个不需要遍历
          if (this.currentIndex !== i && (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        //判断backTop是否显示
        this.isShowBackTop = (-position.y) > 1000
      },

      addToCart() {
        //获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        //调用vuex里actions里面的方法
        //将商品添加到购物车里
        // this.$store.dispatch('addCart',product).then(res => {
        //   this.$toast.show(res,2000)
        // })

        this.addCart(product).then(res => {
          this.$toast.show(res,2000)
        })

      }
    },
    //因为没有做缓存(keep-alive)，不会进行deactivated
    destroyed() {
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    }
	}
</script>

<style scoped>
  .detail {
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 58px);
    overflow: hidden;
  }
</style>