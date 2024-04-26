<script setup>
import { onMounted } from "vue";

onMounted(() => {
  let script = document.createElement("script");
  script.src = "https://storage.ko-fi.com/cdn/widget/Widget_2.js";
  script.onload = () => {
    kofiwidget2.init("Support Me on Ko-fi", "#29abe0", "P5P3X2SN5");
    kofiwidget2.draw();
  };
  document.head.appendChild(script);
});
</script>

<template>
  <div id="kofi-button"></div>
</template>
