<template>
   <div>
      <app-modal :showModal='showModal' :text='modalText'></app-modal>
      <the-form-template :type="'ingredient'"> 
         <div id='topbar' slot='topbar-content'>
            <span class='warning' v-if='this.warning !== ""'>{{ warning }}</span>
            <input class='btn' @click.prevent='submit()' type='submit' value='Save'>
            <a v-if='id !== undefined' class='btn btn-delete' @click='deleteIngredient()'>Delete Ingredient</a>
            <router-link :to="{ name: 'List', params: { type: 'Ingredient' } }" 
                        class='btn'><a>Cancel</a>
            </router-link>   
         </div>

         <div slot='form-body' >
            <div id='ingredient-details'>
               <h2>{{ id === "" ? 'New' : 'Edit' }} Ingredient</h2>
               <label class='min-width' for='description'>Description *</label>
               <input autofocus type='text' name='description' v-model='ingredient.Description'><br>

               <label class='min-width' for='qty'>Quantity *</label>
               <input type='number' name='qty' v-model='ingredient.Quantity'>

               <label for='unit'>Unit </label>
               <select name='unit' v-model='ingredient.Unit.Id'>
                  <option v-for='u in units' 
                        :key='u.Id' 
                        :value='u.Id'>{{ u.Description }}
                  </option>
               </select>

               <label for='cost'>Cost $ *</label>
               <input type='number' step='0.01' name='cost' v-model='ingredient.Cost'>
            </div>
         </div>
      </the-form-template>
   </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { eventBus } from '../../../main.js';
import TheFormTemplate from '../TheFormTemplate';
import AppModal from '../../shared/AppModal';

export default {
   props: {
      id: Number
   },
   data: function() {
      return {
         // display data
         warning: '',

         /* Modal fields */
         modalText: '',
         showModal: false,
         callback: Object,
         
         // ingredient data
         ingredient: {
            Description: '',
            Quantity: 0,
            Unit: {
               Id: 1
            },
            Cost: 0
         }
      };
   },
   methods: {
      getIngredient() {
         this.$http.get(`ingredient/${this.id}`)
            .then(response => {
               return response.json();
            })
            .then(data => {
               this.ingredient = data;
            }, error => {});
      },
      submit() {
         if(this.ingredient.Description === '' || this.ingredient.Quantity <= 0 || this.ingredient.Cost <= 0) {
            this.warning = 'Please include all required fields.';
         } else {
            if(this.id) {
               this.$http.put(`ingredient/${this.id}`, this.ingredient)
                  .then(response => { 
                     console.log(`successfully saved ingredient`)
                  }, error => {})
                  .then(() => {
                     this.$router.push({name: 'List', params: { type: 'Ingredient' }});
                  });
            } else {
            this.$http.post(`ingredient`, this.ingredient)
               .then(response => { 
                  console.log(`successfully added ingredient`)
               }, error => {})
               .then(() => {
                  this.$router.push({name: 'List', params: { type: 'Ingredient' }});
               });
            }
         }
      },
      deleteIngredient() {
         this.modalText = 'Are you sure you want to delete this ingredient?';
         this.showModal = true;
         this.callback = 
            function() { 
               this.$http.delete(`ingredient/${this.id}`)
                  .then(response => { 
                     console.log(`successfully deleted ingredient`)
                  }, error => {})
                  .then(() => {
                     this.$router.push({name: 'List', params: { type: 'Ingredient' }});
                  });
            };
      }
   },
   computed: {
      ...mapGetters({
         units: 'units/getAll'
      }),
   },
   created() {
      if(this.id) {
         this.getIngredient();
      }

      eventBus.$on('modalResponse', (response) => {
         this.showModal = false;
         if(response) {
            this.callback();               
         }
      });
   },
   components: {
      'the-form-template': TheFormTemplate,
      'app-modal': AppModal
   }
}
</script>

<style>
.ingredient-form-container { 
   background-color: rgba(255, 255, 255, 0.5);
   padding: 20px;
   border-radius: 10px;
    margin: 110px auto 0px;
   height: 190px;
   width: 50%;
}
#ingredient-details{
    width: 100%;
}
#ingredient-details input,
#ingredient-details select {
    margin-right: 25px;
    font-size: 110%;
}
#ingredient-details input[type='number'] {
    width: 60px;
    text-align: center;
}
#ingredient-details input[type='text'] {
    width: calc(100% - 130px);
    margin-right: 0px;
}
#ingredient-details .min-width {
    min-width: 85px;
    display: inline-block;
}

#ingredient-details h2 {
    margin: 10px 0;
}
</style>