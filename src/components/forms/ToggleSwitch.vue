<template>
   <span> 
      <label class="switch">
         <input type="checkbox" @click='switchToggled'>
         <span class="slider round"></span>
      </label>
      <p class='slider-description'>{{ rightDescr }}</p>
   </span>
</template>

<script>
import { eventBus } from '../../main.js';

export default {
   props: {
      leftDescr: String,
      rightDescr: String
   },
   methods: {
      switchToggled(){
         eventBus.$emit('switchToggled', 'showDeleted');
      }
   }
}
</script>

<style>
.slider-description {
   display: inline-block;
   margin-left: 5px;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;
  margin-left: 10px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #303C6C;
}

input:focus + .slider {
  box-shadow: 0 0 1px #303C6C;
}

input:checked + .slider:before {
  -webkit-transform: translateX(24px);
  -ms-transform: translateX(24px);
  transform: translateX(24px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>