<script setup lang="ts">
const links = [{
  label: 'Resources',
  children: [{
    label: 'Donate',
    to: 'https://ko-fi.com/peakofeloquence'
  }, {
    label: 'Docs'
  }, {
    label: 'Roadmap'
  }, {
    label: 'Changelog'
  }]
}, {
  label: 'Features',
  children: [{
    label: 'Affiliates'
  }, {
    label: 'Portal'
  }, {
    label: 'Jobs'
  }, {
    label: 'Sponsors'
  }]
}, {
  label: 'Company',
  children: [{
    label: 'About'
  }, {
    label: 'Pricing'
  }, {
    label: 'Careers'
  }, {
    label: 'Blog'
  }]
}]

import { ref } from 'vue';

const toast = useToast()
const form = ref(null);  // Reference to the form element
const email = ref('')
const loading = ref(false)

function onSubmit ()  {
  if (!form.value) {
    return;
  }

  loading.value = true;
  // Simulate form submission to Netlify
  const formData = new FormData(form.value);

  fetch(form.value, {
    method: 'POST',
    body: formData,
  }).then(response => {
    if (response.ok) {
      toast.add({
        title: 'Subscribed!',
        description: 'You\'ve been subscribed to our newsletter.'
      });
      email.value = '';  // Clear the input after successful submission
    } else {
      toast.add({
        title: 'Error',
        description: 'There was a problem subscribing to the newsletter.'
      });
    }
  }).catch(error => {
    toast.add({
      title: 'Network Error',
      description: 'Please check your network connection.'
    });
  }).finally(() => {
    loading.value = false;
  });
}
</script>

<template>
  <UFooter>
    <template #top>
      <UFooterColumns :links="links">
        <template #right>
        <!-- FORM -->
          <form data-netlify="true" @submit.prevent="onSubmit">
            <UFormGroup label="Subscribe to our newsletter" :ui="{ container: 'mt-3' }">
              <UInput v-model="email" type="email" placeholder="Enter your email" :ui="{ icon: { trailing: { pointer: '' } } }" required size="xl" autocomplete="off" class="max-w-sm" input-class="rounded-full">
                <template #trailing>
                  <UButton type="submit" size="xs" color="primary" :label="loading ? 'Subscribing' : 'Subscribe'" :loading="loading" />
                </template>
              </UInput>
            </UFormGroup>
          </form>
          <!-- Form End -->
        </template>
      </UFooterColumns>
    </template>

    <template #left>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Copyright © {{ new Date().getFullYear() }}. All rights reserved.
      </p>
    </template>

    <template #right>
      <UColorModeButton size="sm" />

      <UButton to="https://github.com/nuxt-ui-pro/saas" target="_blank" icon="i-simple-icons-github" aria-label="GitHub" color="gray" variant="ghost" />
    </template>
  </UFooter>
</template>
