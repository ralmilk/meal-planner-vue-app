<template>
   <div id="app">
      <the-header></the-header>
      <the-footer></the-footer>
   </div>
</template>

<script>
import TheHeader from './components/shared/TheHeader';
import TheFooter from './components/shared/TheFooter';
export default {
   components: {
      'the-header': TheHeader,
      'the-footer': TheFooter
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
    min-height: 650px;
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
</style>