<template>
  <main>
    <Blocks v-if="pageData.content_blocks" :blocks="pageData.content_blocks" />
    <slot/>
  </main>
</template>

<script setup>
  const route = useRoute();

  const { page } = useContent();
  if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
  }
  const pageData = page.value;

  const head = generateHead(pageData, route);
  useHead(head);
</script>
