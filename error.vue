<template>
  <EditableRegions>
    <Nav></Nav>
    <div>
        <GeneralError
            v-bind="{ description: 'Something is wrong here!', image: '/images/404/error.png', image_alt: 'Error illustration' }">
        </GeneralError>
    </div>
    <editable-component data-component="footer" data-prop="@data[footer]">
      <Footer v-bind="footerData"></Footer>
    </editable-component>
  </EditableRegions>
</template>

<script setup>
import { EditableRegions } from "@cloudcannon/editable-regions/vue";
import footerData from "./data/footer.json";
</script>
