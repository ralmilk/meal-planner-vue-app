import Vue from 'vue';
import Resource from 'vue-resource';

Vue.use(Resource);

const state = {
   units: []
};

const getters = {
   getAll(state) {
      return state.units;
   }
};

const mutations = {
   setUnits(state, payload) {
      state.units = payload;
   }
};

const actions = {
   setUnits({ commit }, payload) {
      commit('setUnits', payload);
   },
   initialize({ commit }) {
      let result = [];
      Vue.http.get('unit')
         .then(response => {
            return response.json();
         })
         .then(data => {
            data.forEach(cur => result.push(cur));    
         })
         .then(() => {
            commit('setUnits', result);
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