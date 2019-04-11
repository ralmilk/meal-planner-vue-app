import Vue from 'vue';
import Resource from 'vue-resource';

Vue.use(Resource);

const state = {
   difficulties: []
};

const getters = {
   getAll(state) {
      return state.difficulties;
   }
};

const mutations = {
   setDifficulties(state, payload) {
      state.difficulties = payload;
   }
};

const actions = {
   setDifficulties({ commit }, payload) {
      commit('setDifficulties', payload);
   },
   initialize({ commit }) {
      let result = [];
      Vue.http.get('difficulty')
         .then(response => {
            return response.json();
         })
         .then(data => {
            data.forEach(cur => result.push(cur));    
         }, error => {
            console.log(error); // TODO remove for deploy
         })
         .then(() => {
            commit('setDifficulties', result);
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