<template>
   <router-link :to="{ name: 'Meal', params: { id: meal.id } }">
      <div
         v-if="meal" class='meal pointer' 
         :class="[meal.mealType, checkPrepDayStatus()]" 
         :style="{ width: getWidth() }">
         <p class='meal-name' :class="(meal.subcategory || '').toLowerCase()">{{ meal.title }}</p>
      </div>
   </router-link>
</template>

<script>
export default {
   props: {
      meal: Object,
      dow: String
   },
   methods: {
      checkPrepDayStatus() {
         return this.meal.isPrepDay ? 'prep-day' : '' ;
      },
      getWidth() {
         if(this.meal.isPrepDay && this.dow != 'saturday') 
            return `calc(100%/7 + 5px)`
         else 
            return `calc((100%/7) * ${this.meal.servings})`;
      }
   }
}
</script>

<style>
/***** MEAL DISPLAY *****/
/* 
calendar day width = calc(100%/7 - 1px)
meal width = calc(100%/7) * numberOfDays
*/
.day-wrapper{
    position: relative;
}
.meal{
    background-color: #303C6C;
    color: #fff;
    position:absolute;
    z-index: 1;
    white-space: nowrap;
    overflow: hidden;
    border-radius: 5px;
    width: calc((100%/7) * 2 - 1px); /* when the time comes, this will be determined for each meal, see below comment */
}

#week2 .monday .breakfast{
    width: calc((100%/7) * 5);
} 

/* .meal a:link,
.meal a:visited {
    color: #fff;
} */
.lunch {
    margin-top: 28px;
}
.dinner {
    margin-top: 56px;
}
.meal-name {
    padding: 5px 0px 3px 5px; 
    display: inherit;
    font-size: 80%;
}
.prep-day {
    width: calc(100%/7 + 5px);
    border-top-left-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 0;
    opacity: 0.6;
}

/******* Meal Colors ********/
.chicken{
    background-color: #F9E7A4;
    color: #303C6C;
}
.beef {
    background-color: #F4976C;
    color: #303C6C;
}
.vegetarian {
    background-color: #378D99;
}
.pork {
    background-color: #9DA8D3;
    color: #303C6C;
}
.salad {
    background-color: #729978;
    color: #fff;
}
.soup {
    background-color: #F36666;
    color: #fff;
}
.restaurant {
    background-color: #303C6C;
    color: #fff;
}
/* .chicken a:link,
.chicken a:visited,
.beef a:link,
.beef a:visited,
.pork a:link,
.pork a:visited {
    color: #303C6C !important;
}
.restaurant a:link,
.restaurant a:visited,
.vegetarian a:link,
.vegetarian a:visited {
    color: #fff;
} */
</style>