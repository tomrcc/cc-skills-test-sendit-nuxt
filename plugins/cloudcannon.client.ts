export default defineNuxtPlugin(() => {
  if (!(window as { inEditorMode?: boolean }).inEditorMode) return;

  // Clicking text being edited inside a link or button doesn't navigate or submit the form
  document.addEventListener(
    "click",
    (event) => {
      const region = (event.target as Element | null)?.closest?.('[data-editable="text"], editable-text');
      if (region?.closest("a, button")) event.preventDefault();
    },
    true,
  );

  import("../cloudcannon/registerComponents").catch((error) => {
    console.warn("Failed to load CloudCannon component registration:", error);
  });
});
