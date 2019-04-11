import Vue from 'vue';
import Resource from 'vue-resource';

Vue.use(Resource);

const state = {
   meals: []
};

const getters = {
   getMeals(state) {
      return state.meals;
   }
};

const mutations = {
   setMeals(state, payload) {
      state.meals = payload;
   }
};

const actions = {
   setMeals({ commit }, payload) {
      commit('setMeals', payload);
   },
   getMealsByDateRange({ commit }, payload) {
      let result = [];
      Vue.http.get(`meal/calendar/${payload.startDate}/${payload.endDate}`)
         .then(response => {
            return response.json();
         })
         .then(data => {
            data.forEach(cur => result.push(cur));    
         }, error => {
            console.log(error); // TODO remove for deploy
         })
         .then(() => {
            commit('setMeals', result);
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