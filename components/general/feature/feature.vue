<template>
  <section class="feature pt-sm-10 pt-5 pb-4">
    <div class="container">
      <div class="row align-items-center" v-if="reversed">
        <div class="col-lg-6">
          <div class="feature-item-banner mb-sm-8 mb-lg-10 mb-xxl-15 mb-7">
            <div class="card-image">
              <img format="webp" :src="image" :alt="image_alt" loading="lazy" v-if="image" data-editable="image" data-prop-src="image" data-prop-alt="image_alt"/>
            </div>
            <div class="effect-one">
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="feature-item-content mb-xl-15 mb-md-10 mb-7 ps-xxl-8 ps-0">
            <h2 data-editable="text" data-prop="title">{{title}}</h2>
            <p data-editable="text" data-type="text" data-prop="description" v-html="description"></p>
            <div class="Learn-more">
              <a :href="button.link" class="">
                <editable-text data-prop="button.text">{{button.text}}</editable-text>
                <i class="ph-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="row align-items-center" v-else>
        <div class="col-lg-6 order-2 order-lg-1">
          <div class="feature-item-content mb-xl-15 mb-md-10 mb-7 ps-xxl-8 ps-0">
            <h2 class="pe-xl-0" data-editable="text" data-prop="title">{{title}}</h2>
            <p data-editable="text" data-type="text" data-prop="description" v-html="description"></p>
            <div class="Learn-more">
              <a :href="button.link" class="">
                <editable-text data-prop="button.text">{{button.text}}</editable-text>
                <i class="ph-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="col-lg-6 order-1 order-lg-2">
          <div class="feature-item-banner mb-sm-8 mb-lg-10 mb-xxl-15 mb-7">
            <div class="card-image">
              <img format="webp" :src="image" :alt="image_alt" loading="lazy" v-if="image" data-editable="image" data-prop-src="image" data-prop-alt="image_alt"/>
            </div>
            <div class="effect-two">
              <!--
              <img
                src="~/assets/images/feature/effect-2.png"
                alt="effect-image"
                loading="lazy"
              />
              -->
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
         'image', 'image_alt', 'title', 'description', 'button', 'reversed'
      ]
   }
</script>
