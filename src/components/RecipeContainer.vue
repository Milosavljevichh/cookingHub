<script setup>
import RecipeCard from './RecipeCard.vue'
import { computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const recipes = computed(() => store.getters.recipes)
const searchText = computed(() => store.getters.searchText)

onMounted(() => {
  store.dispatch('fetchRecipes', searchText.value)
})

watch(searchText, (newVal) => {
  store.dispatch('fetchRecipes', newVal)
})
</script>

<template>
  <div id="wrapper" v-if="recipes.length">
    <RecipeCard
      v-for="recipe in recipes"
      :key="recipe.idMeal"
      :title="recipe.strMeal"
      :thumb="recipe.strMealThumb"
      :category="recipe.strCategory"
      :area="recipe.strArea"
      :video="recipe.strYoutube"
      :id="recipe.idMeal"
    />
  </div>
</template>

<style scoped>
#wrapper {
    width: 100%;
    padding: 24px 48px;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  background-color: var(--dark2);
  /* max-width: 4fr;  */
}

@media (min-width: 1200px) {
  #wrapper {
    grid-template-columns: repeat(3, 1fr); 
  }
}
</style>