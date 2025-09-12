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
        <div class="group">
            <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
            <input v-model="searchText" placeholder="Search" type="search" name="searchbar" id="searchbar">
        </div>
        <div class="profile">
            <button id="logout">Log out</button>
        </div>
    </header>
</template>

<style>
    header {
    box-sizing: border-box;
    width: 100%;
    height: 7vh;
    background-color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 48px;
    }

    #logout {
        background-color: transparent;
        border: none;
        color: var(--light);
        font-weight: bold;
        font-size: 1.1rem;
    }

    .group {
    display: flex;
    line-height: 28px;
    align-items: center;
    position: relative;
    max-width: 400px;
    }

    #searchbar {
    width: 100%;
    height: 30px;
    line-height: 28px;
    padding: 0 1rem;
    padding-left: 2.5rem;
    border: 2px solid transparent;
    border-radius: 8px;
    outline: none;
    background-color: #f3f3f4;
    color: #0d0c22;
    transition: .3s ease;
    }

    .input::placeholder {
    color: #9e9ea7;
    }

    .input:focus, input:hover {
    outline: none;
    border-color: rgba(234,76,137,0.4);
    background-color: #fff;
    box-shadow: 0 0 0 4px rgb(234 76 137 / 10%);
    }

    .icon {
    position: absolute;
    left: 1rem;
    fill: #9e9ea7;
    width: 1rem;
    height: 1rem;
    }
</style>