import { createStore } from 'vuex'

export default createStore({
  state: {
    recipes: [],
    searchText: '',
    selectedRecipe: null,
    favorites: [],
    user: null,
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
    }
  },
  getters: {
    recipes: state => state.recipes,
    searchText: state => state.searchText,
    selectedRecipe: state => state.selectedRecipe,
    favorites: state => state.favorites,
    user: state => state.user,
    loading: state => state.loading,
    error: state => state.error,
    favoriteRecipes: state => {
      // Return recipe objects for favorited IDs
      return state.recipes.filter(r => state.favorites.includes(r.idMeal))
    }
  }
})
