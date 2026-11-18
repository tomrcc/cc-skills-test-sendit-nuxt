<template>
  <EditableRegions>
    <Nav></Nav>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <editable-component data-component="footer" data-prop="@data[footer]">
      <Footer v-bind="footerData"></Footer>
    </editable-component>
  </EditableRegions>
</template>

<script setup>
import { EditableRegions } from "@cloudcannon/editable-regions/vue";
import footerData from "./data/footer.json";
</script>
