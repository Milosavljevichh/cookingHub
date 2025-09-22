import './assets/main.css'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Restore persisted auth/session before router navigation
store.dispatch('loadUserFromStorage')

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
