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

    fetchRecipe('52772')
    
</script>
<template>
    <p>{{ id }}</p>
</template>