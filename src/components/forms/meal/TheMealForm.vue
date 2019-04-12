<template>
   <div>
      <the-modal :showModal='showModal' :text='modalText'></the-modal>
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
            <router-link :to="{ name: 'calendar' }" 
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
                  <div id='search-results' v-if='searchResults.length > 0'>
                     <p class='search-result' v-for='result in searchResults' :key='result.Id'>{{ result.Title }}</p>
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
import Modal from '../../shared/Modal';

export default {
   props: ['id'],
   data: function() {
      return {
         // form display properties/helpers
         warning: '',
         mealTimeOptions: ['Breakfast','Lunch','Dinner'],
         showRestaurantForm: false,
         category: 1,
         searchResults: [],
         searchString: '',
         searchId: 1,
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
   watch: {
      category() {
         this.warning = '';
      }
   },
   computed: {
      ...mapGetters({
         categories: 'categories/getAll'
      })
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
            }, error => {
               console.log(error); // TODO remove for deploy
            });
      },
      searchRecipesOrIngredients() {
         if(this.searchString.length >= 3) {
            let result = [];
            if(this.category === 4) {
               this.$http.get(`ingredient/search/${this.searchString}`)
                  .then(response => {
                     return response.json();
                  })
                  .then(data => data.forEach(cur => result.push(cur)), 
                        error => console.log(error))
                  .then(() => {
                     this.searchResults = result;
                     console.log(this.searchResults);
                  });
            } else {
               this.$http.get(`recipe/search/${this.searchString}`)
                  .then(response => {
                     return response.json();
                  })
                  .then(data => data.forEach(cur => result.push(cur)), 
                        error => console.log(error))
                  .then(() => {
                     this.searchResults = result;
                     console.log(this.searchResults);
                  });
            }
         }
      },
// TODO FINISH SEARCH FUNCTIONALITY FOR COMPONENTS
      addMealComponent(){
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
      },
      deleteMeal() {
         this.modalText = 'Are you sure you want to delete this meal?';
         this.showModal = true;
         this.callback = 
            function() { 
               this.$http.delete(`meal/${this.id}`)
                  .then(response => console.log(response))
                  .then(data => console.log(`successfully completed callback: ${this.id}`),
                        error => console.log(error))
                  .then(() => {
                     this.$router.push({name: 'calendar'});
                  });
            };
      },
// TODO TEST ADDING COMPONENTS
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
               this.$http.put(`meal`, this.meal)
                  .then(response => console.log(response))
                  .then(data => console.log(`successfully updated meal: ${mealId}`),
                        error => console.log(error))
                  .then(() => {
                     if (this.meal.MealType === 'R') {
                        this.$router.push({name: 'calendar'});
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
                     console.log(`successfully added meal`)
                  }, error => console.log(error))
                  .then(() => {
                     if (this.meal.MealType === 'R') {
                        this.$router.push({name: 'calendar'});
                     }
                  });
            }

            // add/update meal components w/ id returned from that call
            // only 'H' meals should have it's components saved
            if(this.meal.MealType === 'H') {
               var dbFormatComponents = this.meal.MealComponents.map(el => {
                  return {
                     MealId: mealId,
                     CategoryId: el.Category.Id,
                     RecipeId: el.Recipe.Id > 0 ? el.Recipe.Id : null,
                     IngredientId: el.Ingredient > 0 ? el.Ingredient.Id : null
                  };
               });

               // make all DB calls for the meal components
               let componentCount = dbFormatComponents.length;
               dbFormatComponents.forEach((el, index) => {
                  if (el.Id > 0) {
                     if(deletedComponentIds.find(x => x.id === el.Id) > -1) { // delete meal component
                        this.$http.delete(`mealComponent/${el.Id}`)
                           .then(response => console.log(response))
                           .then(data => console.log(`successfully updated meal component`),
                                 error => console.log(error))
                           .then(() => {
                              if (index === componentCount - 1) {
                                 this.$router.push({name: 'calendar'});
                              }
                           });
                     } else { // update component
                        this.$http.put(`mealComponent`, el)
                           .then(response => console.log(response))
                           .then(data => console.log(`successfully updated meal component`),
                                 error => console.log(error))
                           .then(() => {
                              if (index === componentCount - 1) {
                                 this.$router.push({name: 'calendar'});
                              }
                           });
                     }
                  } else { // add new component
                     this.$http.post(`mealComponent`, el)
                        .then(response => console.log(response))
                        .then(data => console.log(`successfully added meal component`),
                              error => console.log(error))
                        .then(() => {
                           if (index === componentCount - 1) {
                             this.$router.push({name: 'calendar'});
                           }
                        });
                  }                
               });
            }
         }
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
         this.deletedComponentIds.push(index);
         this.meal.MealComponents.splice(index, 1);
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
      'the-modal': Modal
   }
}
</script>

<style>
#meal-component-search {
   position: relative;
}
#search-results {
   height: 150px; 
   width: 200px; 
   background-color: white; 
   position: absolute;
   left: 90px;
   top: 36px;
   min-width: calc(100% - 147px);
   overflow-y: scroll;
}
.search-result {
   cursor: pointer;
}
.search-result:hover {
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