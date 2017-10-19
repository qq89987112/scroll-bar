<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!--先做wrapper的,后做无wrapper的-->
    <Wrapper class="wrapper">
      <li v-for="i in 10">{{i}}</li>
      <ScrollBar thumb-color="red" />
    </Wrapper>

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
