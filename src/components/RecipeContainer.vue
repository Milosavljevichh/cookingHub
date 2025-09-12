<script setup>
import RecipeCard from './RecipeCard.vue'
import { ref } from 'vue';

//!!!NOTE trenutno se ovde dohvata api data, ali ce se pomeriti u vuex
let kanal = new XMLHttpRequest();

const recipes = ref([])

kanal.open('GET', 'https://themealdb.com/api/json/v1/1/search.php?s=', true)
kanal.send()
kanal.onreadystatechange = () => {
    if (kanal.readyState === 4 && kanal.status === 200) {
    let data = JSON.parse(kanal.responseText)
    recipes.value = data.meals
    console.log(recipes.value)
    }
}
</script>

<template>
  <div id="wrapper" v-if="recipes.length">
    <RecipeCard
      v-for="recipe in recipes"
      :key="recipe.idMeal"
      :title="recipe.strMeal"
    />
  </div>
</template>
