import TheCalendar from './components/calendar/TheCalendar';
import TheMealForm from './components/forms/meal/TheMealForm';
import TheRecipeForm from './components/forms/recipe/TheRecipeForm.vue';
import TheIngredientForm from './components/forms/ingredient/TheIngredientForm.vue';
import TheList from './components/list/TheList';
import TheSettings from './components/settings/TheSettings';

export const routes = [
   { path: '*', redirect: { name: 'home' } },
   { path: '', component: TheCalendar, name: 'calendar' },
   { path: '/list/:type', component: TheList, name: 'list', props: true },
   { path: '/meal/:id?', component: TheMealForm, name: 'meal', props: true },
   { path: '/recipe/:id?', component: TheRecipeForm, name: 'recipe', props: true },
   { path: '/ingredient/:id?', component: TheIngredientForm, name: 'ingredient', props: true },
   { path: '/settings', component: TheSettings, name: 'settings' }
];