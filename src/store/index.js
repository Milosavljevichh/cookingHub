import { createStore } from 'vuex'
const API_BASE = (import.meta && import.meta.env && import.meta.env.VITE_API_URL) || 'http://localhost:3001/api';

export default createStore({
    state: {
      recipes: [],
      randomRecipe: [],
      searchText: '',
      allAreas: [],
      selectedArea: null,
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
    setFavorites(state, ids) {
      state.favorites = ids
      console.log('Favorites set to:', state.favorites);
    },
    setAllAreas(state, areas) {
      state.allAreas = areas
    },
    setRandomRecipe(state, recipe) {
      state.randomRecipe = recipe
    },
    setSearchText(state, text) {
      state.searchText = text
    },
    setSelectedRecipe(state, recipe) {
      state.selectedRecipe = recipe
    },
    addFavorite(state, recipeId) {
      const rid = String(recipeId)
      if (!state.favorites.includes(rid)) {
        state.favorites.push(rid)
      }
    },
    removeFavorite(state, recipeId) {
      const rid = String(recipeId)
      state.favorites = state.favorites.filter(id => id !== rid)
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
      state.favorites = [];
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
    async fetchFavorites({ state, commit }) {
      if (!state.token) { commit('setFavorites', []); return; }
      try {
        const res = await fetch(`${API_BASE}/favorites`, {
          headers: { 'Authorization': `Bearer ${state.token}` }
        });
        if (res.status === 404) {
          // Backend endpoint doesn't exist yet, default to empty favorites
          commit('setFavorites', []);
          console.log('no backend')
          return;
        }
        const data = await res.json();
        console.log('Fetched favorites from server:', data);
        commit('setFavorites', data.favorites);
      } catch (e) {
        // Handle network errors by defaulting to empty favorites
        commit('setFavorites', []);
        commit('setError', e);
      }
    },
    async addFavoriteServer({ state, commit, dispatch }, recipeId) {
      if (!state.token) return;
      try {
        const res = await fetch(`${API_BASE}/favorites/${recipeId}`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${state.token}` }
        });
        if (!res.ok) throw new Error('Failed to add favorite');
        commit('addFavorite', recipeId);
      } catch (e) {
        commit('setError', e.message || e);
      }
    },
    async removeFavoriteServer({ state, commit }, recipeId) {
      if (!state.token) return;
      try {
        const res = await fetch(`${API_BASE}/favorites/${recipeId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${state.token}` }
        });
        if (!res.ok) throw new Error('Failed to remove favorite');
        commit('removeFavorite', recipeId);
      } catch (e) {
        commit('setError', e.message || e);
      }
    },
    async login({ commit, dispatch }, { email, password }) {
      commit('setLoading', true);
      try {
        const res = await fetch(`${API_BASE}/login`, {
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
          // Wait for favorites to load before fetching recipe details
          await dispatch('fetchFavorites');
          if (this.state.favorites.length > 0) {
            await dispatch('fetchSavedRecipes');
          }
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
    async register({ commit, dispatch }, { username, email, password }) {
      commit('setLoading', true);
      try {
        const res = await fetch(`${API_BASE}/register`, {
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
          // Wait for favorites to load before fetching recipe details
          await dispatch('fetchFavorites');
          if (this.state.favorites.length > 0) {
            await dispatch('fetchSavedRecipes');
          }
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
    loadUserFromStorage({ commit, dispatch, state }) {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      if (user && token && role) {
        commit('setUser', JSON.parse(user));
        commit('setToken', token);
        commit('setRole', role);
        // Wait for favorites to load, then fetch recipe details only if we have favorites
        dispatch('fetchFavorites').then(() => {
          if (state.favorites.length > 0) {
            dispatch('fetchSavedRecipes');
          }
        });
      }
    },
    async getRandomRecipe({ commit }, { router }) {
      commit('setLoading', true);
      try {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        const data = await res.json()
        if (data.meals) {
          router.push('/recipe/' + data.meals[0].idMeal)
        } else {
          commit('setError', 'No random recipe found');
        }
      } catch (err) {
        commit('setError', err);
      } finally {
        commit('setLoading', false)
      }
    },
    async fetchAllAreas({ commit }) {
      commit('setLoading', true);
      try {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        const data = await res.json();
        commit('setAllAreas', data.meals || []);
      } catch (e) {
        commit('setError', e);
      } finally {
        commit('setLoading', false);
      }
  }
},
  getters: {
    recipes: state => state.recipes,
    allAreas: state => state.allAreas.map((area) => (
      area.strArea
    )),
    selectedArea: state => state.selectedArea,
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
      // Return recipe objects for favorited IDs (normalize IDs to string)
      return state.recipes.filter(r => state.favorites.includes(String(r.idMeal)))
    }
  }
})
