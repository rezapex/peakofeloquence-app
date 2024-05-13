<template>
  <UContainer class="donation-container">
    <iframe
      id="kofiframe"
      src="https://ko-fi.com/peakofeloquence/?hidefeed=true&widget=true&embed=true&preview=true"
      class="donation-iframe"
      title="peakofeloquence"
    >
    </iframe>
  </UContainer>
</template>

<script>
export default {
  // If there's any specific logic, it would go here.
};
</script>

<style scoped>
.donation-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
}

.donation-iframe {
  width: 100%;
  height: 100%;
  border: none;
  overflow: hidden;
  background-color: black;
}

.body {
  background-color: black;
}
</style>
