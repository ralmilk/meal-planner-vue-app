<template>
   <div>
      <the-calendar-controls
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
            :weekNum='index'
            :meals='meals[index]'>
         </calendar-week>
      </div> 
   </div>
</template>

<script>
import { eventBus } from '../../main.js';
import TheCalendarControls from './TheCalendarControls';
import CalendarWeek from './CalendarWeek';

export default {
   data: function() {
      return {
         // CALENDAR PROPERTIES
         calendar: [],
         month: 0,
         year: 0,
         startDayOfWeek: 0,
         numDaysInMonth: 0,
         numWeeks: 0,
         monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
         nextMonth: Object,
         prevMonth: Object,

         // MEAL PROPERTIES
         mealsJson: [
            {
               "Id": 2,
               "Servings": 4,
               "StartDate": "04-01-2019",
               "MealType": "L",
               "RestaurantFlg": "N",
               "PrepFlg": "Y",
               "Title": "Chicken, jasmine rice, broccoli crown",
               "Subcategory": "chicken"
            },
            {
               "Id": 7,
               "Servings": 6,
               "StartDate": "04-29-2019",
               "MealType": "D",
               "RestaurantFlg": "N",
               "PrepFlg": "N",
               "Title": "broccoli crown, sugar",
               "Subcategory": "vegetarian"
            },
            {
               "Id": 7,
               "Servings": 6,
               "StartDate": "04-13-2019",
               "MealType": "D",
               "RestaurantFlg": "N",
               "PrepFlg": "N",
               "Title": "I'm gonna wrap over a new line and need to check length",
               "Subcategory": "salad"
            },
            {
               "Id": 3,
               "Servings": 4,
               "StartDate": "04-28-2019",
               "MealType": "L",
               "RestaurantFlg": "N",
               "PrepFlg": "N",
               "Title": "Test meal for processing",
               "Subcategory": "soup"
            },
            {
               "Id": 5,
               "Servings": 6,
               "StartDate": "04-07-2019",
               "MealType": "B",
               "RestaurantFlg": "N",
               "PrepFlg": "N",
               "Title": "blah blah blah",
               "Subcategory": "pork"
            },
            {
               "Id": 8,
               "Servings": 4,
               "StartDate": "05-03-2019",
               "MealType": "B",
               "RestaurantFlg": "N",
               "PrepFlg": "N",
               "Title": "blah blah blah",
               "Subcategory": "beef"
            },
            {
               "Id": 8,
               "Servings": 7,
               "StartDate": "04-08-19",
               "MealType": "L",
               "RestaurantFlg": "N",
               "PrepFlg": "Y",
               "Title": "blah blah blah",
               "Subcategory": "beef"
            },
            {
               "Id": 8,
               "Servings": 1,
               "StartDate": "03-31-2019",
               "MealType": "D",
               "RestaurantFlg": "N",
               "PrepFlg": "N",
               "Title": "Restaurant",
               "Subcategory": "restaurant"
            },
            {
               "Id": 8,
               "Servings": 1,
               "StartDate": "03-31-2019",
               "MealType": "B",
               "RestaurantFlg": "N",
               "PrepFlg": "Y",
               "Title": "Restaurant",
               "Subcategory": "vegetarian"
            }
         ],
         processedMeals: [],
         meals: []
      }
   }, 
   created(){
      this.setUp(true);
      eventBus.$on('arrowClicked', (direction) => {
         this.updateMonth(direction);
         this.setUp(false);
      });
   },
   methods: {
      /* SET UP*/
      setUp(initial){
         console.log('running setUp', initial);
         this.setDataValues(initial);
         this.getCalendarArray();
         this.processMeals();
         this.buildMealsMatrix();
      },

      /* CALENDAR METHODS */      
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
      },

      /* MEAL METHODS */
      getMealQueryDates() {
         let firstDay, lastDay;
         firstDay = this.calendar[0][0];
         lastDay = this.calendar[this.calendar.length - 1][6];

         let startDate = {
            month: firstDay > 7 ? this.month : this.month + 1,
            year: this.month === 0 ? this.year - 1 : this.year
         };
         let endDate = {
            month: lastDay <= 7 ? this.month + 2 : this.month + 1,
            year: this.month === 11 ? this.year + 1 : this.year
         };

         return {
            startDate: `${startDate.month}-${firstDay}-${startDate.year}`,
            endDate: `${endDate.month}-${lastDay}-${endDate.year}`
         }
      },
      processMealType(mealType) {
         if(mealType === "D") 
            return "dinner";
         else if(mealType === "L") 
            return "lunch";
         else 
            return "breakfast";
      },
      processTitle(title) {
         return title
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
      },
      processPrevDate(startDate, step) {
         let prepDate = new Date(startDate);
         prepDate.setDate(prepDate.getDate() - step);
         return `${("0" + (prepDate.getMonth() + 1)).slice(-2)}`
               + `-${("0" + prepDate.getDate()).slice(-2)}`
               + `-${prepDate.getFullYear()}`;
      },
      processFutureDate(startDate, step) {
         let prepDate = new Date(startDate);
         prepDate.setDate(prepDate.getDate() + step);
         return `${("0" + (prepDate.getMonth() + 1)).slice(-2)}`
               + `-${("0" + prepDate.getDate()).slice(-2)}`
               + `-${prepDate.getFullYear()}`;
      },
      processMeals() {
         let processedMeals = [];
         this.mealsJson.forEach(cur => {  
            if(cur.PrepFlg === "Y") {
               processedMeals.push({
                  id: cur.Id,
                  servings: 1,
                  startDate: this.processPrevDate(cur.StartDate, 1),
                  mealType: this.processMealType(cur.MealType),
                  isRestaurant: false,
                  isPrepDay: true,
                  title: "Prep Day",
                  subcategory: cur.Subcategory
               });
            }
      
            // wrap meals around to following weeks as appropriate
            var mealStartDOW = new Date(cur.StartDate).getDay();
            if(mealStartDOW + cur.Servings > 7) {
               processedMeals.push({ // meal for first week
                  id: cur.Id,
                  servings: 7 - mealStartDOW,
                  startDate: cur.StartDate,
                  mealType: this.processMealType(cur.MealType),
                  isRestaurant: cur.RestaurantFlg === "Y",
                  isPrepDay: false,
                  title: this.processTitle(cur.Title),
                  subcategory: cur.Subcategory
               });

               // only add second part if it would fall on the current month
               let futureStartDate = this.processFutureDate(cur.StartDate, 7 - mealStartDOW);
               if(+futureStartDate.split('-')[0] === this.month + 1) {
                  processedMeals.push({ // day on following week
                     id: cur.Id,
                     servings: cur.Servings - (7 - mealStartDOW),
                     startDate: futureStartDate,
                     mealType: this.processMealType(cur.MealType),
                     isRestaurant: cur.RestaurantFlg === "Y",
                     isPrepDay: false,
                     title: this.processTitle(cur.Title),
                     subcategory: cur.Subcategory
                  });
               }
            }
            else {
               processedMeals.push({
                  id: cur.Id,
                  servings: cur.Servings,
                  startDate: cur.StartDate,
                  mealType: this.processMealType(cur.MealType),
                  isRestaurant: cur.RestaurantFlg === "Y",
                  isPrepDay: false,
                  title: this.processTitle(cur.Title),
                  subcategory: cur.Subcategory
               });
            }
         });

         this.processedMeals = processedMeals;
      },
      buildMealsMatrix() {
         // build empty matrix
         let mealMatrix = [];
         for(let i = 0; i < this.numWeeks; i++) {
            mealMatrix.push([[],[],[],[],[],[],[]]);
         }
      
         // populate matrix
         this.processedMeals.forEach(meal => {
            let month = meal.startDate.split("-")[0];
            let date = meal.startDate.split("-")[1];
            let matches = [];

            // make sure prepdays for previous months don't get printed on the current month accidentally
            if(meal.isPrepDay 
               && +month === this.month 
               && this.prevMonth.numDaysInMonth - this.startDayOfWeek >= +date) 
            {
               return; 
            } 
            else {
               for(let week = 0; week < this.numWeeks; week++) {
                  let dateIndex = this.calendar[week].findIndex(day => day == date);
                  if(dateIndex >= 0) {
                     matches.push([week, dateIndex]);
                  }        
               }

               if(matches.length > 1) {
                  if ((date <= 7 && month <= (this.month + 1)/* && month >= (calendar.month - 1)*/)
                     || (date > 7 && month != (this.month + 1))) {
                     matches.pop(); 
                  } else {
                     matches.shift();
                  }
               }

               if(matches.length != 0) {
                  mealMatrix[matches[0][0]][matches[0][1]].push(meal);
               }
            }      
         });
         this.meals = mealMatrix;
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