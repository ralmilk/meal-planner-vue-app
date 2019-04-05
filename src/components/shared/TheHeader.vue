<template>
   <header>
      <div class='container-width'>
         <img src='../../assets/logo.png' 
              id='header-logo' 
              alt='Meal Planner Logo'
              @click="goTo('calendar')">
      </div>
      <div id='navbar-top'>
         <ul class='container-width'>
               <li class='navbar-link'
                   @click="goTo('recipes')">Recipes</li>
               <li class='navbar-link'
                   @click="goTo('ingredients')">Ingredients</li>
               <li class='navbar-link no-right'
                   @click="goTo('settings')">Settings</li>
         </ul>
      </div>
      <div id='navbar-bottom'>
         <p class='container-width'>Meal Plan</p>
      </div>
   </header>
</template>

<script>
import { eventBus } from '../../main.js';
export default {
    methods: {
        goTo(type) {
            eventBus.goTo(type);
        }
    }
}
</script>

<style>
header {
    text-align: right;
    top:0;
    width:100%;
    height:40px;
    font-weight: bold;
    font-size: 120%;
}
#navbar-top {
    margin-top: 45px;
    background-color: #FFFFFF;
    width: 100%;
    box-shadow: 0 5px 4px -4px #4d4d4d;
}
#navbar-top li {
    display: inline-block;
    padding: 10px 30px;
    cursor: pointer;
}
#navbar-top li:hover {
   text-decoration: underline;
}
#navbar-bottom {
    background-color: #378D99;
    width: 100%;
    margin-top: 10px;
    box-shadow: 0 5px 4px -4px #4d4d4d;
}
#navbar-bottom p{
    padding: 8px 0px;
    text-shadow: 2px 1px #4d4d4d;
    color: #fff;
}
#header-logo {
    height: 180px;
    position: relative;
    float: left;
    margin-top: -43px;
    margin-right: 45px;
    z-index: 2;
    cursor: pointer;
}
.container-width{
    width: 75%;
    margin: 0 auto;
    position: relative;
}
.no-right {
    margin-right: 0 !important;
    padding-right: 0 !important;
}
</style>