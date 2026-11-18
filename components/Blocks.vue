<script setup lang="ts">
import { blockMap } from "~/cloudcannon/componentMap";

const props = defineProps<{ blocks: { _type: string }[] }>();

// Block components set inheritAttrs: false, so `_type` and other undeclared keys stay off the HTML.
const resolved = computed(() =>
  props.blocks.map((block) => {
    const component = blockMap[block._type];
    if (!component) throw new Error(`No block component for _type "${block._type}"`);
    return { block, component };
  }),
);
</script>

<template>
  <div data-editable="array" data-prop="content_blocks" data-component-key="_type">
    <div
      v-for="({ block, component }, index) in resolved"
      :key="index"
      data-editable="array-item"
      :data-component="block._type"
    >
      <component :is="component" v-bind="block" />
    </div>
  </div>
</template>
