<template>
   <the-form-template :type="'recipe'"> 
      <div id='topbar' slot='topbar-content'>
         <span class='warning' v-if='this.warning !== ""'>{{ warning }}</span>
         <input class='btn' @click.prevent='submit()' type='submit' value='Save'>
         <a v-if='id !== undefined' class='btn btn-delete' @click='deleteRecipe()'>Delete Recipe</a>
         <router-link :to="{ name: 'List', params: { type: 'Recipe' } }" 
                      class='btn'><a>Cancel</a>
         </router-link>   
      </div>

      <div slot='form-body' v-if='recipe !== undefined'>
         <div id='recipe-detail-container'>
            <div id='recipe-details'>
               <h2>Details</h2>         

               <label for='title'>Title *</label>
               <input autofocus type='text' name='title' v-model='recipe.Title'><br>
            
               <span class='textarea-group'>
                  <label for='description'>Description</label>
                  <textarea name="description" v-model='recipe.Description'></textarea>
               </span>

               <span class='float-left'>
                  <label for='prepTime'>Prep Time *</label>
                  <input type='number' name='prepTime' step='5' v-model='recipe.PrepTime'>
               </span>

               <span class='float-left'>
                  <label for='cookTime'>Cook Time *</label>
                  <input type='number' name='cookTime' step='5' v-model='recipe.CookTime'>
               </span>

               <span class='float-left'>
                  <label for='category'>Category *</label>
                  <select name='category' v-model='recipe.CategoryId'>
                     <option v-for='cat in categories' 
                             :key='cat.Id' 
                             :value='cat.Id'>{{ cat.Description }}
                     </option>
                  </select>
               </span>

               <span class='float-left'>
                  <label for='subcategory'>Sub-Category *</label>
                  <select name='subcategory' v-model='recipe.SubcategoryId'>
                     <option v-for='subcat in subcategories' 
                           :key='subcat.Id' 
                           :value='subcat.Id'>{{ subcat.Description }}
                     </option>
                  </select>
               </span>

               <span class='float-left'>
                  <label for='difficulty'>Diffculty *</label>
                  <select required name='difficulty' v-model='recipe.DifficultyId'>
                     <option v-for='diff in difficulties' 
                             :key='diff.Id' 
                             :value='diff.Id'>{{ diff.Description }}
                     </option>
                  </select>
               </span>

               <span class='float-left'>
                  <label for='genre'>Genre *</label>
                  <select required name='genre' v-model='recipe.GenreId'>
                     <option v-for='gen in genres' 
                             :key='gen.Id' 
                             :value='gen.Id'>{{ gen.Description }}
                     </option>
                  </select>
               </span>
            </div>
         </div>

         <the-recipe-ingredient-list v-if='ingredientsLoaded' :ingredients='ingredients'></the-recipe-ingredient-list>
      </div>
   </the-form-template>
</template>

<script>
import { eventBus } from '../../../main.js';
import { mapGetters } from 'vuex';
import TheFormTemplate from '../TheFormTemplate';
import TheRecipeIngredientList from '../recipe/TheRecipeIngredientList';

export default {
   props: {
      id: Number
   },
   data() {
      return {
         // display data
         warning: '',
         ingredientsLoaded: false,

         recipe: {
            Title: '',
            Description: '',
            PrepTime: 0,
            CookTime: 0,
            ActiveFlg: 'Y',
            CategoryId: 1,
            SubcategoryId: 1,
            DifficultyId: 1,
            GenreId: 1
         },
         ingredients: []
      };
   },
   methods: {
      getRecipe() {
         this.$http.get(`recipe/${this.id}`)
            .then(response => {
               return response.json();
            })
            .then(data => {
               this.recipe = data;
            }, error => console.log(error));

         let tempIngredients = [];
         this.$http.get(`recipeIngredient/full/${this.id}`)
            .then(response => {
               return response.json();
            })
            .then(data => data.forEach(cur => tempIngredients.push(cur)),
                  error => console.log(error))
            .then(() => {
               this.ingredients = tempIngredients;
               this.ingredientsLoaded = true;
            });
      },
      submit() {
         // TODO: verify required fields
         if(true) {
            this.warning = 'Please include all required fields.';
         }
         else {
            // determine whether it's a save or a create
            alert('save recipe');
         }
      },
      deleteRecipe() {
         alert('delete this ingredient');
      }
   },
   computed: {
      ...mapGetters({
         categories: 'categories/getAll',
         subcategories: 'subcategories/getAll',
         difficulties: 'difficulties/getAll',
         genres: 'genres/getAll'
      }),
   },
   created() {
      if(this.id) this.getRecipe();

      eventBus.$on('addIngredientToList', (ingredient) => {
         this.recipe.Ingredients.push(ingredient);
      });
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
   font-size: 95%;
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
    font-family: 'Ink Free Regular', sans-serif;
    height: 70px;
}
.textarea-group * {
    vertical-align: top;
}
</style>