<template>
<section class="hero-two">
   <div class="hero-two-shape"></div>
   <div class="container-fluid">
      <div class="row align-items-center">
         <div class="col-lg-6">
            <div class="hero-two-content">
                  <h1 class="mb-4" data-editable="text" data-prop="title">{{ title}}</h1>
                  <div class="mb-7 w-xxl-80">
                     <p data-editable="text" data-type="text" data-prop="description" v-html="description"></p>

                  </div>
               <div class="">
                  <a :href="button.link" class="btn btn-primary btn-lg"> <editable-text data-prop="button.text">{{ button.text }}</editable-text> </a>
               </div>
            </div>
         </div>
         <div class="col-lg-6">
            <div class="hero-two-banner">
               <img format="webp" :src="image" :alt="image_alt" v-if="image" data-editable="image" data-prop-src="image" data-prop-alt="image_alt"/>
               <div class="hero-two-banner-shape"></div>
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
         'title', 'description', 'image', 'image_alt', 'button'
      ]
   }
</script>
