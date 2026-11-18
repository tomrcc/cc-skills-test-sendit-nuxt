import type { Component } from "vue";
import Footer from "../components/footer.vue";
import AboutHero from "../components/about/hero/hero.vue";
import AboutTeam from "../components/about/team/team.vue";
import AboutVideo from "../components/about/video/video.vue";
import ContactForm from "../components/contact/form/form.vue";
import ContactHero from "../components/contact/hero/hero.vue";
import FeatureHero from "../components/feature/hero/hero.vue";
import GeneralCounter from "../components/general/counter/counter.vue";
import GeneralFaq from "../components/general/faq/faq.vue";
import GeneralFeature from "../components/general/feature/feature.vue";
import GeneralHeader from "../components/general/header/header.vue";
import GeneralLogin from "../components/general/login/login.vue";
import GeneralSignup from "../components/general/signup/signup.vue";
import GeneralTestimonial from "../components/general/testimonial/testimonial.vue";
import HomeHero from "../components/home/hero/hero.vue";
import HomeVideo from "../components/home/video/video.vue";
import PricingHero from "../components/pricing/hero/hero.vue";
import PricingTable from "../components/pricing/table/table.vue";
import PrivacyHero from "../components/privacy/hero/hero.vue";
import PrivacyTermsAndConditions from "../components/privacy/terms-and-conditions/terms-and-conditions.vue";

// Keys are the `_type` values in content_blocks.
export const blockMap: Record<string, Component> = {
  "about/hero": AboutHero,
  "about/team": AboutTeam,
  "about/video": AboutVideo,
  "contact/form": ContactForm,
  "contact/hero": ContactHero,
  "feature/hero": FeatureHero,
  "general/counter": GeneralCounter,
  "general/faq": GeneralFaq,
  "general/feature": GeneralFeature,
  "general/header": GeneralHeader,
  "general/login": GeneralLogin,
  "general/signup": GeneralSignup,
  "general/testimonial": GeneralTestimonial,
  "home/hero": HomeHero,
  "home/video": HomeVideo,
  "pricing/hero": PricingHero,
  "pricing/table": PricingTable,
  "privacy/hero": PrivacyHero,
  "privacy/terms-and-conditions": PrivacyTermsAndConditions,
};

export const componentMap: Record<string, Component> = {
  ...blockMap,
  footer: Footer,
};
