<template>
   <section class="faq-two">
      <div class="container">
         <div class="row">
            <div class="col-lg-8 mx-auto">
               <div class="section-header">
                  <h2><editable-text data-prop="title">{{title}}</editable-text> <span data-editable="text" data-prop="title_suffix">{{title_suffix}}</span></h2>
                  <p data-editable="text" data-type="text" data-prop="description" v-html="description"></p>
               </div>
            </div>
         </div>
         <div class="row">
            <div class="col-lg-12">
               <div class="accordion" id="accordionExample" data-editable="array" data-prop="FAQ">
                  <template v-for="(item, index) in FAQ">
                     <div class="accordion-item shows" v-if="((index + 1) == 1)" data-editable="array-item">
                        <span>0{{index + 1}}</span>
                        <h2 class="accordion-header" id="headingOne">
                           <button
                              class="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                              @click="activeAccordion($event)"

                           >
                              <p class="header-content" data-editable="text" data-prop="title">{{item.title}}</p>
                           </button>
                        </h2>
                        <div
                           id="collapseOne"
                           class="accordion-collapse collapse show"
                           aria-labelledby="headingOne"
                           data-bs-parent="#accordionExample"
                        >
                           <div class="accordion-body" data-editable="text" data-type="text" data-prop="description" v-html="item.description"></div>
                        </div>
                     </div>
                     <div class="accordion-item" v-else data-editable="array-item">
                        <span>0{{(index + 1)}}</span>
                        <h2 class="accordion-header" :id="'heading' + (index + 1)">
                           <button
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              :data-bs-target="'#collapse' + (index + 1)"
                              aria-expanded="false"
                              :aria-controls="'collapse' +(index + 1)"
                              @click="activeAccordion($event)"
                           >
                              <p class="header-content" data-editable="text" data-prop="title">{{item.title}}</p>
                           </button>
                        </h2>
                        <div
                           :id="'collapse' + (index + 1)"
                           class="accordion-collapse collapse"
                           :aria-labelledby="'heading'+(index + 1)"
                           data-bs-parent="#accordionExample"
                        >
                           <div class="accordion-body" data-editable="text" data-type="text" data-prop="description" v-html="item.description"></div>
                        </div>
                     </div>
                  </template>
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
         'title', 'title_suffix', 'description', 'FAQ'
      ],

      methods: {
         activeAccordion(event){
            const accordionItem = event.currentTarget.parentNode.closest('.accordion-item')
            var current = document.getElementsByClassName('shows');
            current[0].className = current[0].className.replace(' shows', '');
            accordionItem.className += ' shows';


         }
      }
   }
</script>


