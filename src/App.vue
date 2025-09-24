<script setup>
  import { RouterView } from 'vue-router';
  import { ref, computed } from 'vue';
  import store from './store';
  import Header from './layout/Header.vue';
  import Footer from './layout/Footer.vue';
  import Dashboard from './layout/Dashboard.vue';

  let searchText = ref('')
  let changeText = (s) => {
    searchText.value = s
  }
  const isAuth = computed(() => store.getters.isAuthenticated);

  const showSidebar = ref(false);
  function toggleSidebar() {
    showSidebar.value = !showSidebar.value;
  }

</script>

<template>
  <Header v-if="isAuth" :changeText="changeText" @toggle-sidebar="toggleSidebar" />
  <div :class="isAuth ? 'mainContainer' : 'fullHeight'">
    <div id="sidebarWrapper" :class="{ 'visible': showSidebar }" @click.self="showSidebar = false">
      <Dashboard v-if="isAuth" @close="showSidebar = false" />
    </div>
    <div id="contentWrapper" :class="{ 'overlay': showSidebar }">
      <RouterView :search="searchText" />
    </div>
  </div>
  <Footer />
</template>

<style scoped>
  .fullHeight {
    height: 100vh;
  }

  .headerHeight{
    height:93vh;
  }

  .mainContainer {
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

  /* Hidden by default on small screens; use .visible to show overlay */
  #sidebarWrapper {
    transition: transform 0.25s ease, visibility 0.25s ease;
  }
  #sidebarWrapper.visible {
    transform: translateX(0);
    visibility: visible;
  }

  /* small screens: hide sidebar and use hamburger */
  @media (max-width: 1024px) {
    #sidebarWrapper {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      width: 280px;
      transform: translateX(-110%);
      visibility: hidden;
      box-shadow: 2px 0 16px rgba(0,0,0,0.6);
      z-index: 40;
    }

    /* dim the content when sidebar open */
    #contentWrapper.overlay {
      position: relative;
    }
    #contentWrapper.overlay::after {
      content: '';
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      z-index: 30;
    }
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