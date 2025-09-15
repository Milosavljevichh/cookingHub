<script setup>
    import { useRoute } from 'vue-router'
    import { computed, onMounted } from 'vue'
    import { useStore } from 'vuex'

    const route = useRoute()
    const store = useStore()

    const selectedRecipe = computed(() => store.getters.selectedRecipe)

    onMounted(() => {
      store.dispatch('fetchRecipeById', route.params.id)
    })
    
        // funkcija koja spaja sastojke i mere
const getIngredients = (recipe) => {
    const ingredients = []
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`]
        const measure = recipe[`strMeasure${i}`]
        if (ingredient && ingredient.trim() !== "") {
            ingredients.push(`${measure} ${ingredient}`)
        }
    }
    return ingredients
}

// instrukcije podelimo po redovima (ako je odvojeno sa \r\n ili STEP)
const getInstructions = (recipe, i) => {
    return recipe.strInstructions
        ? recipe.strInstructions.split(/(?:\r?\n|STEP\s*\d+)/i).filter(line => line.trim() !== "")
        : []
}
</script>
<template>
    <section v-if="selectedRecipe" class="preperations">
        <div class="img_container">
            <img :src="selectedRecipe.strMealThumb" :alt="selectedRecipe.strMeal" />
        </div>
        <div>
                <div class="recipe_heading">
                    <h1 id="main_heading">{{ selectedRecipe.strMeal }}</h1>
                    <p>Category: {{ selectedRecipe.strCategory }} | Area: {{ selectedRecipe.strArea }}</p>
                </div>
    
                <div class="ingredients">
                    <div class="ingredients_heading">
                        <h2 class="heading">Ingredients</h2>
                    </div>
                    <div class="ingredients_content">
                        <ul>
                            <li v-for="(item, i) in getIngredients(selectedRecipe)" :key="i">{{ item }}</li>
                        </ul>
                    </div>
                </div>
        </div>
    </section>

    <section v-if="selectedRecipe" class="instructions">
        <div class="instructions_heading">
            <h2 class="heading">Instructions</h2>
        </div>
        <div class="instructions_content">
            <ol>
                <li v-for="(step, i) in getInstructions(selectedRecipe, i)" :key="i">{{ step }}</li>
            </ol>
        </div>

        <div class="extra_links">
            <a v-if="selectedRecipe.strSource" :href="selectedRecipe.strSource" target="_blank">Source</a>
            <a v-if="selectedRecipe.strYoutube" :href="selectedRecipe.strYoutube" target="_blank">Watch on YouTube</a>
        </div>
    </section>
</template>

<style scoped>

*{
    color: var(--light);
}

h1, h2{
    font-weight: lighter;
}

p{
    font-size: 1rem;
}

.heading{
    color: var(--light);
}

.img_container{
    margin: 0 auto;
    padding: 35px 0 35px 0;
    margin-bottom: 20px;
}

.img_container img{
    height: 350px;
    object-fit: cover;
    object-position: top;
    border-radius: 15px;
    display: block;
    margin: auto;
}



#main_heading{
    font-size: 40px;
    margin-bottom: 20px;
    font-weight: 400;
    
}

.prep_time{
    margin-top: 7%;
    margin-bottom: 7%;
}

.prep_time_heading{
    padding-inline: 3% 3%;
    font-size: 20px;
    margin-bottom: 5px;
    color: var(--light);
}

.prep_total_time{
    padding-inline: 7% 7%;
}

.prep_total_time li, .ingredients_content li{
    padding: 6px;
    padding-left: 15px;
    
}

.prep_total_time li::marker{
    color: var(--light);
}

.prep_total_time span, .instructions_content span{
    font-weight: 600;
    color: var(--light);
}

.preperations{
    margin: 45px 35px 0 35px;
    display: flex;
    flex-direction: row-reverse;
    padding: 0 35px;
}

.ingredients{
    margin-bottom: 4%;
}

.ingredients_heading, .instructions_heading{
    padding-bottom: 10px;
    
}

.ingredients_content li::marker , .instructions_content li::marker{
    color: var(--light);
    font-weight: 600;
}


.ingredients_content, .instructions_content{
    padding-inline: 4% 4%;
}

.instructions{
    border-top: 1px solid var(--light);
    margin: 0 35px 45px 35px
}

.instructions_content li{
    padding: 5px 0 5px 15px;
}

.instructions_heading{
    margin-top: 25px;
}

.instructions_content{
    border-bottom: 1px solid var(--light);
    padding-bottom: 25px;
}

.nutrition_heading{
    margin: 15px 0 15px 0;
}

.nutrition_heading p{
    margin-top: 15px;
}

.nutrition_table{
    padding-bottom: 7%;
}

table{
    width: 100%;
    border-collapse: collapse;
    padding: 3px 0 3px 0;
}

tr:nth-child(-n+3){
    border-bottom: 1px solid var(--light);    
}

th, td{
    padding: 15px 0 15px 0;
}

tbody th{
    text-align: left;
    font-weight: normal;
    padding-inline: 5% 5%;
}

tbody td{
    font-weight: bold;
}


@media (min-width: 320px) and (max-width: 425px) {
body{
    background-color: red;
}

main{
    width: 100%;
    border-radius: 0;
    margin: 0;
}

.preperations{
    
    margin: 0;
    
    .img_container{
        padding: 0;
        margin: 0;
    }

    img{
        border-radius: 0;
    }

    #main_heading{
        font-size: 36px;
    }

    p{
        font-size: 15.5px;
        line-height: 1.4;
    }

    .prep_total_time{
        padding-inline: 12% 12%;
    }

    .prep_time_heading {
        padding-inline: 7%;
    }
}

.instructions_heading{
    h2{
        font-size: 26px;
    }
}

.heading{
    font-weight: 700;
}

.recipe_heading, .prep_time, .ingredients{
    margin: 10% 35px 10% 35px;
}

tbody td{
    color: var(--light);
}
}





.attribution{
    display: none;
}

</style>