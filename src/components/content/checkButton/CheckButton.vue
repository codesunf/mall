<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="~assets/img/cart/tick.svg">
  </div>
</template>

<script>
	export default {
		name:"",
		props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
	}
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 2px solid #aaa;
  }

  .check {
    background-color: pink;
    border: 2px solid #fff;
  }
</style>