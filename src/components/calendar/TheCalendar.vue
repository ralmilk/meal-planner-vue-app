<template>
   <div>
      <the-calendar-controls
         @arrowClicked='updateMonth'
         @goTo='goTo'
         :month='monthNames[month]'
         :year='year'>
      </the-calendar-controls>
      <div id='calendar-header'>
         <ul>
            <li>Sunday</li>
            <li>Monday</li>
            <li>Tuesday</li>
            <li>Wednesday</li>
            <li>Thursday</li>
            <li>Friday</li>
            <li>Saturday</li>
         </ul>
      </div>
      <div id='calendar'>
         <calendar-week 
            v-for='(week, index) in numWeeks' 
            :key="index"
            :week='calendar[index]'
            :weekNum='index'>
         </calendar-week>
      </div> 
   </div>
</template>

<script>
import TheCalendarControls from './TheCalendarControls';
import CalendarWeek from './CalendarWeek';

export default {
   data: function() {
      return {
         calendar: [],
         month: 0,
         year: 0,
         startDayOfWeek: 0,
         numDaysInMonth: 0,
         numWeeks: 0,
         monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      }
   },
   watch: {
      month() {
         this.setDataValues(false);
         this.getCalendarArray();
      }
   },
   created(){
      this.setDataValues(true);
      this.getCalendarArray();
   },
   methods: {
      goTo(value) {
         this.$emit('goTo', value);
      },
      updateMonth(value) {
         if(value === 'prev') {
            this.month = this.month === 0 ? 11 : this.month - 1;
            this.year = this.month === 0 ? this.year - 1 : this.year;
         } else if(value === 'next') {
            this.month = this.month === 11 ? 0 : this.month + 1;
            this.year = this.month === 0 ? this.year + 1 : this.year;
         }
      },

      getCalendarArray() {
         let calendar = [];
         let date = 1;
         let dateUpperBound = 7;
         let weekNum = 0;

         // set first week of the month, if doesn't start on Sunday
         if (this.startDayOfWeek != 0) {
               let firstWeek = this.prevMonth.lastWeek;
               for(let j = this.startDayOfWeek; j <= 6; j++) {
                  firstWeek.push(date);
                  date++;
               }
               calendar.push(firstWeek);

               // set up variables for middle weeks (date is updated above)
               dateUpperBound = date + 6;
               weekNum = 1;
         }

         // handle first and middle weeks
         for(weekNum; weekNum < this.numWeeks - 1; weekNum += 1) {       
               let tempArray = [];
               for(date; date <= dateUpperBound; date += 1) {
                  tempArray.push(date);
               }
               dateUpperBound += 7;
               calendar.push(tempArray);
         } 

         // handle last week of the month
         let lastWeek = [];
         for(date; date <= this.numDaysInMonth; date += 1) {
               lastWeek.push(date);
         }
         if (lastWeek.length < 7) {
               lastWeek.push(...this.nextMonth.firstWeek);
         }
         calendar.push(lastWeek);

         this.calendar = calendar;  
      },
      setDataValues(firstRun) {
         if(firstRun){
            var date = new Date();
            this.month = date.getMonth();
            this.year = date.getFullYear();
         }

         this.startDayOfWeek = new Date(this.year, this.month, 1).getDay();
         this.numDaysInMonth = new Date(this.year, this.month + 1, 0).getDate();
         this.numWeeks = this.setNumWeeks();
         this.prevMonth = this.setPrevMonth();
         this.nextMonth = this.setNextMonth();
      },
      setNumWeeks() {
         const dayThreshold = [ 5, 1, 5, 6, 5, 6, 5, 5, 6, 5, 6, 5 ];
         let baseWeeks = this.month === 1 ? 4 : 5;
         let thresholdAmount = this.startDayOfWeek >= dayThreshold[this.month] ? 1 : 0;
         
         if(this.numDaysInMonth === 29) {
               baseWeeks = 5;
               thresholdAmount = 0;
         }

         return baseWeeks + thresholdAmount; // add a week if month starts beyond threshold day
      },
      setPrevMonth() {
         let prevMonth = this.month === 0 ? 11 : this.month - 1;
         let prevMonthYear = this.month === 0 ? this.year - 1 : this.year;
         let numDays = new Date(prevMonthYear, this.month, 0).getDate();
         let i = numDays - this.startDayOfWeek + 1;

         let lastWeekArray = [];
         for(i; i <= numDays; i += 1) {
               lastWeekArray.push(i);
         }

         return {
               month: prevMonth,
               year: prevMonthYear,
               lastWeek: lastWeekArray,
               numDaysInMonth: numDays
         };
      },
      setNextMonth() {
         let nextMonth = this.month === 11 ? 0 : this.month + 1;
         let nextMonthYear = this.month === 11 ? this.year + 1 : this.year;
         let startDayOfWeek = new Date(nextMonthYear, nextMonth, 1).getDay();

         let firstWeekArray = [];
         for(let i = 1; i <= (7 - startDayOfWeek); i += 1) {
               firstWeekArray.push(i);
         }

         return {
               month: nextMonth,
               year: nextMonthYear,
               firstWeek: firstWeekArray
         };
      }
   },
   components: {
      'calendar-week': CalendarWeek,
      'the-calendar-controls': TheCalendarControls
   }
};

</script>

<style>
#calendar-header{
    margin: 10px auto 2px; 
    background-color: #303C6C;
    padding: 5px 0px;
    font-weight: bold;
}
#calendar-header li {
    display: inline-block;
    width: 13.8%;
    text-align: center;
    color: #fff;
}
#calendar {
    margin: 0 auto;
    margin-bottom: 300px;
}
</style>