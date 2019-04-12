import Vue from 'vue';
import Vuex from 'vuex'
import categories from './modules/categories';
import subcategories from './modules/subcategories';
import genres from './modules/genres';
import difficulties from './modules/difficulties';
import units from './modules/units';
import meals from './modules/meals';

Vue.use(Vuex);
export const store = new Vuex.Store({
   modules: {
      categories,
      subcategories,
      genres,
      difficulties,
      units,
      meals,
   }
});