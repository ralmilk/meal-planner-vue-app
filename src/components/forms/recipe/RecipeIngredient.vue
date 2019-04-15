<template>
   <div class='list-item' :class='evenOdd'>
      <p>
         <span class='item-name'>{{ getNameString() }}</span>
         <span class='edit-delete'>
               <i class="far fa-times-circle" @click='deleteIngredient()'></i>
         </span>
         <span class='item-cost'>${{ getCost() }}</span>
      </p>
   </div>
</template>

<script>
import { eventBus } from '../../../main.js';
export default {
   props: {
      evenOdd: String, 
      ingredient: Object
   },
   methods: {
      getNameString() {
         return `${this.ingredient.Quantity} ${this.ingredient.Unit.Description} ${this.ingredient.Ingredient.Description}`;
      },
      getCost() {
         // convert all costs and quantities to a standard unit of measure?
         // TODO: get conversion chart for costs
         return this.ingredient.Quantity.toFixed(2);
      },
      deleteIngredient() {
         eventBus.$emit('deletedRecipeIngredient', this.ingredient.Id);
      }
   }
}
</script>

<style scoped>
.item-cost{   
    float: right;
    min-width: 70px;
    text-align: center;
}
.list-item {
    padding-left: 10px;
    height: 30px;
    border-bottom: .5px solid #303C6C;
}
.list-item i{
    margin-top: 2px;
    padding-left: 15px;
    float: left;
}
.list-item i:hover{
    color: #378D99;
}
.odd {
    background-color: #fff;
}
.even {
    background-color: rgba(55, 142, 153, 0.4);
}
#recipe-ingredients .list-item {
    height: 20px;
}
#recipe-ingredients p {
    padding: 0;
}
#recipe-ingredients .edit-delete {
    min-width: 60px;
    float: right;
}
</style>