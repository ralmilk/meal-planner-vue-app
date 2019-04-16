import Vue from 'vue';
import Resource from 'vue-resource';

Vue.use(Resource);

const state = {
   meals: [],
   dates: {
      startDate: '',
      endDate: ''
   }
};

const getters = {
   getMeals(state) {
      return state.meals;
   },
   getDates(state) {
      return state.dates;
   }
};

const mutations = {
   setMeals(state, payload) {
      state.meals = payload;
   },
   setDates(state, payload) {
      state.dates.startDate = payload.startDate;
      state.dates.endDate = payload.endDate;
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
         }, error => {})
         .then(() => {
            commit('setMeals', result);
            commit('setDates', payload);
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