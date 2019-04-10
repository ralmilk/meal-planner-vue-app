<template>
   <div class='list-item' :style="itemStyle" 
                          :class="[evenOdd, item.isDeleted ? 'deleted' : '']">
      <p>
         <span class='item-name'>{{ item.name }}</span>

         <span class='edit-delete' v-if='!item.isDeleted'>
               <router-link :to='{ name: type.toLowerCase(), params: { id: item.id } }' 
                           tag='i' 
                           class='fas fa-pencil-alt'>
               </router-link>
               <i class="far fa-times-circle" @click='deleteItem()'></i>
         </span>
         <span class='edit-delete' v-else>
               <a class='readd-item' @click='reAddItem()'>Re-Add</a>
         </span>
         
         <span class='columns' v-if="type.toLowerCase() === 'recipe'">
            <span class='item-subcategory'>{{ item.subcategory }}</span>
            <span class='item-category'>{{ item.category }}</span>
            <span class='item-genre'>{{ item.genre }}</span>
         </span>
         <span class='columns' v-else>
            <span class='item-quantity'>{{ item.quantity }}</span>
            <span class='item-cost'>${{ item.cost === 0 ? '0.00' : item.cost }}</span>
         </span>
      </p>
   </div>
</template>

<script>
import { eventBus } from '../../main.js';

export default{
   props: {
      'type': String, // Recipe/Ingredient
      'evenOdd': String,
      'item': Object
   },
   data() {
      return {
         itemStyle: {
            display: 'inline'
         },
         showDeleted: false
      }
   },
   created() {
      this.determineDeletedStatus();
      
      eventBus.$on('switchToggled', (type) => {
         if(type === 'showDeleted') {
            this.showDeleted = !this.showDeleted;
            this.determineDeletedStatus();
         }
      });
   },
   methods: {
      determineDeletedStatus(){
         if(this.item.isDeleted && !this.showDeleted){
            this.itemStyle.display = 'none';
         } else {
            this.itemStyle.display = 'block';
         }
      },
      reAddItem() {
         alert(`readd me! ${this.item.id}`);
         // TODO: readd item to the database (change active flag)
      },
      deleteItem() {
         alert(`delete me! ${this.item.id}`);
         // TODO: set item activeflag to 'N' in db
      }
   }
}
</script>

<style>
</style>