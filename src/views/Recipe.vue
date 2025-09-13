<script setup>
    import {useRoute} from 'vue-router'
    import { ref } from 'vue'

    const id = ref(useRoute().params.id)
    let recipes = ref([])

    function fetchRecipe(query) {
        const kanal = new XMLHttpRequest()
        kanal.open('GET', 'https://themealdb.com/api/json/v1/1/lookup.php?i=' + query, true)
        kanal.send()
        console.log('nesto')
        kanal.onreadystatechange = () => {
            if (kanal.readyState === 4 && kanal.status === 200) {
                let data = JSON.parse(kanal.responseText)
                recipes.value = data.meals || []
                console.log(recipes.value)
            }
        }
        
    }
    fetchRecipe(id.value)
    
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
  <section v-if="recipes.length" class="preperations">
    <div class="img_container">
      <img :src="recipes[0].strMealThumb" :alt="recipes[0].strMeal" />
    </div>

    <div class="recipe_heading">
      <h1 id="main_heading">{{ recipes[0].strMeal }}</h1>
      <p>Category: {{ recipes[0].strCategory }} | Area: {{ recipes[0].strArea }}</p>
    </div>

    <div class="ingredients">
      <div class="ingredients_heading">
        <h2 class="heading">Ingredients</h2>
      </div>
      <div class="ingredients_content">
        <ul>
          <li v-for="(item, i) in getIngredients(recipes[0])" :key="i">{{ item }}</li>
        </ul>
      </div>
    </div>
  </section>

  <section v-if="recipes.length" class="instructions">
    <div class="instructions_heading">
      <h2 class="heading">Instructions</h2>
    </div>
    <div class="instructions_content">
      <ol>
        <li v-for="(step, i) in getInstructions(recipes[0], i)" :key="i">{{ step }}</li>
      </ol>
    </div>

    <div class="extra_links">
      <a v-if="recipes[0].strSource" :href="recipes[0].strSource" target="_blank">Source</a>
      <a v-if="recipes[0].strYoutube" :href="recipes[0].strYoutube" target="_blank">Watch on YouTube</a>
    </div>
  </section>
</template>

<style scoped>
:root{

        /* PRIMARY of Heading and Sub-heading */
    --nutmeg-color: hsl(14, 45%, 36%);
    --raspberry-color: hsl(332, 51%, 32%);


        /* NEUTRAL */
    --white-color: hsl(0, 0%, 100%);
    --rosewhite-color: hsl(330, 100%, 98%);
    --eggshell-color: hsl(30, 54%, 90%);
    --lightgrey-color: hsl(30, 18%, 87%);
    --wengebrown-color: hsl(30, 10%, 34%);
    --darkcharcoal-color: hsl(24, 5%, 18%);


        /* Font Family */
    --heading-font: 'Young Serif', serif;
    --paragraph-font: 'Outfit', sans-serif;

    


    /* UL elements Padding*/
   /* 40px */
}

h1, h2{
    font-weight: lighter;
}

p{
    font-size: 1rem;
}

.heading{
    color: var(--nutmeg-color);
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
    color: var(--raspberry-color);
}

.prep_total_time{
    padding-inline: 7% 7%;
}

.prep_total_time li, .ingredients_content li{
    padding: 6px;
    padding-left: 15px;
    
}

.prep_total_time li::marker{
    color: var(--raspberry-color);
}

.prep_total_time span, .instructions_content span{
    font-weight: 600;
    color: var(--darkcharcoal-color);
}

.preperations{
    margin: 0 35px 0 35px;
}

.ingredients{
    margin-bottom: 4%;
}

.ingredients_heading, .instructions_heading{
    padding-bottom: 10px;
    
}

.ingredients_content li::marker , .instructions_content li::marker{
    color: var(--nutmeg-color);
    font-weight: 600;
}


.ingredients_content, .instructions_content{
    padding-inline: 4% 4%;
}

.instructions{
    border-top: 1px solid var(--lightgrey-color);
    margin: 0 35px 0 35px
}

.instructions_content li{
    padding: 5px 0 5px 15px;
}

.instructions_heading{
    margin-top: 25px;
}

.instructions_content{
    border-bottom: 1px solid var(--lightgrey-color);
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
    border-bottom: 1px solid var(--lightgrey-color);    
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
    color: var(--nutmeg-color);
}
}





.attribution{
    display: none;
}

</style>