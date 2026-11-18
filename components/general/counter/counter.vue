<template>    
   <section
      :class="classObject(alternate_style)"
      id="counter-up">
      <div class="container">
         <div class="row">
            <div class="col-lg-12">
               <div class="section-header">
                  <h2>
                     <editable-text data-prop="title">{{ title }}</editable-text> <span data-editable="text" data-prop="title_suffix">{{ title_suffix }}</span>
                  </h2>
                  <p data-editable="text" data-type="text" data-prop="description" v-html="description"></p>
               </div>
            </div>
            <div class="col-12">
               <div class="counter-up-wrapper d-grid" data-editable="array" data-prop="numbers" data-direction="row">
                  <div class="counter-up-content" v-for="item in numbers" data-editable="array-item">
                     <div class="counter-up-content-item">
                        <div class="counter-percent">
                           <span class="percent" v-if="item.prefix" data-editable="text" data-prop="prefix">{{ item.prefix }}</span>
                           <span class="counter" data-editable="text" data-prop="number">{{ item.number }}</span>
                           <span class="percent" v-if="item.suffix" data-editable="text" data-prop="suffix">{{ item.suffix }}</span>
                        </div>
                        <p data-editable="text" data-prop="text">{{ item.text }}</p>
                     </div>
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
         'title', 'title_suffix', 'description', 'alternate_style', 'numbers'
      ],
      methods: {
      classObject(altStyle) {
       if (altStyle){
        return "counter-up counter-up-two pb-xxl-14 pb-lg-13"
       }
       else{
         return "counter-up"
       }
      }
    },
   }
</script>

