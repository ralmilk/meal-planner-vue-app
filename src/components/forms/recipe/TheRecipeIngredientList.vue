<template>
   <div id='recipe-ingredients'>
      <h2>Ingredients</h2><span class='warning' v-if='this.warning !== ""'>{{ warning }}</span>

      <div id='ingredient-inputs'>   
         <span class='float-left'>
            <label for='qty'>Qty*</label><br>
            <input type='number' name='qty' step='0.01' v-model='quantity'>
         </span>
         <span class='float-left'>
            <label for='unit'>Unit*</label><br>
            <select name='unit' v-model='unit'>
               <option v-for='u in units' 
                     :key='u.Id' 
                     :value='u.Id'>{{u.Description}}
               </option>
            </select>
         </span>
         <span class='float-left ingredient-description'>
            <label for='ingredient'>Description*</label><br>
            <input type='text' name='ingredient' placeholder="Search" v-model='description'>
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
            <!-- <transition-group name='fade' mode='out-in'> appear -->
               <recipe-ingredient v-for='(ingredient, index) in ingredients'
                                 :key='ingredient.description+index'
                                 :ingredient='ingredient'
                                 :evenOdd='isEvenOrOdd(index)'
                                 :index='index'>
               </recipe-ingredient>
            <!-- </transition-group> -->
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
   props: ['ingredients'],
   data() {
      return {
         warning: '',

         // ingredient data
         description: '',
         quantity: 1,
         unit: 1
      }
   },
   methods: {
      isEvenOrOdd(num) {
         return num % 2 == 0 ? 'even' : 'odd';
      },
      addIngredient() {
         if(this.description === '' || this.quantity <= 0 || this.cost <= 0) {
            this.warning = 'Please include all required fields.';
         } else {
            this.ingredients.push({
               description: this.description,
               quantity: this.quantity,
               unit: this.units[this.unit-1],
               cost: 0 //TODO get cost from db
            });

            this.description = '';
            this.quantity = 1;
            this.unit = 1;
            this.warning = '';
         }
      }
   },
   computed: {
      ...mapGetters({
         units: 'units/getAll'
      }),
      totalCost() {
         let counter = 0;
         this.ingredients.forEach((el) => {
            counter += el.cost;
         });
         return counter.toFixed(2);
      }
   },
   created(){
      eventBus.$on('deletedRecipeIngredient', (index) => {
         this.ingredients.splice(index,1);
      });
   },
   components: {
      'recipe-ingredient': RecipeIngredient
   }
}
</script>

<style scoped>
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
    min-width: 80px;
}
#list-header .item-cost{   
    float: right;
    min-width: 70px;
    text-align: center;
}
</style>
