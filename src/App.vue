<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <EthRate />
  </div>
</template>

<script>
import EthRate from './components/EthRate.vue'

export default {
  name: 'app',
  components: {
    EthRate
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
