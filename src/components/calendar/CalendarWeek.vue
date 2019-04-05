<template>
   <div class='calendar-week'>
      <calendar-day 
         @goTo='goTo'
         v-for='(day,index) in 7' 
         :key="index" 
         :dow="dayOfWeekClass[index]"
         :date="week[index]"
         :isCurrentMonth="checkMonth(index)"
         :meals="meals[index]">
      </calendar-day>
   </div>
</template>

<script>
import CalendarDay from './CalendarDay';

export default {
   props: {
      week: Array, 
      weekNum: Number, 
      meals: Array // one week of the meal matrix
   },
   data: function() {
      return {
         dayOfWeekClass: ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'],
      }
   },
   methods: {      
      /* NAVIGATION */
      goTo(value) {
         this.$emit('goTo', value);
      },
      
      checkMonth(i) {
         if(this.week[0] > this.week[6]) // first or last week of the month
            return this.weekNum === 0 ? this.week[i] < 7 : this.week[i] >= 7;
         else
            return true;
      }
   },
   components: {
      'calendar-day': CalendarDay
   }
}
</script>