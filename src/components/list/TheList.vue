<template>
   <div>
      <div class="search-container">
         <the-search-bar :type='dataId'></the-search-bar>
      </div>
      <the-list-table :type='dataId' 
                      :items='items'>
      </the-list-table>
   </div>
</template>

<script>
import TheListTable from './TheListTable';
import TheSearchBar from './TheSearchBar';

export default {
   props: ['dataId'],
   data() {
      return {
         items: [
            {
               id: 1,
               name: 'Spaghetti and Homemade Meat Sauce',
               category: 'Entree',
               subcategory: 'Pasta',
               genre: 'Italian',
               isDeleted: false,
               cost: 0,
               quantity: 0
            },
            {
               id: 6,
               name: 'Mexican Rice',
               category: 'Side',
               subcategory: 'Carb',
               genre: 'Mexican',
               isDeleted: false,
               cost: 0,
               quantity: 0
            },
            {
               id: 3,
               name: 'Crockpot Potato Soup',
               category: 'Entree',
               subcategory: 'Soup',
               genre: 'American',
               isDeleted: false,
               cost: 0,
               quantity: 0
            },
            {
               id: 2,
               name: 'Broccoli',
               category: '',
               subcategory: '',
               genre: '',
               isDeleted: false,
               cost: 2.50,
               quantity: '2 cups'
            },
            { // deleted should always show at the bottom
               id: 2,
               name: 'Caramelized Garlic Mushrooms',
               category: 'Side',
               subcategory: 'Vegetable',
               genre: 'American',
               isDeleted: true,
               cost: 0,
               quantity: 0
            }
         ]
      }
   },
   components: {
      'the-list-table': TheListTable,
      'the-search-bar': TheSearchBar
   }
}
</script>

<style>
.search-container {
   background-color: rgba(255, 255, 255, 0.5);
   padding: 10px 20px 0px;
   border-radius: 10px;
   margin-top: 110px;
}
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
</style>