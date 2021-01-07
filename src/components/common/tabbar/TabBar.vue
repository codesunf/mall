<template>
	<div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
	export default {
		
	}
</script>

<style scoped>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  /*为了占据整个底部，最好left、right都设置*/
  left: 0;
  right: 0;
  bottom: 0;
  /*设置过渡阴影*/
  box-shadow: 0 -1px 1px rgba(0,0,0,.1);
}

</style>