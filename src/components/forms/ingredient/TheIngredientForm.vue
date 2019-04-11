<template>
   <the-form-template :type="'ingredient'"> 
      <div id='topbar' slot='topbar-content'>
         <span class='warning' v-if='this.warning !== ""'>{{ warning }}</span>
         <input class='btn' @click.prevent='saveIngredient()' type='submit' value='Save'>
         <a v-if='id !== undefined' class='btn btn-delete' @click='deleteIngredient()'>Delete Ingredient</a>
         <router-link :to="{ name: 'list', params: { type: 'Ingredient' } }" 
                      class='btn'><a>Cancel</a>
         </router-link>   
      </div>

      <div slot='form-body' >
         <div id='ingredient-details'>
            <h2>{{ id === "" ? 'New' : 'Edit' }} Ingredient</h2>
            <label class='min-width' for='description'>Description *</label>
            <input autofocus type='text' name='description' v-model='description'><br>

            <label class='min-width' for='qty'>Quantity *</label>
            <input type='number' name='qty' v-model='quantity'>

            <label for='unit'>Unit </label>
            <select name='unit' v-model='unit'>
               <option v-for='u in units' 
                       :key='u.id' 
                       :value='u.Id'>{{ u.Description }}
               </option>
            </select>

            <label for='cost'>Cost $ *</label>
            <input type='number' step='0.01' name='cost' v-model='cost'>
         </div>
      </div>
   </the-form-template>
</template>

<script>
import { mapGetters } from 'vuex';
import TheFormTemplate from '../TheFormTemplate';

export default {
   props: ['id'],
   data: function() {
      return {
         // display data
         warning: '',

         // ingredient data
         description: '',
         quantity: 0,
         unit: 1,
         cost: 0
      };
   },
   computed: {
      ...mapGetters({
         units: 'units/getAll'
      }),
   },
   methods: {
      saveIngredient() {
         // TODO: verify required fields
         if(this.description === '' || this.quantity <= 0 || this.cost <= 0) {
            this.warning = 'Please include all required fields.';
         }
         else {
            alert(`${this.description}, ${this.quantity}, ${this.unit}, ${this.cost}`);
            this.resetForm();
         }
      },
      deleteIngredient() {
         alert('delete this ingredient: ', this.description);
         this.resetForm();
      },
      resetForm() {
         this.description = '';
         this.quantity = 0;
         this.unit = 1;
         this.cost = 0;
      }
   },
   components: {
      'the-form-template': TheFormTemplate
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