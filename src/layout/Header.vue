<script setup>
    import { ref, computed } from 'vue';

    let searchText = ref('')
    //!!!NOTE trenutno se ovde radi search ali to ce se prebaciti u vuex
    let filterRecipes = computed(()=>{
        let s = searchText.value
        if (!s) return ''
    })
</script>

<template>
    <header>
        <input v-model="searchText" type="text" name="searchbar" id="searchbar">
    </header>
</template>

<style>
    header {
        width: 100%;
        height: 7vh;
        max-height: 100px;
        background-color: var(--primary);
    }
</style>