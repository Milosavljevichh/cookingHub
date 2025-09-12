<script setup>
    import { defineProps } from 'vue';
    defineProps({
        title: String
    })
</script>

<template>
    <article>
        {{ title }}
    </article>
</template>

<style>
    article{
        background-color: red;
        width: 100%;
        height: 100%;
        min-height: 175px;
    }
</style>