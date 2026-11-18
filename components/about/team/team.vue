<template>
   <div class="team">
      <div class="container">
         <div class="row">
            <div class="col-lg-10 col-xl-7 mx-auto">
               <div class="section-header">
                  <h2 data-editable="text" data-prop="title">{{ title }}</h2>
               </div>
            </div>
         </div>
         <div class="row" data-editable="array" data-prop="team_members" data-direction="row">
            <div class="col-lg-3 col-md-6" v-for="item in team_members" data-editable="array-item">
               <div class="team-member">
                  <div class="team-member-thumb">
                     <img format="webp" :src="item.image" :alt="item.image_alt" loading="lazy" style="border-radius:20px" v-if="item.image" data-editable="image" data-prop-src="image" data-prop-alt="image_alt"/>
                  </div>
                  <div class="team-member-details">
                     <h3 data-editable="text" data-prop="name">{{item.name}}</h3>
                     <p data-editable="text" data-prop="designation">{{item.designation}}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   export default {
      inheritAttrs: false,
      props: [
         'title', 'team_members'
      ]
   }
</script>


