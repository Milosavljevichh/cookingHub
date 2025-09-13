<script setup>
import RecipeCard from './RecipeCard.vue'
import { ref, defineProps, watch } from 'vue';

const props = defineProps({
    searchText:{
        type: String,
        default: ''
    }
})

//!!!NOTE trenutno se ovde dohvata api data, ali ce se pomeriti u vuex
let recipes = ref([])

function fetchRecipes(query) {
    const kanal = new XMLHttpRequest()
    kanal.open('GET', 'https://themealdb.com/api/json/v1/1/search.php?s=' + query, true)
    kanal.send()
    kanal.onreadystatechange = () => {
        if (kanal.readyState === 4 && kanal.status === 200) {
            let data = JSON.parse(kanal.responseText)
            recipes.value = data.meals || []
        }
    }
    
}
fetchRecipes(props.searchText)

watch(() => props.searchText,
    (newVal) => {
        fetchRecipes(newVal)
    })
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

<style scoped>
#wrapper {
    width: 100%;
    padding: 24px 48px;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  /* max-width: 4fr;  */
}

@media (min-width: 1200px) {
  #wrapper {
    grid-template-columns: repeat(4, 1fr); 
  }
}
</style>