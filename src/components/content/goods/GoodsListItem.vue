<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
	export default {
		name:"",
		components:{
		
		},
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img 
      }
    },
    methods: {
      imageLoad() {
        this.$bus.$emit('itemImageLoad')

        // if (this.$route.path.indexOf('/home')) {
        //   this.$bus.$emit('HomeItemImageLoad')
        // } else if (this.$route.path.indexOf('/detail')) {
        //   this.$bus.$emit('DetailItemImageLoad')
        // }
      },
      itemClick() {
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    }
	}
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    /*让下面的文本相对这里定位*/
    position: relative;
    /*子元素设置为百分比*/
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    /*当对象内文本溢出时显示省略标记*/
    text-overflow: ellipsis;
    /*规定段落中的文本不进行换行*/
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  /*收藏图标*/
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    /*第一个数字0表示背景颜色。第二个0/14px中0是background-position的属性简写，14px是background-size的属性简写。最后14px和前面14px共同构成background-size*/
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>