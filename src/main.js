import Vue from 'vue'
import App from './App.vue'

export const eventBus = new Vue({
   methods: {
      goTo(type) {
         this.$emit('goTo', type);
      }
   }
});

new Vue({
   el: '#app',
   render: h => h(App)
});