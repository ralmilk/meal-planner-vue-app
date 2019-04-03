<template>
   <div id='calendar-controls'>
      <i id='left-arrow' 
         class="fas fa-arrow-left fa-lg arrow"
         @click="arrowClicked('prev')"></i>
      <p>{{ month }} {{ year }}</p>
      <i id='right-arrow' 
         class="fas fa-arrow-right fa-lg arrow"
         @click="arrowClicked('next')">
         </i>
      <a class='btn' href='#'>Add New Meal</a>
   </div>
</template>

<script>
export default {
    props: ['month','year'],
    methods: {
        arrowClicked(type) {
            this.$emit('arrowClicked', type);
        }
    }
}
</script>

<style>
#calendar-controls p{
    padding: 8px 25px;
    text-shadow: 1px 1px #4d4d4d;
    color: #fff;
    display: inline-block;
    font-size: 150%;
    vertical-align: top;
    font-weight: bolder;
    width: 180px;
    text-align: center;
}
.arrow {
    height: 20px;
    margin-top: 16px;
    display: inline-block;
    cursor: pointer;
}
.arrow:hover {
    color:#fff;
}
#calendar-controls a:link,
#calendar-controls a:visited {
    background-color: #303C6C;
    color: #fff;
    margin-top: 10px;
}
</style>