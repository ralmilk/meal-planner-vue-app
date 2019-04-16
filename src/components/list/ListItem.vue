<template>
   <div>
      <app-modal :showModal='showModal' :text='modalText'></app-modal>
      <div class='list-item' :style="itemStyle" 
                           :class="[evenOdd, item.ActiveFlg === 'N' ? 'deleted' : '']">
         <p>
            <span class='item-name'>{{ type === 'Recipe' ? item.Title : item.Description }}</span>

            <span class='edit-delete' v-if="item.ActiveFlg === 'Y'">
                  <router-link :to='{ name: type, params: { id: item.Id } }' 
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
   </div>
</template>

<script>
import { eventBus } from '../../main.js';
import AppModal from '../shared/AppModal.vue';

export default {
   props: {
      type: String, // Recipe/Ingredient
      evenOdd: String,
      item: Object
   },
   data() {
      return {
         /* Modal fields */
         modalText: '',
         showModal: false,
         callback: Object,

         itemStyle: {
            display: 'inline'
         },
         showDeleted: false
      }
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
         // patch is for the readd-call
         this.$http.patch(`${this.type.toLowerCase()}/${this.item.Id}`)
            .then(response => console.log(`successfully readded item`),
                  error => {});
         eventBus.$emit('listItemReadded', this.item.Id);
      },
      deleteItem() {
         this.modalText = 'Are you sure you want to delete this recipe?';
         this.showModal = true;
         this.callback = 
            function() { 
               this.$http.delete(`${this.type.toLowerCase()}/${this.item.Id}`)
                  .then(response => console.log(`successfully deleted item`), 
                        error => {});
               eventBus.$emit('listItemDeleted', this.item.Id);
         };
      }
   },
   created() {
      this.determineDeletedStatus();
      
      eventBus.$on('modalResponse', (response) => {
         this.showModal = false;
         if(response) {
            this.callback();               
         }
      });
      eventBus.$on('switchToggled', (type) => {
         if(type === 'showDeleted') {
            this.showDeleted = !this.showDeleted;
            this.determineDeletedStatus();
         }
      });
   },
   components: {
      'app-modal': AppModal
   }
}
</script>

<style>
</style>