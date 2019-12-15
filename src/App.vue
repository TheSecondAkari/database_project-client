<template>
  <div id="app">
    <!-- <Login></Login> -->
    <Register></Register>
  </div>
</template>
<script>
// import Login from "./views/login.vue";
import Register from "./views/Register.vue";
export default {
  name: "app",
  components: {
    // Login
    Register
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
