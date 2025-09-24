<script setup>
import { computed, watch, onMounted  } from 'vue';
import { useStore } from 'vuex';
import RecipeCard from '@/components/RecipeCard.vue';

const store = useStore();
const favoriteRecipes = computed(() => store.getters.favoriteRecipes);

const recipes = computed(() => store.getters.recipes)
const searchText = computed(() => store.getters.searchText)

onMounted(async () => {
	await store.dispatch('fetchFavorites');
	await store.dispatch('fetchSavedRecipes');
})

watch(searchText, async (newVal) => {
	// optional: filter saved by search using API or client-side
	await store.dispatch('fetchSavedRecipes');
})
</script>

<template>
	<div>
		<h1 style="color: var(--light); margin: 32px 0 24px 32px;">Saved Recipes</h1>
		<div v-if="favoriteRecipes.length">
			<div id="wrapper">
				<RecipeCard
					v-for="recipe in favoriteRecipes"
					:key="recipe.idMeal"
					:title="recipe.strMeal"
					:thumb="recipe.strMealThumb"
					:category="recipe.strCategory"
					:area="recipe.strArea"
					:video="recipe.strYoutube"
					:id="recipe.idMeal"
				/>
			</div>
		</div>
		<div v-else style="color: var(--light); margin: 32px; font-size: 1.2rem;">No saved recipes yet.</div>
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