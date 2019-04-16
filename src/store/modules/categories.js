import Vue from 'vue';
import Resource from 'vue-resource';

Vue.use(Resource);

const state = {
   categories: []
};

const getters = {
   getAll(state) {
      return state.categories;
   }
};

const mutations = {
   setCategories(state, payload) {
      state.categories = payload;
   }
};

const actions = {
   setCategories({ commit }, payload) {
      commit('setCategories', payload);
   },
   initialize({ commit }) {
      let result = [];
      Vue.http.get('category')
         .then(response => {
            return response.json();
         })
         .then(data => {
            data.forEach(cur => result.push(cur));    
         })
         .then(() => {
            commit('setCategories', result);
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