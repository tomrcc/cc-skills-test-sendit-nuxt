<template>  
  <section class="privacy">
    <div class="container">
      <div class="row">
        <div class="privacy-wrapper">
          <div class="col-lg-7 mx-auto">
            <div
              data-bs-spy="scroll"
              data-bs-target="#navbar-example2"
              data-bs-offset="0"
              class="scrollspy-example"
              tabindex="0"
              data-editable="array"
              data-prop="terms_and_conditions"
            >
                <div class="privacy-items" :id="'item'+index" v-for="(item, index) in terms_and_conditions" data-editable="array-item">
                  <div class="card">
                    <h3 class="sub-title" data-editable="text" data-prop="heading">{{item.heading}}</h3>
                    <div class="card-body">
                      <div class="card-text" data-editable="text" data-type="block" data-prop="description" v-html="item.description"></div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <div class="col-lg-4">
            <nav id="scrol-nav" class="navbar navbar-light privacy-nav">
              <ul class="nav nav-pills">
                  <li class="nav-item" v-for="(item, index) in terms_and_conditions">
                    <a class="nav-link active" :href="'#item'+index"
                        v-if="index == 1">
                      {{item.heading}}
                    </a>
                    <a class="nav-link" :href="'#item'+index" v-else>
                      {{item.heading}}</a
                    >                    
                  </li>
              </ul>
            </nav>
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
         'terms_and_conditions'
      ]
   }
</script>
