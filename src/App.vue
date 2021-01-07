<template>
  <div id="app">
    <!-- exclude指定组件不缓存，这里的名字和组件中的name要一致 -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar v-if="$route.meta.showTab"></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'

  export default{
    name:'app',
    components:{
      MainTabBar
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
