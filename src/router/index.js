import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Kitchen from "@/views/Kitchen.vue";
import Random from "@/views/Random.vue";
import Saved from "@/views/Saved.vue";
import Recipe from "@/views/Recipe.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import store from "@/store"; // Import Vuex store

// Ensure auth is restored before any navigation checks
store.dispatch('loadUserFromStorage');
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
        },
        {
            path:'/login',
            name:'login',
            component: Login
        },
        {
            path:'/register',
            name:'register',
            component: Register
        }
    ]
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    // Use store first, but fall back to localStorage during initial hydration
    const token = store.getters.token || localStorage.getItem('token');
    const isLoggedIn = !!token;

    if (authRequired && !isLoggedIn) {
        return next('/login');
    }
    next();
});

export default router