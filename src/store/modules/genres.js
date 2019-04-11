import Vue from 'vue';
import Resource from 'vue-resource';

Vue.use(Resource);

const state = {
   genres: []
};

const getters = {
   getAll(state) {
      return state.genres;
   }
};

const mutations = {
   setGenres(state, payload) {
      state.genres = payload;
   }
};

const actions = {
   setGenres({ commit }, payload) {
      commit('setGenres', payload);
   },
   initialize({ commit }) {
      let result = [];
      Vue.http.get('genre')
         .then(response => {
            return response.json();
         })
         .then(data => {
            data.forEach(cur => result.push(cur));    
         }, error => {
            console.log(error); // TODO remove for deploy
         })
         .then(() => {
            commit('setGenres', result);
         });
   }
};

export default {
   state,
   getters,
   mutations,
   actions,
   namespaced: true
};