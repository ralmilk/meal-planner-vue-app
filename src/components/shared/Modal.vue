<template>
      <transition name="modal" v-if='true' appear>
         <div class="modal-mask">
            <div class="modal-wrapper">
               <div class="modal-container">
                  <div class="modal-header">
                     <slot name="header">
                     Default Header
                     </slot>
                  </div>

                  <div class="modal-footer">
                     <slot name="footer">
                        <button class="modal-accept-button" @click="alert('accept')">
                           OK
                        </button>
                        <button class="modal-cancel-button" @click="alert('cancel')">
                           Cancel
                        </button>
                     </slot>
                  </div>
               </div>
            </div>
         </div>
   </transition>
</template>

<script>
export default {
   props: ['action','showModal'],
}
</script>

<style scoped>
* {
   font-family: 'Ink Free Regular', sans-serif;
}
.modal-mask {
   position: fixed;
   z-index: 9998;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: rgba(0, 0, 0, .5);
   display: table;
   transition: opacity .3s ease;
}
.modal-wrapper {
   display: table-cell;
   vertical-align: middle;
}
.modal-container {
   width: 300px;
   margin: 0px auto;
   padding: 20px 30px;
   background-color: #fff;
   border-radius: 5px;
   box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
   transition: all .3s ease;
}
.modal-header h3 {
   margin-top: 0;
   color: #42b983;
}
.modal-header {
   margin-bottom: 20px;
}
.modal-footer {
   min-height: 25px;
}
.modal-footer button {  
   padding: 4px 5px;
   border: 0 none;
   float: right;
   border-radius: 5px;
}
.modal-accept-button {
   background-color:#303C6C;
   color: #fff;
}
.modal-cancel-button {
   background-color:#ccc;
   color: #303C6C;
   margin-right: 5px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
   opacity: 0;
}

.modal-leave-active {
   opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
   -webkit-transform: scale(1.1);
   transform: scale(1.1);
}
</style>
