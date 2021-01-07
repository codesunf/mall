<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name:"",
    components:{
    	
    }
  }
</script>

<style scoped>
	.nav-bar {
		display: flex;
		height: 44px;
		/*导航栏一般为44px*/
		line-height: 44px;
		text-align: center;
		box-shadow: 0 1px 1px rgba(100,100,100,.1);
	}

	.left,.right {
		width: 60px;
	}

	.center {
		/*其他元素设置具体宽度后，剩下的宽度直接占据*/
		flex:1;
	}
</style>
