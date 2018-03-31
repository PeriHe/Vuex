<template>
  <div id="app">
    <!-- 3.使用组件 -->
    <hello></hello>
    <hr>
    <pp></pp>
  </div>
</template>

<script>
// 1.引入
import hello from './components/hello';
import pp from './components/pp'

export default {
  name: 'App',
  // 2.注册
  components:{
    hello,
    pp
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
