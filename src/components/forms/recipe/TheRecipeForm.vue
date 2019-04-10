<template>
   <the-form-template :type="'recipe'"> 
      <div id='topbar' slot='topbar-content'>
         <span class='warning' v-if='this.warning !== ""'>{{ warning }}</span>
         <input class='btn' @click.prevent='saveRecipe()' type='submit' value='Save'>
         <a v-if='id !== undefined' class='btn btn-delete' @click='deleteRecipe()'>Delete Recipe</a>
         <router-link :to="{ name: 'list', params: { type: 'Recipe' } }" 
                      class='btn'><a>Cancel</a>
         </router-link>   
      </div>

      <div slot='form-body' >
         <div id='recipe-detail-container'>
            <div id='recipe-details'>
               <h2>Details</h2>         

               <label for='title'>Title *</label>
               <input autofocus type='text' name='title' v-model='title'><br>
            
               <span class='textarea-group'>
                  <label for='description'>Description</label>
                  <textarea name="description" v-model='description'></textarea>
               </span>

               <span class='float-left'>
                  <label for='prepTime'>Prep Time *</label>
                  <input type='number' name='prepTime' step='5' v-model='prepTime'>
               </span>

               <span class='float-left'>
                  <label for='cookTime'>Cook Time *</label>
                  <input type='number' name='cookTime' step='5' v-model='cookTime'>
               </span>

               <span class='float-left'>
                  <label for='category'>Category *</label>
                  <select name='category' v-model='category'>
                     <option v-for='(cat, index) in categories' 
                             :key='index+1' 
                             :value='index+1'>{{ cat }}
                     </option>
                  </select>
               </span>

               <span class='float-left'>
                  <label for='subcategory'>Sub-Category *</label>
                  <select name='subcategory' v-model='subcategory'>
                     <option v-for='(subcat, index) in subcategories' 
                           :key='index+1' 
                           :value='index+1'>{{ subcat }}
                     </option>
                  </select>
               </span>

               <span class='float-left'>
                  <label for='difficulty'>Diffculty *</label>
                  <select required name='difficulty' v-model='difficulty'>
                     <option v-for='(diff, index) in difficulties' 
                             :key='index+1' 
                             :value='index+1'>{{ diff }}
                     </option>
                  </select>
               </span>

               <span class='float-left'>
                  <label for='genre'>Genre *</label>
                  <select required name='genre' v-model='genre'>
                     <option v-for='(gen, index) in genres' 
                             :key='index+1' 
                             :value='index+1'>{{ gen }}
                     </option>
                  </select>  
               </span>
            </div>
         </div>

         <the-recipe-ingredient-list :ingredients='ingredients'></the-recipe-ingredient-list>
      </div>
   </the-form-template>
</template>

<script>
import TheFormTemplate from '../TheFormTemplate';
import TheRecipeIngredientList from '../recipe/TheRecipeIngredientList';

export default {
   props: ['id'],
   data: function() {
      return {
         // display data
         categories: ['Entree','Side','Dessert','Ingredient'],
         subcategories: ["Chicken","Beef","Pork","Turkey","Vegetarian","Soup","Salad"],
         difficulties: ["Easy","Moderate","Hard","Expert"],
         genres: ["American","Italian","Mexican","Asian","French","German"],
         warning: '',

         // recipe data
         title: '',
         description: '',
         prepTime: 0,
         cookTime: 0,
         activeFlag: 'Y',
         category: 1,
         subcategory: 1,
         difficulty: 1,
         genre: 1,
         ingredients: [
            { 
               description: 'egg',
               quantity: 1,
               unit: "",
               cost: .15
            },
            { 
               description: 'flour',
               quantity: 1,
               unit: "cup",
               cost: .15
            }
         ]
      };
   },
   methods: {
      saveRecipe() {
         // TODO: verify required fields
         if(true) {
            this.warning = 'Please include all required fields.';
         }
         else {
            alert('save recipe');
            this.resetForm();
         }
      },
      deleteRecipe() {
         alert('delete this ingredient');
         this.resetForm();
      },
      resetForm() {
         
      }
   },
   components: {
      'the-form-template': TheFormTemplate,
      'the-recipe-ingredient-list': TheRecipeIngredientList
   }
}
</script>

<style>
.recipe-form-container { 
   background-color: rgba(255, 255, 255, 0.5);
   padding: 20px;
   border-radius: 10px;
   margin-top: 110px;
   height: 380px;
}
#recipe-detail-container {
    width: 100%;
}
#recipe-detail-container input, 
#recipe-detail-container select {
    height: 24px;
}
#recipe-detail-container label {
    margin: 0 3px;
    font-size: 90%;
}
#recipe-detail-container input[type='number'] {
    width: 50px;
    text-align: center;
}
#recipe-details,
#recipe-ingredients {
    width: calc(50% - 21px);
    float: left;
    height: 300px;
}
#recipe-details {
   border-right: 1px solid #303C6C;
   padding: 20px 20px 20px 0px;
}
#recipe-details label {
    min-width: 90px;
    display: inline-block;
}
#recipe-details input[type='text'], textarea {
    min-width: calc(100% - 115px);
    max-width: calc(100% - 115px);
    margin-bottom: 10px;
}
#recipe-details select {
    min-width: 106px;
    display: inline-block;
}
#recipe-details .float-left {
    width: 50%;
}
textarea {
    font-size: 110%;
    font-family: 'Ink Free Regular', sans-serif;
    height: 70px;
}
.textarea-group * {
    vertical-align: top;
}
</style>