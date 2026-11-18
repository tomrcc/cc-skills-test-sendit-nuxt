<template>
   <section class="contact-hero">
      <div class="container">
         <div class="row">
            <div class="col-lg-6">
               <div class="contact-hero-content">
                  <h1 data-editable="text" data-prop="title">{{ title }}</h1>
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

