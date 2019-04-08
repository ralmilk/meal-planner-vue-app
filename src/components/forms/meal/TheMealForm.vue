<template>
   <the-form-template> 
      <div id='topbar' slot='topbar-content'>
         <div class='radio-btn'>
            <custom-radio-button :n="'mealType'" 
                                 :text="'Home'" 
                                 :val="'H'" 
                                 v-model='mealType' 
                                 :isChecked="mealType === 'H'">
            </custom-radio-button>
            <custom-radio-button :n="'mealType'" 
                                 :text="'Restaurant'" 
                                 :val="'R'"
                                 v-model='mealType' 
                                 :isChecked="mealType === 'R'">
            </custom-radio-button>
         </div>

         <input class='btn' @click.prevent='' type='submit' value='Save'>
         <a class='btn btn-delete' >Delete Meal</a>
         <a class='btn' @click="goTo('the-calendar')">Cancel</a>
      </div>

      
      <div class='home-form' slot='form-body' v-if='!showRestaurantForm'>
         <div id='meal-form-details'>
            <h2>Details</h2>
            <label for='startDate'>Start Date *</label>
            <input autofocus type='date' name='startDate' v-model='startDate'><br>
            <label for='servings'>Number of Servings *</label>
            <input type='number' name='servings' v-model='servings'><br>
            <custom-checkbox :n="'prepFlag'" :text="'Prep on day before?'" :isChecked='prepFlag'></custom-checkbox>
                  
            <div class='radio-btn'>
               <h3>Time of Day</h3>
               <custom-radio-button v-for='(time, index) in mealTimeOptions'
                                    :key='index'
                                    :n="'mealTime'"
                                    :text='time'
                                    :val='time[0]'
                                    :isChecked='mealTime === time[0]'>
               </custom-radio-button>
            </div>
         </div>

         <div id='meal-form-search'>
            <h2>Search Components</h2>
            <label for='category'>Category *</label>
            <select name='category' v-model='category'>
               <option v-for='(category, index) in categories' 
                       :key='index+1'
                       :value='index+1'
                       :selected='1'>{{ category }}
               </option>
            </select>
            <span class='warning' v-if='warning.length > 0'>{{ this.warning }}</span>
            <br>

            <label for='recipe'>Search</label>
            <input type='text' placeholder="Search Recipes/Ingredients" v-model='searchString'>        
            <input class='add-btn' type='button' name='addComponent' value='  +  ' @click='selectionAdded'>
         </div>

         <the-meal-selections :selections='selections'></the-meal-selections>
      </div>

      <div class='restaurant-form' slot='form-body' v-else>
         <div id='meal-form-details'>
            <label for='startDate'>Date *</label>
            <input autofocus type='date' name='startDate' v-model='startDate'><br>             
            <div class='radio-btn'>
               <h3>Time of Day</h3>
               <custom-radio-button v-for='(time, index) in mealTimeOptions'
                                    :key='index'
                                    :n="'mealTime'"
                                    :text='time'
                                    :val='time[0]'
                                    :isChecked='mealTime === time[0]'>
               </custom-radio-button>
            </div>
         </div>
      </div>

   </the-form-template>
</template>

<script>
import { eventBus } from '../../../main.js';
import TheFormTemplate from '../TheFormTemplate';
import TheMealSelections from './TheMealSelections.vue';
import CustomRadioButton from '../CustomRadioButton.vue';
import CustomCheckbox from '../CustomCheckbox.vue';

export default {
   data: function() {
      return {
         // form display properties/helpers
         categories: ['Entree','Side','Dessert','Ingredient'],
         mealTimeOptions: ['Breakfast','Lunch','Dinner'],
         showRestaurantForm: false,
         category: 1,
         searchString: '',
         searchId: 1,
         warning: '',

         // form submission
         servings: 1,
         startDate: '',
         prepFlag: false,
         mealType: 'H',
         mealTime: 'D',
         
         // meal components
         selectionIds: {
            entree: 0,
            sides: [],
            dessert: 0
         },
         selections: {
            entree: '',
            sides: [],
            dessert: ''
         }
      };
   }, 
   watch: {
      category() {
         this.warning = '';
      }
   },
   methods: {
      goTo(type) {
         eventBus.goTo(type);
      },
      selectionAdded(){
         if(this.searchString.length) {
            if(this.category === 2 || this.category === 4) {
               this.selections.sides.push(this.searchString);
               this.selectionIds.sides.push(this.searchId);
            } else if (this.category === 1) {
               if (this.selectionIds.entree === 0) {
                  this.selections.entree = this.searchString;
                  this.selectionIds.entree = this.searchId;
               } else {
                  this.warning = 'Only one entree can be selected.';
               }
            } else if (this.category === 3) {
               if (this.selectionIds.dessert === 0) {
                  this.selections.dessert = this.searchString;
                  this.selectionIds.dessert = this.searchId;
               } else {
                  this.warning = 'Only one dessert can be selected.';
               }
            }
         }
      }
   },
   created() {
      if(this.mealType === 'R') this.showRestaurantForm = true;

      eventBus.$on('selectionDeleted', (selectionType, index) => {
         if(index > -1) {
            this.selections.sides.splice(index, 1);
            this.selectionIds.sides.splice(index, 1);
         }
         else {
            if(selectionType === 'dessert') {
               this.selections.dessert = '';
               this.selectionIds.dessert = 0;
            }
            else {
               this.selections.entree = '';
               this.selectionIds.entree = 0;
            } 
         }
      });
      eventBus.$on('radioValueChanged', (name, value) => {
         if(name === 'mealTime') {
            this.mealTime = value;
         } else if (name === 'mealType') {
            this.mealType = value;
            this.showRestaurantForm = value === 'R';
         } else {
            return;
         }
      });
      eventBus.$on('checkboxChanged', (name) => {
         if(name === 'prepFlag') {
            this.prepFlag = !this.prepFlag;
         } else {
            return;
         }
      });
   },
   components: {
      'the-form-template': TheFormTemplate,
      'the-meal-selections': TheMealSelections,
      'custom-radio-button': CustomRadioButton,
      'custom-checkbox': CustomCheckbox
   }
}
</script>

<style>
.form-container { 
   height: 380px;
}
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
    display: block;
}
#meal-form-details input[type="date"]{
    width: 140px;
    height: 20px;
    font-size: 105%;
}
#meal-form-details input[type="number"]{
    width: 50px;
    height:20px;
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
}
#meal-form-search input[type=button] {
    height: 26px;
}

</style>