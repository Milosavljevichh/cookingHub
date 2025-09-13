<script setup>
  import { RouterView } from 'vue-router';
  import { ref, computed } from 'vue';
  import Header from './layout/Header.vue';
  import Footer from './layout/Footer.vue';
  import Dashboard from './layout/Dashboard.vue';

  let searchText = ref('')
  let changeText = (s) => {
    searchText.value = s
  }
</script>

<template>
  <Header :changeText="changeText" />
  <div id="mainContainer">
    <Dashboard />
    <RouterView :search="searchText" />
  </div>
  <Footer />
</template>

<style scoped>
  #mainContainer{
    display: flex;
  }
</style>