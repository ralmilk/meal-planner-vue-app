<template>
   <div>
      I am a form: {{ counter }}
      <button class='btn' @click='counter++'>Testing</button>
   </div>
</template>

<script>
   export default {
      data: function() {
         return {
            counter: 0
         };
      }
   }
</script>

<style>

</style>