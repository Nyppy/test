<template>
  <div id="app">
      <!-- v-if="name=='header'" -->

    <Header
      :loader="flag_loader"
      :menu="flag_menu"
      :url="urlHeader"
      :support="flag_support"
      :background="flag_background"
      :parent_component="parent_component"
    />
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  props: [
    "name",
    "flag_loader",
    "flag_menu",
    "flag_support",
    "flag_background",
    "urlHeader", // object: urlHeader: {logo: '',dashboard: '',account: ''}

    "projects",
    "parent_component"
  ],
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
