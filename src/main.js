import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';
import App from './App.vue';

// event bus
export const eventBus = new Vue();

// Vue Resource
Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:50990/api';
// Vue.http.interceptors.push((request, next) => {
//    if(request.method == 'POST' || request.method == 'PUT') {
//       request.headers.set('Content-Type', 'application/json');
//    }
//    next();
// });

// Vue Router
Vue.use(VueRouter);
const router = new VueRouter({ routes: routes });

// Main Vue Instance
new Vue({
   el: '#app',
   router: router,
   render: h => h(App)
});