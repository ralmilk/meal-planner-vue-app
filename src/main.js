import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';
import App from './App.vue';
import { store } from './store/store';

// event bus
export const eventBus = new Vue();

// Vue Resource
Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:50990/api';

// Vue Router
Vue.use(VueRouter);
const router = new VueRouter({ routes });

// Main Vue Instance
new Vue({
   el: '#app',
   router,
   store,
   render: h => h(App)
});