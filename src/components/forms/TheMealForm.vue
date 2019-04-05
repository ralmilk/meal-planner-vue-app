<template>
   <the-form-template>
      <div id='topbar' slot='topbar-content'>
         <div class='radio-btn'>
            <label for='H'>Home</label><input checked='checked' type='radio' name='mealType' value='H'>
            <label for='R'>Restaurant</label><input type='radio' name='mealType' value='R'>
         </div>

         <input class='btn' @click.prevent='' type='submit' value='Save'>
         <a class='btn btn-delete' >Delete Meal</a>
         <a class='btn' @click="goTo('the-calendar')">Cancel</a>
      </div>
      <div slot='form-body'>
         <div id='meal-form-details'>
            <h2>Details</h2>
            <label for='startDate'>Start Date *</label><input autofocus required type='date' name='startDate'><br>
            <label for='numServs'>Number of Servings *</label><input type='number' required name='numServs' value='1'><br>
            <label for='prepFlag'>Prep on day before?</label><input type='checkbox' name='prepFlag'>
            
            
            <div class='radio-btn'>
               <h3>Time of Day</h3>
               <label for='B'>Breakfast</label>
                  <input type='radio' name='mealTOD' value='B'><br>
               <label for='L'>Lunch</label>
                  <input type='radio' name='mealTOD' value='L'><br>
               <label for='D'>Dinner</label>
                  <input checked='checked' type='radio' name='mealTOD' value='D'>
            </div>
         </div>

         <div id='meal-form-search'>
            <h2>Search Components</h2>
            <label for='category'>Category *</label>
            <select required name='category'>
               <option value='1'>Entree</option>
               <option selected value='2'>Side</option>
               <option value='3'>Dessert</option>
               <option value='4'>Ingredient</option>
            </select><br>

            <label for='recipe'>Search</label>
            <input type='text' placeholder="Search Recipes/Ingredients">
            
            <input type='button' name='addComponent' value='  +  '>
         </div>

         <the-meal-selections :selections='selections'></the-meal-selections>
      </div>
   </the-form-template>
</template>

<script>
import { eventBus } from '../../main.js';
import TheFormTemplate from './TheFormTemplate';
import TheMealSelections from './TheMealSelections.vue';

export default {
   data: function() {
      return {
         selections: {
            entree: 'Chicken',
            sides: ['Broccoli','Rice'],
            dessert: 'Chocolate Cake'
         }
      };
   }, 
   methods: {
      goTo(type) {
         eventBus.goTo(type);
      }
   },
   created() {
      eventBus.$on('selectionDeleted', (selectionType, index) => {
         if(index > -1) {
            this.selections.sides.splice(index,1);
         }
         else {
            if(selectionType === 'dessert') this.selections.dessert = '';
            else this.selections.entree = '';
         }
      });
   },
   components: {
      'the-form-template': TheFormTemplate,
      'the-meal-selections': TheMealSelections
   }
}
</script>

<style>
#meal-form-details{
    height: 300px;
    float: left;     
    padding: 20px 20px 20px 0px;
    border-right: 1px solid #303C6C;
}
#meal-form-details .radio-btn input[type='radio']{
    margin: 0 !important;
}
#meal-form-details .radio-btn label{
    min-width: 85px !important;
    margin: 10px 0 0 0 !important;
    height: 20px;
}

#meal-form-details input[type="date"]{
    width: 140px;
    height: 22px;
    font-size: 105%;
}
#meal-form-details input[type="number"]{
    width: 50px;
    height:22px;
    text-align: center;
    font-size: 110%;
}
#meal-form-details label,
#meal-form-search label {
    margin: 10px 10px 10px 0;
    min-width: 75px;
    display: inline-block;
}
#meal-form-search {
    width: 60%;
    float: left;    
    padding: 20px;
}
#meal-form-search input[type='text'],
#meal-form-search select {
    font-size: 110%;
}
#meal-form-search input[type='text'] {
    min-width: calc(100% - 150px);
    padding: 2px 0;
}
#meal-form-search input[type=button] {
    height: 26px;
}
</style>