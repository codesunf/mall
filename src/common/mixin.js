import {debounce} from 'common/utils'
import BackTop from 'components/content/backtop/BackTop'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    //refresh是局部变量，但是下面引用了，所以不会被销毁
    this.refresh = debounce(this.$refs.scroll.refresh,500)
    //对监听的事件进行保存
    this.itemImgListener = () => {
      this.refresh()
    }
    //监听item中图片加载完成
    this.$bus.$on('itemImageLoad',this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    //返回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0,0,500)
    },
  }
}