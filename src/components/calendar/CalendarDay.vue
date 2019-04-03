<template>
   <div class='day-wrapper' :class="dow">
      <div class='calendar-day' :class="getMonthClass()">
         <p class='calendar-date'>{{ date }}</p>
      </div>
   </div>
</template>

<script>
export default {
   props: {
      dow: String,
      date: Number,
      isCurrentMonth: Boolean
   },
   methods: {
      getMonthClass() {
         if(this.isCurrentMonth) {
            return "current-month";
         }
         else {
            return "other-month";
         }
      }
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
/* .calendar-day:after {
	content: "";
	display: block;
	padding-top: 70%;
} */
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