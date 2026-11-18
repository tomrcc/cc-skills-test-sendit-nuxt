<template>
  <section class="error py-xxl-12 py-lg-9 py-10 py-sm-6">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="error-content text-center">
            <img format="webp" :src="image" :alt="image_alt" v-if="image"/>
            <h3 class="my-5">{{ description }}</h3>
            <a href="/" class="btn btn-lg btn-primary"> Try Again </a>
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
         'description', 'image', 'image_alt'
      ]
   }
</script>
