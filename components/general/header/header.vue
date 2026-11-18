<template>
  <section class="feature pt-0 pb-0">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <div class="section-header @@disply"
            v-if="remove_top_padding"
              :style="{paddingTop: 0}">
            <h2><editable-text data-prop="title">{{ title }}</editable-text><span data-editable="text" data-prop="title_suffix">{{ title_suffix }}</span></h2>
            <p data-editable="text" data-type="text" data-prop="description" v-html="description"></p>
          </div>
          <div class="section-header @@disply"
            v-else>
            <h2><editable-text data-prop="title">{{ title }}</editable-text><span data-editable="text" data-prop="title_suffix">{{ title_suffix }}</span></h2>
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
         'title', 'title_suffix', 'description', 'remove_top_padding'
      ]
   }
</script>
