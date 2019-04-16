import Vue from 'vue';
import Resource from 'vue-resource';

Vue.use(Resource);

const state = {
   subcategories: []
};

const getters = {
   getAll(state) {
      return state.subcategories;
   }
};

const mutations = {
   setSubcategories(state, payload) {
      state.subcategories = payload;
   }
};

const actions = {
   setSubcategories({ commit }, payload) {
      commit('setSubcategories', payload);
   },
   initialize({ commit }) {
      let result = [];
      Vue.http.get('subcategory')
         .then(response => {
            return response.json();
         })
         .then(data => {
            data.forEach(cur => result.push(cur));    
         })
         .then(() => {
            commit('setSubcategories', result);
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