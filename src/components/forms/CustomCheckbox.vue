<template>
   <label class="checkbox-container">{{ text }}
      <input type="checkbox" @click='checkboxChanged(n)' :checked='isChecked' :name='n'>
      <span class="checkbox-checkmark"></span>
   </label>
</template>

<script>
import {eventBus} from '../../main.js';
export default {
   props: {
      n: String,
      text: String, 
      isChecked: Boolean
   },
   methods: {
      checkboxChanged(name) {
         eventBus.$emit('checkboxChanged', name);
      }
   }
}
</script>

<style>
/* Customize the label (the container) */
.checkbox-container {
  display: block;
  position: relative;
  padding-right: 32px;
  margin-bottom: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkbox-checkmark {
  position: absolute;
  top: 0;
  right: 0;
  height: 20px;
  width: 20px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.checkbox-container:hover input ~ .checkbox-checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.checkbox-container input:checked ~ .checkbox-checkmark {
  background-color: #303C6C;
}

/* Create the checkbox-checkmark/indicator (hidden when not checked) */
.checkbox-checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkbox-checkmark when checked */
.checkbox-container input:checked ~ .checkbox-checkmark:after {
  display: block;
}

/* Style the checkbox-checkmark/indicator */
.checkbox-container .checkbox-checkmark:after {
  left: 7px;
  top: 3px;
  width: 4px;
  height: 9px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>