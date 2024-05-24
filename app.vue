<script setup lang="ts">
const colorMode = useColorMode();
colorMode.value = "dark"; // Set the color mode to dark by default

const color: ComputedRef<string> = computed(() =>
  colorMode.value === "dark" ? "#111827" : "white"
);

// ... rest of the code
useHead(() => ({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { key: "theme-color", name: "theme-color", content: color.value },
    // Ensure to use .value here
  ],
  link: [{ rel: "icon", href: "/gold-icon.png" }],
  htmlAttrs: {
    lang: "en",
  },
}));

useSeoMeta({
  titleTemplate: "PeakofEloquence.org",
  ogImage: "/landing.jpg",
  twitterImage: "/landing.jpg",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
