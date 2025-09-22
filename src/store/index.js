import { createStore } from 'vuex'

export default createStore({
    state: {
      recipes: [],
      searchText: '',
      selectedRecipe: null,
      favorites: [],
      user: null,
      token: null,
      role: null,
      loading: false,
      error: null
    },
  mutations: {
    setRecipes(state, recipes) {
      state.recipes = recipes
    },
    setSearchText(state, text) {
      state.searchText = text
    },
    setSelectedRecipe(state, recipe) {
      state.selectedRecipe = recipe
    },
    addFavorite(state, recipeId) {
      if (!state.favorites.includes(recipeId)) {
        state.favorites.push(recipeId)
      }
    },
    removeFavorite(state, recipeId) {
      state.favorites = state.favorites.filter(id => id !== recipeId)
    },
    setUser(state, user) {
      state.user = user
    },
    setToken(state, token) {
      state.token = token
    },
    setRole(state, role) {
      state.role = role
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    setError(state, error) {
      state.error = error
    }
  },
  actions: {
    async fetchRecipes({ commit }, query) {
      commit('setLoading', true)
      try {
        const res = await fetch('https://themealdb.com/api/json/v1/1/search.php?s=' + query)
        const data = await res.json()
        commit('setRecipes', data.meals || [])
        commit('setError', null)
      } catch (e) {
        commit('setError', e)
      } finally {
        commit('setLoading', false)
      }
    },
    async fetchRecipeById({ commit }, id) {
      commit('setLoading', true)
      try {
        const res = await fetch('https://themealdb.com/api/json/v1/1/lookup.php?i=' + id)
        const data = await res.json()
        commit('setSelectedRecipe', data.meals ? data.meals[0] : null)
        commit('setError', null)
      } catch (e) {
        commit('setError', e)
      } finally {
        commit('setLoading', false)
      }
    },
    async fetchSavedRecipes({ state, commit }) {
      commit('setLoading', true)
      try {
        const promises = state.favorites.map(id =>
          fetch('https://themealdb.com/api/json/v1/1/lookup.php?i=' + id)
            .then(res => res.json())
            .then(data => data.meals ? data.meals[0] : null)
        );
        const recipes = (await Promise.all(promises)).filter(Boolean);
        commit('setRecipes', recipes);
        commit('setError', null);
      } catch (e) {
        commit('setError', e);
      } finally {
        commit('setLoading', false);
      }
    },
    async login({ commit }, { email, password }) {
      commit('setLoading', true);
      try {
        // Replace with your backend API endpoint
        const res = await fetch('http://localhost:3001/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (data.token && data.user) {
          commit('setUser', data.user);
          commit('setToken', data.token);
          commit('setRole', data.user.role);
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.user.role);
          commit('setError', null);
        } else {
          commit('setError', data.error || 'Login failed');
        }
      } catch (e) {
        commit('setError', e.message || 'Login error');
      } finally {
        commit('setLoading', false);
      }
    },
    async register({ commit }, { username, email, password }) {
      commit('setLoading', true);
      try {
        // Replace with your backend API endpoint
        const res = await fetch('http://localhost:3001/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password })
        });
        const data = await res.json();
        if (data.token && data.user) {
          commit('setUser', data.user);
          commit('setToken', data.token);
          commit('setRole', data.user.role);
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.user.role);
          commit('setError', null);
        } else {
          commit('setError', data.error || 'Registration failed');
        }
      } catch (e) {
        commit('setError', e.message || 'Registration error');
      } finally {
        commit('setLoading', false);
      }
    },
    loadUserFromStorage({ commit }) {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      if (user && token && role) {
        commit('setUser', JSON.parse(user));
        commit('setToken', token);
        commit('setRole', role);
      }
    }
  },
  getters: {
    recipes: state => state.recipes,
    searchText: state => state.searchText,
    selectedRecipe: state => state.selectedRecipe,
    favorites: state => state.favorites,
    user: state => state.user,
    token: state => state.token,
    role: state => state.role,
    loading: state => state.loading,
    error: state => state.error,
    isAuthenticated: state => !!state.token,
    favoriteRecipes: state => {
      // Return recipe objects for favorited IDs
      return state.recipes.filter(r => state.favorites.includes(r.idMeal))
    }
  }
})
