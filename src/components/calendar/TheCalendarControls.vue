<template>
    <div id='calendar-controls'>
        <i id='left-arrow' 
            class="fas fa-arrow-left fa-lg arrow"
            @click="arrowClicked('prev')">
        </i>
        <p>{{ month }} {{ year }}</p>
        <i id='right-arrow' 
            class="fas fa-arrow-right fa-lg arrow"
            @click="arrowClicked('next')">
        </i>
        <button class='btn' 
                @click="goTo('mealForm')">Add New Meal
        </button>
    </div>
</template>

<script>
export default {
    props: ['month','year'],
    methods: {
        arrowClicked(type) {
            this.$emit('arrowClicked', type);
        },
        goTo(type) {
            this.$emit('goTo', type);
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
#calendar-controls button {
    background-color: #303C6C;
    color: #fff;
    margin-top: 10px;
    cursor: pointer;
    font-family: 'Ink Free Regular', sans-serif; /* Figure out why i need this */
}
</style>