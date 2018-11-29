<template>
<!-- <div id="page-top"> -->
  <div id="app">
    <div style= "width: 100%;height: 100px;background-color: #212529; position: fixed; z-index: 15;"></div>
    <Navbar />
      <router-view />
    <Footer/>
    
  </div> 
<!-- </div> -->
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer
  }
}
</script>


<style>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #56126b;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
