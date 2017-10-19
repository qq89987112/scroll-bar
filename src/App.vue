<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!--先做wrapper的,后做无wrapper的-->
    <h1>vue-scroll-bar</h1>
    <h2>1、容器是vue组件</h2>
    <h3>右边(默认)</h3>
    <Wrapper class="wrapper">
      <li v-for="i in 10">{{i}}</li>
      <ScrollBar thumb-color="red" />
    </Wrapper>
    <h3>左边</h3>
    <Wrapper class="wrapper">
      <li v-for="i in 10">{{i}}</li>
      <ScrollBar thumb-color="red" left/>
    </Wrapper>
    <h3>下边</h3>
    <Wrapper class="wrapper">
      <li v-for="i in 10">{{i}}</li>
      <ScrollBar thumb-color="red" bottom/>
    </Wrapper>
    <h3>上边</h3>
    <Wrapper class="wrapper">
      <li v-for="i in 10">{{i}}</li>
      <ScrollBar thumb-color="red" top/>
    </Wrapper>
    <h3>多边</h3>
    <Wrapper class="wrapper">
      <li v-for="i in 10">{{i}}</li>
      <ScrollBar thumb-color="red" top/>
      <ScrollBar thumb-color="red" left/>
    </Wrapper>

    <h2>2、容器是普通标签</h2>


  </div>
</template>

<script>
  import ScrollBar from './components/ScrollBar'
  import Wrapper from "./components/Wrapper.vue"
  export default {
    name: 'app',
    components: {
      ScrollBar,
      Wrapper
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

  .wrapper {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    overflow: hidden;
  }

  li {
    height: 50px;
  }
</style>
