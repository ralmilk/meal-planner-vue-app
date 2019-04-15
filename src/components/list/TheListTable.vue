<template>
   <div id='list-container'>
      <div id='list-header'>
         <p>
            <span id='header-name'>{{ type }} Name</span>
            <span class='edit-delete'>Edit/Delete</span>
            <span class='item-subcategory' v-if='isRecipe()'>Sub-Category</span>
            <span class='item-category' v-if='isRecipe()'>Category</span>
            <span class='item-genre' v-if='isRecipe()'>Genre</span>
            <span class='item-quantity' v-if='!isRecipe()'>Quantity</span>
            <span class='item-cost' v-if='!isRecipe()'>Cost</span>
         </p>
      </div>
      <div id='list'>
         <list-item v-for='(item, index) in items'
                    :key='item.Id'
                    :evenOdd='isEvenOrOdd(index)'
                    :item='item'
                    :type='type'>
         </list-item>
      </div>               
   </div>
</template>

<script>
import ListItem from './ListItem';
export default {
   props: {
      items: Array,
      type: String
   },
   methods: {
      isEvenOrOdd(num) {
         return num % 2 == 0 ? 'even' : 'odd';
      },
      isRecipe() {
         return this.type === 'Recipe';
      }
   },
   components: {
      'list-item': ListItem
   }
}
</script>

<style>
h2 {
    margin-bottom: 10px;
}
#list-container p {
    padding-top:5px;
}
.deleted {
    font-style: italic !important;
    text-decoration: line-through;
}

/*************** LIST *****************/
#list-container {
    width: 100%;
    margin: 0 auto;
    clear:both;
}
#list-header {
    background-color: #303C6C;
    color: #fff;
    margin-top: 10px;
    padding: 3px 0px 8px 0px;
    font-weight: bold;
    font-size: 110%;
}
#header-name {
    padding-left: 10px;
}
#list-header .edit-delete {
    margin-right: 20px;
}
#list {
    height: 600px;
    overflow: hidden;
    overflow-y: scroll;
    background-color:#fff;
}
.list-item {
    padding-left: 10px;
    height: 30px;
    border-bottom: .5px solid #303C6C;
}
.edit-delete {
    float: right;
    min-width: 100px;
}
.edit-delete a {
    margin-left: 13px;
    background-color: #303C6C;
    color: white;
    padding: 3px 5px;
    border-radius: 3px;
}
.item-category, 
.item-subcategory,
.item-genre,
.item-cost,
.item-quantity {
    float: right;
    min-width: 130px;
}
.deleted .item-category, 
.deleted .item-subcategory,
.deleted .item-genre,
.deleted .item-cost,
.deleted .item-quantity  {
    font-style: italic !important;
    text-decoration: line-through;
}
.list-item i{
    margin-top: 2px;
    padding-left: 15px;
    float: left;
}
.list-item i:hover{
    color: #378D99;
}
.odd {
    background-color: #fff;
}
.even {
    background-color: rgba(55, 142, 153, 0.4);
}
</style>
