<template>
   <div id='search-topbar'>    
      <label for='search'>Search: </label>
      <input type='text' name='search'>
      <router-link :to="{ name: type.toLowerCase() }" class='btn'>Add New {{ type }}</router-link>
      <toggle-switch :rightDescr="showDeleted ? 'Hide Deleted' : 'Show Deleted'"></toggle-switch>
   </div>
</template>

<script>
import { eventBus } from '../../main.js';
import ToggleSwitch from '../forms/ToggleSwitch';

export default {
   props: ['type'],    
   data() {
      return {
         showDeleted: false
      }
   },
   created() {
      eventBus.$on('switchToggled', (type) => {
         if(type === 'showDeleted') {
            this.showDeleted = !this.showDeleted;
         }
      });
   },
   components: {
      'toggle-switch': ToggleSwitch
   }
}
</script>

<style scoped>
label {
    font-weight: bold;
}
input, select {
    font-family: 'Ink Free Regular', sans-serif;
    font-size: 110%;
}
#search-topbar {
    height: 40px;
    font-size: 120%;
    margin-bottom: 20px;
}
#search-topbar  {
    height: 40px;
    font-size: 120%;
}
.show-deleted {
    font-size: 80%;
    margin-left: 10px;
    cursor: pointer;
}
.btn {
    background-color: #303C6C;
    color: #fff;    
    font-family: 'Ink Free Regular', sans-serif;
    padding: 3px 5px;
    cursor: pointer;
}
</style>