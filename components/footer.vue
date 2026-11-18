<template>
          <footer class="footer pt-xxl-19 pt-8 pb-sm-7 pb-5" id="footer">
         <div class="container-fluid">
            <div class="footer-wrapper">
               <div class="row">
                  <div class="col-12 col-lg-4 me-auto order-2 order-lg-1">
                     <div class="footer-logo mt-7 mt-md-0">
                        <NuxtLink to="/" class="">
                           <img format="webp" :src="logo" alt="logo" v-if="logo" data-editable="image" data-prop-src="logo"/>
                        </NuxtLink>
                        <p class="">Copyright {{ currentDate.getFullYear() }} <editable-text data-prop="copyright">{{ copyright }}</editable-text></p>
                     </div>
                     <div class="social-icon">
                        <ul class="list-unstyled" data-editable="array" data-prop="social" data-direction="row">
                           <li v-for="item in social" data-editable="array-item">
                              <NuxtLink :to="item.link"> <i :class="item.icon" aria-hidden="true"></i><span class="visually-hidden">{{ item.icon_alt }}</span></NuxtLink>

                           </li>
                        </ul>
                     </div>
                  </div>
                  <div class="col-6 col-md-3 col-lg-2 order-1" v-for="(item, i) in sections">
                     <div class="footer-widget">
                        <h3 data-editable="text" :data-prop="`sections.${i}.title`">{{ item.title }}</h3>
                        <ul class="list-unstyled" data-editable="array" :data-prop="`sections.${i}.links`">
                           <li v-for="link in item.links" data-editable="array-item">
                              <NuxtLink :to="link.link"><editable-text data-prop="text">{{ link.text }}</editable-text></NuxtLink>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>
</template>
<script>
// Props are the keys of data/footer.json; app.vue binds the file with @data[footer].
export default {
  props: ['logo', 'copyright', 'social', 'sections'],
  data() {
    return {
      currentDate: new Date,
    };
  },
};
</script>
