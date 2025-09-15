<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const username = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

function validateForm() {
  if (!username.value || username.value.includes(' ')) {
    error.value = 'Username is required and must not contain spaces.';
    return false;
  }
  if (!email.value || !/^\S+@\S+\.\S+$/.test(email.value)) {
    error.value = 'Please enter a valid email address.';
    return false;
  }
  if (!password.value || password.value.length < 6) {
    error.value = 'Password must be at least 6 characters.';
    return false;
  }
  error.value = '';
  return true;
}

async function handleRegister() {
  if (!validateForm()) return;
  loading.value = true;
  await store.dispatch('register', {
    username: username.value,
    email: email.value,
    password: password.value
  });
  loading.value = false;
  if (store.getters.isAuthenticated) {
    router.push('/');
  } else {
    error.value = store.getters.error || 'Registration failed';
  }
}
</script>

<template>
  <div class="auth-container">
      <div class="brand" aria-hidden="true">
          <div class="title">Cooking Hub</div>
          <div class="logo-placeholder">
            LOGO
          </div>
      </div>
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="username">Username</label>
        <input id="username" v-model="username" type="text" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <button type="submit" :disabled="loading">Register</button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
    <p>Already have an account? <router-link to="/login">Login</router-link></p>
  </div>
</template>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 60px auto;
  padding: 32px;
  background: var(--dark2, #222);
  border-radius: 12px;
  color: var(--light);
}
.brand{
      display:flex;
      align-items:center;
      gap:12px;
      margin-bottom:64px;
    }

    .brand .logo-placeholder{
      width:44px;
      height:44px;
      border-radius:10px;
      background: linear-gradient(135deg, rgba(25,169,116,0.08), rgba(25,169,116,0.02));
      border:1px solid rgba(25,169,116,0.12);
      display:flex;
      align-items:center;
      justify-content:center;
      color:var(--primary);
      font-weight:700;
      font-size:13px;
    }

    .brand .title{
      font-weight:700;
      letter-spacing:0.3px;
      color:#fff;
      font-size:2rem;
    }
.form-group {
  margin-bottom: 18px;
}
label {
  display: block;
  margin-bottom: 6px;
}
input {
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid var(--primary);
  background: var(--light);
  color: var(--dark);
}
button {
  padding: 10px 24px;
  background: var(--primary);
  color: var(--light);
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.error {
  color: #e74c3c;
  margin-top: 12px;
}
</style>
