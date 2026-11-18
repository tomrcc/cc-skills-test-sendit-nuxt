<template>
   <section class="testimonial">
      <div class="container">
         <div class="row align-items-center">
            <div class="col-lg-8 mx-auto text-center mb-5">
               <div class="testimonial-content">
                  <h2><editable-text data-prop="title">{{ title}}</editable-text> <span data-editable="text" data-prop="title_suffix"> {{ title_suffix}}</span></h2>
                  <p data-editable="text" data-type="text" data-prop="description" v-html="description"></p>
               </div>
            </div>
         </div>
         <div class="row" data-editable="array" data-prop="slider" data-direction="row">
            <div class="col-lg-4 col-md-6 mb-5" v-for="item in slider" data-editable="array-item">
               <div class="testimonial-item">
                  <div class="testimonial-item-person">
                     <div class="thumb">
                        <img format="webp" :src="item.image" :alt="item.image_alt" class="img-fluid" loading="lazy" v-if="item.image" data-editable="image" data-prop-src="image" data-prop-alt="image_alt"/>
                     </div>
                     <div class="content">
                        <h3 data-editable="text" data-prop="author">{{item.author}}</h3>
                        <p data-editable="text" data-prop="designation">{{item.designation}}</p>
                     </div>
                  </div>
                  <p data-editable="text" data-prop="message">{{item.message}}</p>
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
         'title', 'title_suffix', 'description', 'slider'
      ]
   }
</script>