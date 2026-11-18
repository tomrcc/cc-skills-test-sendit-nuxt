<template>
   <section class="contact">
      <div class="container">
         <div class="row">
            <div class="col-lg-5 me-auto order-2 order-lg-1">
               <div class="contact-form-Information">
                  <div class="address">
                     <h3 data-editable="text" data-prop="address.heading">{{ address.heading }}</h3>
                     <p data-editable="text" data-prop="address.address">{{ address.address }}</p>
                     <div class="item mb-4">
                        <h3 data-editable="text" data-prop="phone.heading">{{ phone.heading }}</h3>
                        <a :href="'tel:' + phone.cell"
                           ><editable-text data-prop="phone.cell">{{ phone.cell }}</editable-text>
                           <span>
                              <img src="~/assets/images/contact/call-add.svg" alt="call-add" loading="lazy" />
                           </span>
                        </a>
                     </div>
                     <div class="item">
                        <h3 data-editable="text" data-prop="email.heading">{{ email.heading }}</h3>
                        <a :href="'mailto:' + email.email"
                           ><editable-text data-prop="email.email">{{ email.email }}</editable-text>
                           <span>
                              <img
                                 src="~/assets/images/contact/directbox-send.svg"
                                 alt="send-box"
                                 loading="lazy"
                              />
                           </span>
                        </a>
                     </div>
                  </div>
               </div>
            </div>
            <div class="col-lg-6 order-1 order-lg-2">
               <div class="contact-form">
                  <form method="post">
                     <h3 data-editable="text" data-prop="form.heading">{{ form.heading }}</h3>
                     <div class="col-md-12">
                        <label for="Name" class="label" data-editable="text" data-prop="form.fullname.heading">{{ form.fullname.heading }}</label>
                        <input
                           type="text"
                           class="form-control"
                           id="Name"
                           name="name"
                           :placeholder="form.fullname.placeholder"
                           required=""
                        />
                     </div>
                     <div class="col-md-12">
                        <label for="Name" class="label" data-editable="text" data-prop="form.phone_number.heading">{{ form.phone_number.heading }}</label>
                        <input
                           type="tel"
                           class="form-control"
                           id="Name"
                           name="phone-number"
                           :placeholder="form.phone_number.placeholder"
                           required=""
                        />
                     </div>
                     <div class="col-md-12">
                        <label for="email" class="label" data-editable="text" data-prop="form.email.heading">{{ form.email.heading }}</label>
                        <input
                           type="email"
                           class="form-control mb-6"
                           id="email"
                           name="_replyto"
                           :placeholder="form.email.placeholder"
                           required=""
                        />
                     </div>
                     <div class="col-12">
                        <label for="email" class="label" data-editable="text" data-prop="form.message.heading">{{ form.message.heading }}</label>
                        <textarea
                           class="form-control mb-4"
                           id="floatingTextarea2"
                           name="message"
                           :placeholder="form.message.placeholder"
                           rows="8"
                           spellcheck="false"
                        ></textarea>
                     </div>
                     <input type="text" name="_gotcha" style="display: none" />
                     <div class="col-12">
                        <button type="submit" class="btn btn-primary btn-lg mt-7">
                           <span class="position-relative" data-editable="text" data-prop="form.submit_button.text">{{ form.submit_button.text }}</span>
                        </button>
                     </div>
                  </form>
                  <div class="effect">
                     <img src="~/assets/images/contact/effects.png" alt="effects" loading="lazy" />
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
         'address', 'phone', 'email', 'form'
      ]
   }
</script>
