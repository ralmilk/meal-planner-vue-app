<template>
   <div class='list-item' :style="itemStyle" 
                          :class="[evenOdd, item.ActiveFlg === 'N' ? 'deleted' : '']">
      <p>
         <span class='item-name'>{{ type === 'Recipe' ? item.Title : item.Description }}</span>

         <span class='edit-delete' v-if='!item.isDeleted'>
               <router-link :to='{ name: type.toLowerCase(), params: { id: item.Id } }' 
                           tag='i' 
                           class='fas fa-pencil-alt'>
               </router-link>
               <i class="far fa-times-circle" @click='deleteItem()'></i>
         </span>
         <span class='edit-delete' v-else>
               <a class='readd-item' @click='reAddItem()'>Re-Add</a>
         </span>
         
         <span class='columns' v-if="type.toLowerCase() === 'recipe'">
            <span class='item-subcategory'>{{ (item.Subcategory || {}).Description }}</span>
            <span class='item-category'>{{ (item.Category || {}).Description }}</span>
            <span class='item-genre'>{{ (item.Genre || {}).Description }}</span>
         </span>
         <span class='columns' v-else>
            <span class='item-quantity'>{{ `${item.Quantity} ${(item.Unit || {}).Description}` }}</span>
            <span class='item-cost'>${{ item.Cost === 0 ? '0.00' : (item.Cost || 0).toFixed(2) }}</span>
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