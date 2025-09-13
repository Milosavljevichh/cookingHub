import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Kitchen from "@/views/Kitchen.vue";
import Random from "@/views/Random.vue";
import Saved from "@/views/Saved.vue";
import Recipe from "@/views/Recipe.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path:'/',
            name:'home',
            component: Home
        },
        {
            path:'/kitchens',
            name:'kitchens',
            component: Kitchen
        },
        {
            path:'/surprise',
            name:'surprise',
            component: Random
        },
        {
            path:'/saved',
            name:'saved',
            component: Saved
        },
        {
            path:'/recipe/:id',
            name:'recipe',
            component: Recipe
        }
    ]
})

export default router