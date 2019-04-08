<template>
   <div class='form-container'>
      <form>
         <slot name='topbar-content'></slot>
         <slot name='form-body'></slot>
      </form>
   </div>
</template>

<script>
</script>

<style>
.form-container {
   background-color: rgba(255, 255, 255, 0.5);
   padding: 20px;
   border-radius: 10px;
   margin-top: 110px;
}
label {
    font-weight: bold;
}
input{
    margin: 10px 0px;
    font-family: 'Ink Free Regular', sans-serif;
}
select {
    margin: 10px 0px;
    height: 26px;
    font-family: 'Ink Free Regular', sans-serif;
}
#topbar {
    min-height: 39px;
    font-size: 110%;
    border-bottom: 1px solid #303C6C;
}
#topbar .radio-btn {
    display: inline;
}
.radio-btn label {
   display: inline-block;
   margin-right: 8px;
}
/* .radio-btn label {
    min-width: 0px !important;
    padding: 0;
    margin: 0px 0px 10px 5px;
    display: inline-block;
}
.radio-btn input[type='radio'], 
.radio-btn input[type='radio'] label{   
    vertical-align: baseline;
    margin: 10px;
}*/
.radio-btn h3 {
    margin-top: 20px;
    margin-bottom: 5px;
} 
#topbar .btn {
    margin-top: -5px;
}
#topbar input[type='submit'] {
    background-color: #303C6C;
    color: #fff;
}
.add-btn {
    font-size: 110%;
    border: 0 none;
    border-radius: 5px;
    background-color: #303C6C;
    color: #fff;
}
</style>