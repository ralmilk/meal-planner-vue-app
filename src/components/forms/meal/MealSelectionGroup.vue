<template>
   <div>
      <transition name='fade'>
         <div v-if="typeof val === 'string' && val.length > 0" :id='`${type}-selections`'>
            <p class='selection-heading'>{{ processUppercase(type) }}:</p>        
            <div class='selection'>
               <p>{{ val }}</p><i @click="removeSelection(type)" class="far fa-times-circle"></i>
            </div> 
         </div>
      </transition>
      <transition name='fade'>
         <div v-if='Array.isArray(val) && val.length > 0' id='side-selections'>
            <p class='selection-heading'>Side(s):</p>
            <transition-group name='fade'>
               <div class='selection' 
                     v-for='(side, index) in val' 
                     :key='side + "-" + index'>
                  <p>{{ side }}</p><i @click="removeSelection(type, index)" class="far fa-times-circle"></i>
               </div>   
            </transition-group>      
         </div>
      </transition>
   </div>
</template>

<script>
import { eventBus } from '../../../main.js';
export default {
   props: ['val', 'type'],
   methods: {
      removeSelection(type, index = -1) {
         eventBus.$emit('selectionDeleted', type, index);
      },
      processUppercase(word) {
         return word.charAt(0).toUpperCase() + word.slice(1);
      }
   }
}
</script>