<script setup>
  import { RouterView } from 'vue-router';
  import Header from './layout/Header.vue';
  import Footer from './layout/Footer.vue';
  import Dashboard from './layout/Dashboard.vue';

  //!!!NOTE trenutno se ovde dohvata api data, ali ce se pomeriti u vuex
  let kanal = new XMLHttpRequest();

  let data

  kanal.open('GET', 'https://themealdb.com/api/json/v1/1/search.php?s=', true)
  kanal.send()
  kanal.onreadystatechange = () => {
    if (kanal.readyState === 4 && kanal.status === 200) {
      data = JSON.parse(kanal.responseText)
      console.log(data)
    }
  }
</script>

<template>
  <Header />
  <Dashboard />
  <RouterView />
  <Footer />
</template>