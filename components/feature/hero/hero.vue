<template>
   <section class="feature-hero">
      <div class="container">
         <div class="row align-items-center">
            <div class="col-lg-6">
               <div class="feature-hero-content">
                  <h1 class="" data-editable="text" data-prop="title">{{ title}}</h1>
                  <p data-editable="text" data-type="text" data-prop="description" v-html="description"></p>
                  <div class="d-block mb-6">
                     <a :href="button.link" class="btn btn-primary btn-lg"> <editable-text data-prop="button.text">{{button.text}}</editable-text> </a>
                  </div>
               </div>
            </div>
            <div class="col-lg-6">
               <div class="feature-hero-banner">
                  <img format="webp" :src="image" :alt="image_alt" v-if="image" data-editable="image" data-prop-src="image" data-prop-alt="image_alt"/>
                  <div class="shape">
                  </div>
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
         'title', 'description', 'button', 'image', 'image_alt'
      ]
  }
</script>
