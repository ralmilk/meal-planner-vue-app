<template>
   <div>
      <app-modal :showModal='showModal' :text='modalText'></app-modal>
      <the-form-template :type="'meal'"> 
         <div id='topbar' slot='topbar-content'>
            <div class='radio-btn'>
               <custom-radio-button :n="'mealType'" 
                                    :text="'Home'" 
                                    :val="'H'" 
                                    :isChecked="meal.MealType === 'H'">
               </custom-radio-button>
               <custom-radio-button :n="'mealType'" 
                                    :text="'Restaurant'" 
                                    :val="'R'"
                                    :isChecked="meal.MealType === 'R'">
               </custom-radio-button>
            </div>

            <button class='btn' id='meal-submit-btn' @click.prevent='submit'>Save</button>
            <a v-if='id !== undefined' class='btn btn-delete' @click='deleteMeal'>Delete Meal</a>
            <router-link :to="{ name: 'Calendar' }" 
                        class='btn'><a>Cancel</a>
            </router-link> 
         </div>
         
         <div class='home-form' slot='form-body' v-if='!showRestaurantForm'>
            <div id='meal-form-details'>
               <h2>Details</h2>
               <label for='startDate'>Start Date *</label>
               <input autofocus type='date' name='startDate' v-model='meal.StartDate'><br>
               <label for='servings'>Number of Servings *</label>
               <input type='number' name='servings' v-model='meal.Servings'><br>
               <custom-checkbox :n="'prepFlag'" :text="'Prep on day before?'" :isChecked="meal.PrepFlg === 'Y'"></custom-checkbox>
                     
               <div class='radio-btn'>
                  <h3>Time of Day</h3>
                  <custom-radio-button v-for='(time, index) in mealTimeOptions'
                                       :key='index'
                                       :n="'mealTime'"
                                       :text='time'
                                       :val='time[0]'
                                       :isChecked='meal.MealTime === time[0]'>
                  </custom-radio-button>
               </div>
            </div>

            <div id='meal-form-search'>
               <h2>Search Components</h2>
               <label for='category'>Category *</label>
               <select name='category' v-model='category'>
                  <option v-for='cat in categories' 
                        :key='cat.Id'
                        :value='cat.Id'>{{ cat.Description }}
                  </option>
               </select>
               <span class='warning' v-if='warning.length > 0'>{{ this.warning }}</span>
               <br>

               <div id='meal-component-search'>
                  <label for='recipe'>Search</label>
                  <input type='text' placeholder="Search Recipes/Ingredients" @input='searchRecipesOrIngredients' v-model='searchString'>   
                  <div id='search-results' :style='{ height: (searchResults.length * 22) + "px" }'>
                     <p class='search-result' 
                        v-for='result in searchResults' 
                        @click='selectComponent(result)' 
                        :key='result.Id'>{{ category === 4 ? result.Description : result.Title }}
                     </p>
                  </div>     
                  <input class='add-btn' type='button' name='addComponent' value='  +  ' @click='addMealComponent'>
               </div>
            </div>

            <the-meal-selections :selections='meal.MealComponents'></the-meal-selections>
         </div>

         <div class='restaurant-form' slot='form-body' v-else>
            <div id='meal-form-details'>
               <h2>Details</h2>
               <label for='startDate'>Start Date *</label>
               <input autofocus type='date' name='startDate' v-model='meal.StartDate'><br>  
               <label for='servings'>Number of Servings *</label>
               <input type='number' name='servings' v-model='meal.Servings'><br>           
               <div class='radio-btn'>
                  <h3>Time of Day</h3>
                  <custom-radio-button v-for='(time, index) in mealTimeOptions'
                                       :key='index'
                                       :n="'mealTime'"
                                       :text='time'
                                       :val='time[0]'
                                       :isChecked='meal.MealTime === time[0]'>
                  </custom-radio-button>
               </div>
            </div>
         </div>
      </the-form-template>
   </div>
</template>

<script>
import { eventBus } from '../../../main.js';
import { mapGetters } from 'vuex';
import TheFormTemplate from '../TheFormTemplate';
import TheMealSelections from './TheMealSelections.vue';
import CustomRadioButton from '../CustomRadioButton.vue';
import CustomCheckbox from '../CustomCheckbox.vue';
import AppModal from '../../shared/AppModal';

export default {
   props: {
      id: Number
   },
   data: function() {
      return {
         // form display properties/helpers
         warning: '',
         mealTimeOptions: ['Breakfast','Lunch','Dinner'],
         showRestaurantForm: false,
         category: 1,
         searchResults: [],
         searchString: '',
         searchId: 0,
         deletedComponentIds: [],

         /* Modal fields */
         modalText: '',
         showModal: false,
         callback: Object,

         // meal object
         meal: {
            Servings: 1,
            StartDate: "",
            PrepFlg: "N",
            MealTime: "D",
            MealType: "H",
            MealComponents: []
         }
      };
   },
   methods: {
      getMeal() {
         this.$http.get(`meal/${this.id}`)
            .then(response => {
               return response.json();
            })
            .then(data => {
               var splitDate = data.StartDate.split('-');
               data.StartDate = `${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`;
               this.meal = data;
               this.showRestaurantForm = this.meal.MealType === 'R';
            });
      },
      selectComponent(selectedResult) {
         this.searchId = selectedResult.Id;
         this.searchString = selectedResult.Title === undefined ? selectedResult.Description : selectedResult.Title;
         this.searchResults = [];
      },
      searchRecipesOrIngredients() {
         if(this.searchString.length >= 3) {
            let result = [];
            if(this.category === 4) {
               this.$http.get(`ingredient/search/${this.searchString}`)
                  .then(response => {
                     return response.json();
                  })
                  .then(data => data.forEach(cur => result.push(cur)))
                  .then(() => {
                     this.searchResults = result;
                  });
            } else {
               this.$http.get(`recipe/search/${this.searchString}`)
                  .then(response => {
                     return response.json();
                  })
                  .then(data => data.forEach(cur => result.push(cur)))
                  .then(() => {
                     this.searchResults = result;
                  });
            }
         }
      },
      addMealComponent(){
         if(this.searchString !== '' && this.searchId > 0) {
            if(this.meal.MealComponents.findIndex(x => x.Category.Id === 1) >= 0 && this.category === 1) {
               this.warning = 'You may only select one Entree.';
            } else if(this.meal.MealComponents.findIndex(x => x.Category.Id === 3) >= 0 && this.category === 3) {
               this.warning = 'You may only select one Dessert.';
            } else {
               var newComponent = {
                  Id: 0,
                  Category: {
                     Id: this.category
                  }
               };

               if(this.category === 4) {
                  newComponent.Ingredient = {
                     Id: this.searchId,
                     Description: this.searchString
                  };
               } else {
                  newComponent.Recipe = {
                     Id: this.searchId,
                     Title: this.searchString
                  };
               }

               this.meal.MealComponents.push(newComponent);
               this.searchString = '';
            }
         }
      },
      deleteMeal() {
         this.modalText = 'Are you sure you want to delete this meal?';
         this.showModal = true;
         this.callback = 
            function() { 
               this.$http.delete(`meal/${this.id}`)
                  .then(() => {
                     this.$router.push({name: 'Calendar'});
                  });
            };
      },
      submit(){ 
         // validate submission (at least one selection, plus other req fields)
         if (this.meal.Servings > 0 
             && this.meal.StartDate !== ''
             && ((this.meal.MealType === 'H' && this.meal.MealComponents.length > 0)
                  || this.meal.MealType === 'R')) 
         {
            // store id for use by meal components
            let mealId = this.id;

            // change start date format from 2019-04-12 to 04-12-2019 for the database and calendar output
            var splitDate = this.meal.StartDate.split('-');
            this.meal.StartDate = `${splitDate[1]}-${splitDate[2]}-${splitDate[0]}`;      

            if (mealId) {
               this.$http.put(`meal/${mealId}`, this.meal)
                  .then(() => {
                     if (this.meal.MealType === 'R') {
                        this.$router.push({name: 'Calendar'});
                     } else {
                        this.addAndDeleteComponents(mealId);
                     }
                  });
            }
            else {
               this.$http.post(`meal`, this.meal)
                  .then(response => {
                     return response.json();
                  })
                  .then(data => { 
                     mealId = data.Id;
                  })
                  .then(() => {
                     if (this.meal.MealType === 'R') {
                        this.$router.push({name: 'Calendar'});
                     } else {
                        this.addAndDeleteComponents(mealId);
                     }
                  });
            }
         }
      }, 
      addAndDeleteComponents(mealId) {
         // format the meal components for entry into the DB
         var dbFormatComponents = this.meal.MealComponents.map(el => {
            return {
               Id: el.Id,
               MealId: mealId,
               CategoryId: el.Category.Id,
               RecipeId: el.Recipe ? el.Recipe.Id : null,
               IngredientId: el.Ingredient ? el.Ingredient.Id : null
            };
         });
         
         // remove all deleted meal components
         this.deletedComponentIds.forEach((id) => {
            this.$http.delete(`mealComponent/${id}`);
         });

         // add new meal components
         let componentCount = dbFormatComponents.length;
         dbFormatComponents.forEach((el, index) => {
            if (el.Id === 0) { // add new component
               this.$http.post(`mealComponent`, el)
                  .then(() => {
                     if (index === componentCount - 1) {
                        this.$router.push({name: 'Calendar'});
                     }
                  });
            } else {
               if (index === componentCount - 1) {
                  this.$router.push({name: 'Calendar'});
               }
            }              
         });
      }
   }, 
   computed: {
      ...mapGetters({
         categories: 'categories/getAll'
      })
   },
   watch: {
      category() {
         this.warning = '';
         this.searchString = '';
      }
   },
   created() {
      if(this.id) this.getMeal();

      eventBus.$on('modalResponse', (response) => {
         this.showModal = false;
         if(response) {
            this.callback();               
         }
      });
      eventBus.$on('selectionDeleted', (index) => {
         if(index !== undefined) {
            this.deletedComponentIds.push(this.meal.MealComponents[index].Id);
            this.meal.MealComponents.splice(index, 1);
         }
      });
      eventBus.$on('radioValueChanged', (name, value) => {
         if(name === 'mealTime') {
            this.meal.MealTime = value;
         } else if (name === 'mealType') {
            this.meal.MealType = value;
            this.showRestaurantForm = value === 'R';
         }
      });
      eventBus.$on('checkboxChanged', (name) => {
         if(name === 'prepFlag') {
            this.meal.PrepFlg = this.meal.PrepFlg === 'Y' ? 'N' : 'Y';
         }
      });
   },
   components: {
      'the-form-template': TheFormTemplate,
      'the-meal-selections': TheMealSelections,
      'custom-radio-button': CustomRadioButton,
      'custom-checkbox': CustomCheckbox,
      'app-modal': AppModal
   }
}
</script>

<style>
#meal-component-search {
   position: relative;
}
#meal-component-search #search-results {
   height: 150px; 
   width: 200px; 
   background-color: white; 
   position: absolute;
   left: 90px;
   top: 36px;
   min-width: calc(100% - 147px);
   overflow-y: scroll;
}
#meal-component-search .search-result {
   cursor: pointer;
}
#meal-component-search .search-result:hover {
   background-color: #EAEBF0;
}
.meal-form-container {
   background-color: rgba(255, 255, 255, 0.5);
   padding: 20px;
   border-radius: 10px;
   margin-top: 110px;
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
#meal-submit-btn {
    background-color: #303C6C;
    color: #fff;    
    font-family: 'Ink Free Regular', sans-serif;
    padding: 3px 5px;
    cursor: pointer;
}
</style>