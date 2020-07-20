<template>
    <Header 
      v-if="name=='header'"
      :loader="flag_loader"
      :menu="flag_menu"
      :url="urlHeader"
      :support="flag_support"
      :background="flag_background"
      :parent_component="parent_component"
    />
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  data() {
    let data = {
      // header
  
    }
    return data;
  },
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
  }
}
</script>

<style>
.base-component {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  min-height: 60px;
}
</style>
