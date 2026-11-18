<template>
   <section class="pricing pb-xxl-20 pb-lg-15 pb-md-5">
      <div class="container">
         <div class="row" data-editable="array" data-prop="pricing_tier" data-direction="row">
            <div class="col-lg-4" v-for="item in pricing_tier" data-editable="array-item">                     
               <div class="card pricing-item"
                     :class="{ active: item.highlight_tier }">
                  <h5 class="card-title" data-editable="text" data-prop="tier">{{item.tier}}</h5>
                  <p class="card-text" data-editable="text" data-type="text" data-prop="description" v-html="item.description"></p>
                  <div class="price" v-if="item.has_discount">
                     <p class="pricingtable">{{item.currency_symbol}}<editable-text data-prop="discount_price">{{item.discount_price}}</editable-text></p>
                     <div class="discount">
                        <p>{{item.currency_symbol}}<editable-text data-prop="price">{{item.price}}</editable-text></p>
                        <div class="vector vector-one">
                           <img src="~/assets/images/pricing/cross-shape.png" alt="cross-shape" loading="lazy" />
                        </div>
                     </div>
                     <div class="shape top-0">
                        <img src="~/assets/images/pricing/shape-two.png" alt="shape" loading="lazy" />
                     </div>
                  </div>
                  <div class="price" v-else>
                     <p><span>{{item.currency_symbol}}<editable-text data-prop="price">{{item.price}}</editable-text></span></p>
                     <div class="shape">
                        <img src="~/assets/images/pricing/shape-one.png" alt="shape" loading="lazy" />
                     </div>
                  </div>
                  <div class="card-body">
                     <ul class="list-unstyled" data-editable="array" data-prop="features">
                        <li v-for="feature in item.features"
                           :class="{ deactive: (feature.active_feature === false)}"
                           data-editable="array-item">
                           <i :class="{ deactive: (feature.active_feature === false)}"
                              class="ph-check">
                           </i>
                           <editable-text data-prop="item">{{feature.item}}</editable-text>
                        </li>
                     </ul>
                     <div class="link">
                        <a :href="item.button.link" class="btn btn-lg btn-white">
                           <editable-text data-prop="button.text">{{item.button.text}}</editable-text>
                        </a>
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
         'pricing_tier'
      ]
   }
</script>
