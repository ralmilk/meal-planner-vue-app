<template>
   <label class="radio-container">{{ text }}
      <input type="radio" 
             :checked='isChecked' 
             :value='val' 
             :name='n' 
             @click='radioValueChanged(n, val)'>
      <span class="radio-checkmark"></span>
   </label>
</template>

<script>
import { eventBus } from '../../main.js';
export default {
   props: ['n','text','val', 'isChecked'],
   methods: {
      radioValueChanged(name, value) {
         eventBus.$emit('radioValueChanged', name, value);
      }
   }
}
</script>

<style>
/* Customize the label (the radio-container) */
.radio-container {
  display: block;
  position: relative;
  padding-left: 32px;
  margin-bottom: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.radio-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom radio button */
.radio-checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 21px;
  width: 21px;
  background-color: #eee;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.radio-container:hover input ~ .radio-checkmark {
  background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.radio-container input:checked ~ .radio-checkmark {
  background-color: #303C6C;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.radio-checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.radio-container input:checked ~ .radio-checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.radio-container .radio-checkmark:after {
  top: 7px;
  left: 7px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: white;
}
</style>