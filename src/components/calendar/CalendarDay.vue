<template>
   <div class='day-wrapper' :class="dow">
      <div class='calendar-day' :class="getMonthClass()">
         <p class='calendar-date'>{{ date }}</p>
         <meal v-for="(meal, index) in meals" 
               :key="index"
               :meal="meals[index]">
         </meal>
      </div>
   </div>
</template>

<script>
import Meal from './Meal';

export default {
   props: {
      dow: String,
      date: Number,
      isCurrentMonth: Boolean,
      meals: Array // one day from the meal matrix
   },
   methods: {      
      getMonthClass() {
         return this.isCurrentMonth ? "current-month" : "other-month";
      }
   },
   components: {
      meal: Meal
   }
}
</script>

<style>
.calendar-day{
    width: calc(100%/7 - 1px);
    height: 110px;
    margin: .5px;
    text-align: left;
    float: left;
    font-weight: bold;
}
.calendar-date {
    margin: 3px;
}
.other-month {
    color: grey;
    background-color: rgba(255, 255, 255, 0.634);
}
.current-month {
    color: #303C6C;
    background-color: #fff;
}
</style>