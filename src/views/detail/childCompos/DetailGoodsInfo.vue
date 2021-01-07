<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img :src="item" v-for="(item,index) in detailInfo.detailImage[0].list" :key="index"
      @load="imgLoad">
    </div>
  </div>
</template>

<script>
	export default {
		name:"",
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        counter: 0,
        imagesLength: 0
      }
    },
    methods: {
      imgLoad() {
        //判断所有的图片都加载完,++this.counter先加再对比
        if (++this.counter === this.imagesLength) {
          this.$emit('imageLoad')
        }
      }
    },
    //watch监听detailInfo属性的变化
		watch: {
      detailInfo() {
        //获取图片的个数
        this.imagesLength = this.detailInfo.detailImage[0].list.length
      }
    }
	}
</script>

<style scoped>
  .goods-info {
    width: 100%;
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    margin: 10px 0;
  }

  .info-list img {
    width: 100%;
  }
</style>