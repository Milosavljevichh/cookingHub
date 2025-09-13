<script setup>
    import RecipeContainer from '@/components/RecipeContainer.vue';
    import { defineProps } from 'vue';

    const props = defineProps({
        search:{
            type: String,
            default: ''
        }
    })
</script>

<template>
    <RecipeContainer :searchText="search" />
</template>