<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>

      <div class="price">
        合计：{{totalPrice}}
      </div>

      <div class="calculate" @click="calcClick">
        去计算({{checkLength}})
      </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  import {mapGetters} from 'vuex'

	export default {
		name:"",
		components:{
		  CheckButton
		},
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item) => {
          return preValue + item.price * item.count
        },0)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if (this.cartList.length === 0) return false

        //0取反为ture，其他数字取反为false
        // return !(this.cartList.filter(item => !item.checked).length)

        //上面需要全部遍历一遍，而find只找到一个就行，性能更高
        return !this.cartList.find(item => !item.checked)

        //遍历
        // for (let item of this.cartList) {
        //   if (!item.checked) {
        //     return false
        //   }
        // }
        // return true
        }
      },
      methods: {
        checkClick() {
          if (this.isSelectAll) {
            //全部选中
            this.cartList.forEach(item => item.checked = false)
          } else {
            //部分或全部不选中
            this.cartList.forEach(item => item.checked = true)
          }
        },
        calcClick() {
          if (!this.isSelectAll) {
            this.$toast.show('请选择购买的商品',2000)
          }
        }
      }

	}
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;
    font-size: 14px;

    background-color: #eee;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>