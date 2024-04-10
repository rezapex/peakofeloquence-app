<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Login'
})

// Your existing script setup code...

// Update your onSubmit function or create a new one for handling Netlify form submission
function onNetlifySubmit(event: Event) {
  event.preventDefault();
  console.log('Netlify form submission handled');
  // You might want to handle the form submission using Netlify's AJAX method here
}
</script>

<template>
  <div class="flex flex-col items-center justify-center p-4">
    <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur mb-8">
      <!-- Your existing login form... -->
    </UCard>

    <!-- Add the Netlify form here -->
    <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
  <!-- Netlify form -->
    <form name="login-form" method="POST" data-netlify="true" @submit.prevent="onNetlifySubmit">
      <p>
        <label>Email: <input type="email" name="email" /></label>
      </p>
      <p>
        <label>Password: <input type="password" name="password" /></label>
      </p>
      <p>
        <button type="submit">Log In</button>
      </p>
    </form>
    </UCard>
  </div>
</template>
