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
        width: 150px;
        height: 150px;
    }
</style>