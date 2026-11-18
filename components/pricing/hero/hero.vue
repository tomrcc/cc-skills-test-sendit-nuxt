<template>
   <section class="pricing-inner @@bg-color">
      <div class="container">
         <div class="row">
            <div class="col-lg-8 mx-auto">
               <div class="section-header position-relative text-center">
                  <h2 data-editable="text" data-prop="title">{{ title}}</h2>
                  <p data-editable="text" data-type="text" data-prop="description" v-html="description"></p>
               </div>
            </div>
         </div>
      </div>
   </section>
</template>
<script>
   export default {
      inheritAttrs: false,
      props: [
         'title', 'description'
      ]
   }
</script>
