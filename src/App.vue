<template>
   <div id="app">
      <the-header></the-header>
      
      <div id="main">
        <the-calendar v-if="pageName === 'calendar'"></the-calendar> 
      </div>

      <the-footer></the-footer>
   </div>
</template>

<script>
import { eventBus } from './main.js';
import TheHeader from './components/shared/TheHeader';
import TheFooter from './components/shared/TheFooter';
import TheCalendar from './components/calendar/TheCalendar';

export default {
    data: function() {
        return {
            pageName: 'calendar',
            id: 0
            //pageNameOptions: ['calendar','recipes','ingredients','settings','mealForm','recipeForm','ingredientForm']
        }
    },
    created() {
        eventBus.$on('goTo', (value) => {
            console.log(value);
            if(Array.isArray(value)) { // handles opening anything with an id
                this.pageName = value[0];
                this.id = value[1];
            }
            else {
                this.pageName = value;
            }
        });
    },
    components: {
       'the-header': TheHeader,
       'the-footer': TheFooter,
       'the-calendar': TheCalendar
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0; 
}
html {    
    background-image: linear-gradient(to bottom, #B4DFE5, #378D99);
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
    min-width: 1250px;
    min-height: 1000px;
}
body {
    font-family: 'Ink Free Regular', sans-serif;
    font-weight: 400;
    color: #303C6C;
}
h1,h2,h3,h4,h5,h6{
    text-decoration: underline;
}
a {
    text-decoration: none;
}
a:hover {
    text-decoration: underline;
}
.underline {
    text-decoration: underline;
}
.btn {
    font-size: 110%;
    min-width: 80px;
    padding: 4px 5px;
    border: 0 none;
    float: right;
    border-radius: 5px;
}
.btn-delete {
    background-color: rgb(255, 105, 105);
    color: #fff;
    padding: 4px 10px;
    margin-right: 25px;
}
.btn-delete a:link,
.btn-delete a:visited {
    color: #fff;
}
.pointer {
    cursor: pointer;
}
.float-left {
    float: left;
}
input:focus,
select:focus,
textarea:focus {
    outline: none !important;
    box-shadow: 0 0 10px #303C6C;
}
input[type=date]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
}
input[type=date] {
    overflow: visible;
}

input[type=checkbox],
input[type=radio] {
    background-color: #eee;
}

#main {
    clear: both;
    width: 75%;
    margin: 0 auto;
}

/************ Scrollbar *************/
/* width */
::-webkit-scrollbar {
    width: 20px;
}
/* Track */
::-webkit-scrollbar-track {
    background-color: rgba(55, 142, 153, 0.296);
}
/* Handle */
::-webkit-scrollbar-thumb {
    background: #303C6C; 
    border-radius: 10px;
}
</style>