<template>
  <UContainer class="donation-container">
    <iframe
      id='kofiframe'
      src='https://ko-fi.com/peakofeloquence/?hidefeed=true&widget=true&embed=true&preview=true'
      class='donation-iframe'
      title='peakofeloquence'>
    </iframe>
  </UContainer>
</template>

<script>
export default {
  // If there's any specific logic, it would go here.
}
</script>

<style scoped>

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background: black; /* Define this variable in your global styles or here */
}

.donation-container {
  max-width: 768px; /* You can adjust this */
  margin: auto;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-base); /* Define this variable in your global styles or here */
}

.donation-iframe {
  border: none;
  width: 100%;
  min-height: 712px; /* Adjust height as necessary */
  background: black; /* Ensure background blends in or contrasts nicely */
}

/* Apply the grid only if necessary, if you want to keep the background grid pattern */
.landing-grid {
  background-size: cover; /* Cover the entire area */
  background-image:
    linear-gradient(to right, rgba(var(--color-grid-line), 0.5) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(var(--color-grid-line), 0.5) 1px, transparent 1px);
}

/* Theming for dark mode */
@media (prefers-color-scheme: dark) {
  .dark .landing-grid {
    background-image:
      linear-gradient(to right, rgba(var(--color-grid-line-dark), 0.5) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(var(--color-grid-line-dark), 0.5) 1px, transparent 1px);
  }

  .donation-container {
    background: var(--color-base-dark); /* Define this for dark mode */
  }
}
</style>
