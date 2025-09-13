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
    <div>
      <RouterView :search="searchText" />
    </div>
  </div>
  <Footer />
</template>

<style scoped>
  #mainContainer{
    display: flex;
  }
</style>