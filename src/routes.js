import TheCalendar from './components/calendar/TheCalendar';
import TheMealForm from './components/forms/meal/TheMealForm';
import TheRecipeForm from './components/forms/recipe/TheRecipeForm.vue';
import TheIngredientForm from './components/forms/ingredient/TheIngredientForm.vue';
import TheList from './components/list/TheList';

export const routes = [
   { path: '*', redirect: { name: 'Home' } },
   { path: '', component: TheCalendar, name: 'Calendar' },
   { path: '/list/:type', component: TheList, name: 'List', props: true },
   { path: '/meal/:id?', component: TheMealForm, name: 'Meal', props: true },
   { path: '/recipe/:id?', component: TheRecipeForm, name: 'Recipe', props: true },
   { path: '/ingredient/:id?', component: TheIngredientForm, name: 'Ingredient', props: true }
];