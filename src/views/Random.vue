<script setup>
    import { onMounted } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';

    const store = useStore();
    const router = useRouter();

    onMounted(()=>{
        store.dispatch('getRandomRecipe', { router })
    })
</script>

<template>
    <div>

    </div>
</template>