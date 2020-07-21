<template>
  <div id="app">
    <Header
      :flag_loader="false"
      :flag_menu="true"
      :flag_fixed="false"
      :flag_support="false"
      :flag_background="true"
      :urlHeader="urlHeader"
    />
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    const data = {
      urlHeader: {
        logo: '',
        dashboard: '',
        account: ''
      }
    }

    return data;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
