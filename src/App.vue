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
    <div id="sidebarWrapper">
      <Dashboard />
    </div>
    <div id="contentWrapper">
      <RouterView :search="searchText" />
    </div>
  </div>
  <Footer />
</template>

<style scoped>
  #mainContainer {
    display: flex;
    height: 93vh; 
    min-height: 0;
  }

  #sidebarWrapper {
    position: sticky;
    top: 0;
    height: calc(100%-120px);
    z-index: 2;
    flex-shrink: 0;
    background: var(--dark);
  }

  #contentWrapper {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
    height: 100%;
    padding: 0 24px;
    background: var(--background, #181818);
  }
  #contentWrapper::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>