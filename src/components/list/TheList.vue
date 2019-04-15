<template>
   <div>
      <div class="search-container">
         <div id='search-topbar'>    
            <label for='search'>Search: </label>
            <input type='text' name='search' v-model='searchString'>
            <router-link :to="{ name: type }" class='btn'>Add New {{ type }}</router-link>
            <toggle-switch :rightDescr="showDeleted ? 'Hide Deleted' : 'Show Deleted'"></toggle-switch>
         </div>
      </div>
      
      <transition name='fade' mode='out-in'>
         <the-list-table v-if='items.length > 0 && this.fetched'
                        :type='type' 
                        :items='shownItems'>
         </the-list-table>
      </transition>
   </div> 
</template>

<script>
import { eventBus } from '../../main.js';
import TheListTable from './TheListTable';
import ToggleSwitch from '../forms/ToggleSwitch';

export default {
   props: {
      type: String
   },
   data() {
      return {
         searchString: '',
         items: [],
         showDeleted: false,
         fetched: false
      }
   },
   created() {
      if(this.type === 'Ingredient') {
         this.fetchAllIngredients();
      } else if (this.type === 'Recipe') {
         this.fetchAllRecipes();
      }

      eventBus.$on('switchToggled', (type) => {
         if(type === 'showDeleted') {
            this.showDeleted = !this.showDeleted;
         }
      });
   },
   computed: {
      shownItems() {
         return this.items.filter(item => {
            if(this.type === 'Ingredient') {
               return (item.Description || '').includes(this.searchString) && (item.ActiveFlg === 'Y' || this.showDeleted);
            } else if (this.type === 'Recipe') {
               return (item.Title || '').includes(this.searchString) && (item.ActiveFlg === 'Y' || this.showDeleted);
            }
         });
      }
   },
   watch: {
      type() {
         this.fetched = false;
         if(this.type === 'Ingredient') {
            this.fetchAllIngredients();
         } else if (this.type === 'Recipe') {
            this.fetchAllRecipes();
         }
      }
   },
   methods: {
      fetchAllIngredients() {
         let result = [];
         this.$http.get(`ingredient`)
            .then(response => {
               return response.json();
            })
            .then(data => data.forEach(cur => result.push(cur)), 
                  error => console.log(error))
            .then(() => {
               this.items = result;
               this.fetched = true;
            });
      },
      fetchAllRecipes() {
         let result = [];
         this.$http.get(`recipe`)
            .then(response => {
               return response.json();
            })
            .then(data => data.forEach(cur => result.push(cur)), 
                  error => console.log(error))
            .then(() => {
               this.items = result;
               this.fetched = true;
            });
      }
   },
   components: {
      'the-list-table': TheListTable,
      'toggle-switch': ToggleSwitch
   }
}
</script>

<style>
.search-container {
   background-color: rgba(255, 255, 255, 0.5);
   padding: 10px 20px 0px;
   border-radius: 10px;
   margin-top: 110px;
}
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
#search-topbar .btn {
    background-color: #303C6C;
    color: #fff;    
    font-family: 'Ink Free Regular', sans-serif;
    padding: 3px 5px;
    cursor: pointer;
}
</style>