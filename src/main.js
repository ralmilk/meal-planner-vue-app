import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App.vue';

export const eventBus = new Vue({
   methods: {
      goTo(type) {
         this.$emit('goTo', type);
      }
   }
});

Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:50990/api/';

Vue.http.interceptors.push((request, next) => {
   if(request.method == 'POST' || request.method == 'PUT') {
      request.headers.set('Content-Type', 'application/json');
   }

   console.log(request);
   next();
   // request.headers.set('Authorization', 'Bearer TOKEN');
});

new Vue({
   el: '#app',
   render: h => h(App)
});