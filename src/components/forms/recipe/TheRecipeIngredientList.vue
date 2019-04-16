<template>
   <div id='recipe-ingredients'>
      <h2>Ingredients</h2><span class='warning' v-if='this.warning !== ""'>{{ warning }}</span>

      <div id='ingredient-inputs'>   
         <span class='float-left'>
            <label for='qty'>Qty*</label><br>
            <input type='number' name='qty' step='0.01' v-model='ingredient.Quantity'>
         </span>
         <span class='float-left'>
            <label for='unit'>Unit*</label><br>
            <select name='unit' v-model='ingredient.Unit.Id'>
               <option v-for='u in units' 
                     :key='u.Id' 
                     :value='u.Id'>{{ u.Description }}
               </option>
            </select>
         </span>
         <span class='float-left ingredient-description'>
            <label for='ingredient'>Description*</label><br>
            <input type='text' 
                   name='ingredient' 
                   autocomplete="off" 
                   placeholder="Search" 
                   @input='searchIngredients' 
                   v-model='ingredient.Description'
            >       
            <div id='search-results' :style='{ height: (searchResults.length * 22) + "px" }'>
               <p class='search-result' 
                  v-for='result in searchResults' 
                  @click='selectIngredient(result)' 
                  :key='result.Id'>{{ result.Description }}
               </p>
            </div>
         </span>
         <span class='float-left'>
            <span>Add</span><br>
            <input class='add-btn' type='button' name='addComponent' value='  +  ' @click='addIngredient()'>
         </span>
      </div> 

      <div id='list-container'>
         <div id='list-header'>
               <p>
                  <span id='header-name'>Ingredient</span>
                  <span class='edit-delete'>Delete</span>
                  <span class='item-cost'>Cost</span>
               </p>
         </div>
         <div id='list'>
            <recipe-ingredient v-for='(ingr, index) in ingredients'
                              :key='ingr.Id + ingr.Ingredient.Description'
                              :ingredient='ingr'
                              :evenOdd='isEvenOrOdd(index)'
                              :ingredientCost='ingredientCosts[index]'
                              :index='index'>
            </recipe-ingredient>
         </div> 
         <div id='list-footer'>
            <p><span class='total-cost'>Total Cost:</span>${{ totalCost }}</p>
         </div>              
      </div>
   </div>
</template>

<script>
import { eventBus } from '../../../main.js';
import { mapGetters } from 'vuex';
import RecipeIngredient from './RecipeIngredient';

export default {
   props: {
      ingredients: Array
   },
   data() {
      return {
         warning: '',
         searchResults: [],

         // ingredient form data
         ingredient: {
            Id: 0,
            Description: '',
            Quantity: 1,
            Unit: {
               Id: 1
            },
            Ingredient: {}
         }
      }
   },
   methods: {
      isEvenOrOdd(num) {
         return num % 2 == 0 ? 'even' : 'odd';
      },
      selectIngredient(selectedResult) {
         this.ingredient.Description = selectedResult.Description;
         this.ingredient.Ingredient = selectedResult;
         this.searchResults = [];
      },
      searchIngredients() {
         if(this.ingredient.Description.length >= 3) {    
            let result = [];   
            this.$http.get(`ingredient/search/${this.ingredient.Description}`)
               .then(response => {
                  return response.json();
               })
               .then(data => data.forEach(cur => result.push(cur)), 
                     error => console.log(error))
               .then(() => {
                  this.searchResults = result;
               });
         }
      },
      addIngredient() {
         if(this.ingredient.Description !== '' && this.ingredient.Quantity > 0) {
            this.ingredient.Unit = this.units[this.ingredient.Unit.Id - 1];
            eventBus.$emit('addIngredientToList', this.ingredient);
            this.ingredient = {
               Id: 0,
               Description: '',
               Quantity: 1,
               Unit: {
                  Id: 1
               },
               Ingredient: {}
            };
         }
      },
      getCost(ingredient) {
         // [unitId, amount equivalent to 1 oz]
         const conversionRates = new Map([
            [2, 6],        // tsp
            [3, 2],        // tbsp
            [4, 0.125],    // cup
            [5, 1],        // oz
            [6, 0.0625],   // lb
            [7, 28.3],     // g
            [8, 0.0283],   // kg
            [9, 48],       // dash - 1/8 tsp
         ]);
         
         let cost = 0;
         const ingrCost = ingredient.Ingredient.Cost;
         const ingrQty = ingredient.Ingredient.Quantity;

         if(ingredient.Unit.Id === 1) {
            cost = (ingrCost / ingrQty) * ingredient.Quantity;
         } else {
            // recipe ingredient
            const recipeIngrUnitConvRate = conversionRates.get(ingredient.Unit.Id);
            const recipeIngrQty = ingredient.Quantity;
            let recipeQtyOz = recipeIngrQty / recipeIngrUnitConvRate; // recipe quantity in oz
            
            // ingredient
            const ingrUnitConvRate = conversionRates.get(ingredient.Ingredient.Unit.Id);
            let ingrQtyOz = ingrQty / ingrUnitConvRate; // ingredient quantity in oz
            let ingrPricePerOz = ingrCost / ingrQtyOz; // price per oz.
            cost = ingrPricePerOz * recipeQtyOz;
         }
         return cost.toFixed(2);
      }
   },
   computed: {
      ...mapGetters({
         units: 'units/getAll'
      }),
      totalCost() {
         if(this.ingredientCosts.length > 0) {
            return this.ingredientCosts.reduce((total, num) => {
               return ((+total) + (+num)).toFixed(2);
            });
         } else {
            return '0.00';
         }
      },
      ingredientCosts() {
         return this.ingredients.map((el) => {
            return this.getCost(el);
         });
      }
   },
   components: {
      'recipe-ingredient': RecipeIngredient
   }
}
</script>

<style scoped>
#ingredient-inputs {
   position: relative;
}
#ingredient-inputs #search-results {
   background-color: #fff; 
   position: absolute;
   left: 113px;
   top: 44px;
   min-width: calc(100% - 158px);
   overflow-y: scroll;
   border: .1px solid #303C6C;
}
#ingredient-inputs .search-result {
   cursor: pointer;
   padding-left: 2px;
}
#ingredient-inputs .search-result:hover {
   background-color: #EAEBF0;
}
.warning {
   color: #fff;
   background-color: #F36666;
   padding: 5px 10px;
   border-radius: 5px;
   float: right;
}
h2 {
    margin-bottom: 5px;
    display: inline-block;
}
#list-container p {
    padding-top:0px;
}

/* Ingredient Input Fields and Column */
#recipe-ingredients {  
   padding: 20px 0px 20px 20px;
}
#ingredient-inputs {
   height: 50px;
}
#ingredient-inputs input {
   min-height: 20px;
   font-family: 'Ink Free Regular', sans-serif;
    font-weight: 400;
}
#ingredient-inputs select {
   min-height: 24px;font-family: 'Ink Free Regular', sans-serif;
    font-weight: 400;
}
#ingredient-inputs input[type='number'],
#ingredient-inputs select {
    margin-right: 4px;
    width: 50px;
    text-align: center;
}
#ingredient-inputs input[type='text'] {
    width: calc(100% - 8px);
}
.ingredient-description {
    width: calc(100% - 154px);
}
.add-btn {
    font-size: 110%;
    border: 0 none;
    border-radius: 5px;
    background-color: #303C6C;
    color: #fff;
}

/* Ingredient List Styles */
#recipe-ingredients 
#list-header {
    font-size: 100%;
}
#recipe-ingredients #list {
    height: 185px;
    overflow: hidden;
    overflow-y: scroll;
}
#list-container {
   width: 100%;
   margin: 0 auto;
   clear:both;
}
#list-header {
   clear: both;
   background-color: #303C6C;
   color: #fff;
   padding: 3px 0px 8px 0px;
   font-weight: bold;
   font-size: 110%;
   margin-top: 0px;
}
#header-name {
    padding-left: 10px;
}
#list {
    height: 580px;
    overflow: hidden;
    overflow-y: scroll;
    background-color:#fff;
}
#list-footer{
    background-color: #303C6C;
    color: #fff;
    height: 20px;
}
#list-footer p {
    float: right;
    margin-right: 95px;
}
.total-cost {
    font-weight: bold;
    margin-right: 15px;
}
#list-header .edit-delete {
    float: right;
    min-width: 60px;
}
#list-header .item-cost{   
    float: right;
    min-width: 70px;
    text-align: center;
}
</style>
