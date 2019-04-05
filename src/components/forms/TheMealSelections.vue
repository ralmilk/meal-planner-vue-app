<template>
   <div id='meal-selections'>
      <h3>Selections</h3>
      <span> - Selections made above will appear below. Click (x) to remove a previous selection.</span>
      <meal-selection-group 
         v-for="(value, type) in selections" 
         :key='type'
         :val='value'
         :type='type'>
      </meal-selection-group>
   </div>
</template>

<script>
import MealSelectionGroup from './MealSelectionGroup';
export default {
   props: ['selections'],
   components: {
      'meal-selection-group': MealSelectionGroup
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