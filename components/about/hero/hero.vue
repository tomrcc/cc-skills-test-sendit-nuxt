<template>

  <section class="about-hero-two">
    <div class="container">
      <div class="row">
        <div class="col-xl-5 col-lg-10 mx-auto">
          <div class="about-hero-two-content position-relative">
            <h2 data-editable="text" data-prop="title">{{ title }}</h2>
            <p data-editable="text" data-type="text" data-prop="description" v-html="description"></p>
            <div
              class="scroll-down d-flex justify-content-center justify-content-xl-start"
            >
              <a :href="button.link" class="btn btn-primary btn-lg">
                <editable-text data-prop="button.text">{{button.text}}</editable-text>
              </a>

            </div>
          </div>
        </div>
        <div class="col-xl-7 col-lg-12">
          <div class="about-hero-two-banner">
            <div class="about-hero-two-banner-images" data-editable="array" data-prop="hero_images">
              <div
                v-for="item in hero_images"
                :class="classObject(item.placement)"
                data-editable="array-item"
                >
                <img format="webp" :src="item.image" :alt="item.image_alt" loading="lazy" v-if="item.image" data-editable="image" data-prop-src="image" data-prop-alt="image_alt"/>
              </div>
            </div>
            <div class="pattern">
              <img src="~/assets/images/about/patterns-two.png" alt="patterns" loading="lazy"/>
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
         'title', 'description', 'hero_images', 'button'
      ],
    methods: {
      classObject(itemPlace) {
       if (itemPlace == "front_bottom"){
        return "image-one"
       }
       else if(itemPlace == "back_top_right"){
        return "image-two"
       }
       else if(itemPlace == "back_top_left"){
        return "image-three"
       }
      }
    },

  }

</script>


