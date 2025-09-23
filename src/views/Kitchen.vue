<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import RecipeCard from '@/components/RecipeCard.vue';

const store = useStore();
const areas = computed(() => store.getters.allAreas);
const selectedArea = ref('');
const areaRecipes = ref([]);

async function fetchAreaRecipes(area) {
    if (!area) return;
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(area)}`);
    const data = await res.json();
    areaRecipes.value = data.meals || [];
}

onMounted(async () => {
    await store.dispatch('fetchAllAreas');
    if (areas.value.length) {
        selectedArea.value = areas.value[0];
        fetchAreaRecipes(selectedArea.value);
    }
});

watch(selectedArea, (newArea) => {
    fetchAreaRecipes(newArea);
});
</script>

<template>
    <div>
        <div class="area-scroll-wrapper">
            <button
                v-for="area in areas"
                :key="area"
                :class="['area-btn', { selected: area === selectedArea }]"
                @click="selectedArea = area"
            >
                {{ area }}
            </button>
        </div>
            <div>
                <div v-if="areaRecipes.length"  class="recipes-container">
                    <RecipeCard
                        v-for="recipe in areaRecipes"
                        :key="recipe.idMeal"
                        :title="recipe.strMeal"
                        :thumb="recipe.strMealThumb"
                        :category="recipe.strCategory"
                        :area="recipe.strArea"
                        :video="recipe.strYoutube"
                        :id="recipe.idMeal"
                    />
                </div>
                <div v-else style="color: var(--light); margin: 32px;">No recipes found for this area.</div>
            </div>
    </div>
</template>

<style scoped>
.area-scroll-wrapper {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding: 16px 0;
    margin-bottom: 24px;
}
.area-scroll-wrapper::-webkit-scrollbar {
    height: 6px;
}
.area-scroll-wrapper::-webkit-scrollbar-thumb {
    background: rgba(80,80,80,0.25);
    border-radius: 3px;
}
.area-scroll-wrapper::-webkit-scrollbar-track {
    background: transparent;
}
.area-btn {
    padding: 10px 24px;
    border-radius: 999px;
    border: 2px solid var(--primary);
    background: var(--dark2, #222);
    color: var(--light);
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
}
.area-btn.selected {
    background: var(--primary);
    color: var(--pill-text, #fff);
    border-color: var(--primary);
}
.recipes-container {
    justify-content: flex-start;
    width: 100%;
    padding: 24px 48px;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    /* max-width: 4fr;  */
}

@media (min-width: 1200px) {
  .recipes-container {
    grid-template-columns: repeat(3, 1fr); 
  }
}
</style>