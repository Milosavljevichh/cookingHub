<script setup>
  import { RouterView } from 'vue-router';
  import Header from './layout/Header.vue';
  import Footer from './layout/Footer.vue';
  import Dashboard from './layout/Dashboard.vue';
</script>

<template>
  <Header />
  <div id="mainContainer">
    <Dashboard />
    <RouterView />
  </div>
  <Footer />
</template>

<style scoped>
  #mainContainer{
    display: flex;
  }
</style>