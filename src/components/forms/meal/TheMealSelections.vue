<template>
   <div id='meal-selections'>
      <h3>Selections</h3>
      <span> - Selections will appear below. Click (x) to remove a selection.</span>
      <transition name='fade'>
         <div id='entree-selections' v-if='entree.length > 0'>
            <p class='selection-heading'>Entree:</p>        
            <div class='selection'>
               <p>{{ entree[0].name }}</p><i @click="removeSelection(entree.selectionIndex)" class="far fa-times-circle"></i>
            </div> 
         </div>
      </transition>
      <transition name='fade'>
         <div id='side-selections' v-if='sides.length > 0'>
            <p class='selection-heading'>Side(s):</p>
               <div class='selection' 
                     v-for='side in sides' 
                     :key='side.Id'>
               <p>{{ side.name }}</p><i @click="removeSelection(side.selectionIndex)" class="far fa-times-circle"></i>
            </div> 
         </div>
      </transition>
      <transition name='fade'>
         <div id='dessert-selections' v-if='dessert.length > 0'>
            <p class='selection-heading'>Desserts:</p>        
            <div class='selection'>
               <p>{{ dessert[0].name }}</p><i @click="removeSelection(dessert.selectionIndex)" class="far fa-times-circle"></i>
            </div> 
         </div>
      </transition>
   </div>
</template>

<script>
import {eventBus} from '../../../main.js';
export default {
   props: {
      selections: Array
   },
   methods: {
      removeSelection(type, index = -1) {
         eventBus.$emit('selectionDeleted', index);
      }
   },
   computed: {
      entree() {
         return this.selections.map((el, index) => {
            if(el.Category.Id === 1) {
               return {
                  selectionIndex: index,
                  name: el.Recipe.Title
               };
            }
         }).filter(el => el !== undefined);
      },
      sides() {
        return (this.selections.map((el, index) => {
            if(el.Category.Id === 2 || el.Category.Id === 4) {
               return {
                  selectionIndex: index,
                  name: el.Category.Id === 4 ? el.Ingredient.Description : el.Recipe.Title 
               };
            } 
         })).filter(el => el !== undefined);
      },
      dessert() {
         return this.selections.map((el, index) => {
            if(el.Category.Id === 3) {
               return {
                  selectionIndex: index,
                  name: el.Recipe.Title
               };
            }
         }).filter(el => el !== undefined);
      }
   }
}
</script>

<style>
#meal-selections {
    float:left;
    padding: 20px;
}
#meal-selections h3 {
   display: inline-block;
}
#entree-selections,
#side-selections,
#dessert-selections {
    clear: both;
    font-weight: bold;
}

#entree-selections .selection {
    background-color: #F9E7A4;
}
#side-selections .selection {
    background-color: #F4976C;
}
#dessert-selections .selection {
    background-color: #9DA8D3;
}

.selection-heading{
    float: left;
    margin: 10px 10px 10px 0;
}
.selection {
    padding: 3px 5px;
    border-radius: 5px;
    margin: 6px 2px 2px 2px;
    float: left;
}
.selection p {
    display: inline;
}
.selection i{
    margin: 0 0 0 5px;
    cursor: pointer;
}
</style>